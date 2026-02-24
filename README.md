### 技術棧
> React、Tanstack Query、Postgres、Golang、Websocket、SSE，專案仍然在維護中。
```
本專案屬於長期維護項目，所以就不刻意列舉有哪些功能，有興趣的人可以自行看下方 近期已完成 欄目得知過往開發了那些features。
```


### TODO:
-  [進行中] 先做 JWT 常規帳密（註冊／登入）+ Postgres，等會員登入jwt等驗證流程沒問題後，才加 Google OAuth。
```
拔除原因: 
1.Clerk 是 雲端 SaaS 服務 + SDK，Clerk 發自己的 JWT（clerk.jwt.verify()），不是我們後端的 token，
App 要額外整合 Clerk SDK + webhook sync user 資料到 Postgres。
結果：雙軌驗證邏輯（Clerk JWT + 你 JWT），痛點多（token 交換、session sync）。

2.金流系統不預期仰賴Clerk，因為並非業界慣例。

初步設想註冊所需欄位:
1.預期設計的註冊所需資訊，有email+密碼即可，那些名字啊，都先不要設計進去，先確保註冊時，OAuth跟JWT都吃同一套欄位。
當用戶授權後，Google 回傳這些（OAuth2 userinfo endpoint）：
{
  "sub": "123456789",           // Google user ID (唯一)
  "name": "John Doe",           // 顯示名稱
  "email": "john.doe@gmail.com", // 驗證過的 email
}

2.Postgres 存什麼（你的 marketplace_user 對應）
export const users = pgTable("marketplace_user", {
  // === 核心識別（兩種都用） ===
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  
  // === 共用欄位（Google + 帳密都有） ===
  name: text("name").notNull(),                    // Google name 或 註冊時填
  email: text("email").notNull().unique(),         // 兩種來源都有
}                          
)

```
-  [進行中] 廣告banner，預計放在首頁，有可能會順手把工會banner拔掉
-  [暫緩] 點選拍賣場的卡片，進入當前卡片競拍頁面 [Autoin App](https://github.com/Vic428-human/next14-ts-auction-app) 
-  [] 交易市集API串接 (透過關鍵字查詢已完成，但價格區間、登入平台查詢還尚未動工)

### 近期已完成
- [x] [26/0224] 新增會員專區Nested Routing、忘記密碼、會員註冊..等功能，優化
- [x] [26/0220] 首頁推播公告，透過SSE、CRON排程將刊登過的產品推播至前台頁面
- [x] [26/0219] 聊天室widget化，玩家可以自由開啟關閉，購物同時跟其他使用者聊天
- [x] [26/0218] 添加多人聊天室，可以看到其他玩家正在輸入..等功能
- [x] [26/0217] 交易市集虛寶查詢，並優化效能，避免相同關鍵字短時間查詢時反覆呼叫API
- [x] [26/0217] 把傳統路由升級成 createFileRoute ，檔案名自動變路由，優點如下:
- [x] [26/0214] 刊登賣場 串接 post 方法

### 備忘
- [Gin+Postgres]TODO request & [交易所]Product request 的postman資料夾 是這個專案會用到的
- 本機位置: C:\Users\z0983\Documents\sideProject\marketplace-withoutClerk