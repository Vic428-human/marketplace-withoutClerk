### 前言
> 技術棧 React、Tanstack Query、Postgres、Golang，會把從其他小專案學習到的技術，活用在此專案，該專案有更新功能的話，會多半是跟後端相關，
> 而實驗性質的前端切版或是功能，會放在[交易所-版本1](https://github.com/Vic428-human?tab=repositories)這邊。

### 待辦
-  [] 交易市集API串接
-  [進行中] 點選拍賣場的卡片，進入當前卡片競拍頁面 [Autoin App](https://github.com/Vic428-human/Austion-app) 


### 近期已完成
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