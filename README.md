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
-  [暫緩] 點選拍賣場的卡片，進入當前卡片競拍頁面 [Autoin App](https://github.com/Vic428-human/next14-ts-auction-app) 
-  [] 交易市集API串接 (透過關鍵字查詢已完成，但價格區間、登入平台查詢還尚未動工)

### 近期已完成
- [x] [26/0220] 首頁的最新10筆刊登商品的推播公告
```
技術實踐:
使用 SSE 作為通道前後端的通道
透過 go cron 方式訂製排程，例如每個小時挖DB的資料，以Memory Cache方式共享給SSE後端，並每5秒發射產品資訊給客戶端的頁面。

解決的核心問題
cron 固定頻率打 DB → 成本可控，而不是常規的polling request，已經考量了未來營運API費用上的限縮，如果不事先規劃這塊，將來產品上線後，帳單費用可能會爆炸。
```
- [x] [26/0219] 聊天室widget化
```
讓買家逛商品的同時，也可以在大廳跟其他玩家聊天。
```
- [x] [26/0218] 引入聊天室功能，並對代碼整體效能跟代碼進行封裝等優化
```
1. 連線、送訊息、typing、disconnect 都封裝
2. 防止 WebSocket 收到非 JSON
3. typing TTL 與 UI 完全分離、timer 管理集中、避免 memory leak
4. UI 拆成三個元件，分層設計
5. 效能優化: useCallback 包裝 websokcet連線邏輯、例如訊息傳送
6. 透過 useRef 讓值永遠獲得的是最新的，解決 closure 問題
7. UI添加，讓聊天室可以看出是哪一個登入平台登入的，以及使用者自己的名字
8. 將獨立專案的聊天室移植過去 交易所平台的專案
```
- [x] [26/0217] 交易市集虛寶查詢，並優化效能，避免相同關鍵字短時間查詢時反覆呼叫API
- [x] [26/0217] 把傳統路由升級成 createFileRoute ，檔案名自動變路由，優點如下:
```
檔案即路由：Home.jsx → /home，改名自動同步
零配置新增：放檔案 → 立即可用，永不用改 App.jsx
自動生成：Vite 插件建 routeTree.gen.ts，維護永不出錯
類型安全 Hook：Route.useParams() 自動補全（JS 也有 IntelliSense）
資料自動載入：loader 進入前預載，useLoaderData() 即用
巢狀佈局：__root.jsx → 全域 Navbar，子頁面自動繼承
路徑永不漏：20 頁專案無需手寫路由陣列
團隊友好：新手一看檔案就懂路由結構
```
- [x] [26/0214] 刊登賣場 串接 post 方法

### 備忘
- [Gin+Postgres]TODO request & [交易所]Product request 的postman資料夾 是這個專案會用到的
- 本機位置: C:\Users\z0983\Documents\sideProject\marketplace-withoutClerk