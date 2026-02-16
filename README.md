### 前言
> 本專案已經具備React+Postgres+golang

### 待辦
-  [x] [26/0217]把傳統路由升級成 createFileRoute，檔案名自動變路由，優點如下:
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
-  [] 交易市集API串接
-  [] 移植之前做好的 [聊天室](https://github.com/Vic428-human/websocket-golang-chat-room) 跟 旋轉木馬卡片功能 在刊登賣場
-  [進行中] 點選拍賣場的卡片，進入當前卡片競拍頁面 [Autoin App](https://github.com/Vic428-human/Austion-app) 

0214 進度
-  [完成] 刊登賣場 串接 post 方法

### 備忘
- [Gin+Postgres]TODO request & [交易所]Product request 的postman資料夾 是這個專案會用到的
- 本機位置: C:\Users\z0983\Documents\sideProject\marketplace-withoutClerk