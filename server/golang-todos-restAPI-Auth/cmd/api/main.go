// reponsible forrunning database
package main

import (
	"log"
	"time"
	"todo_api/internal/chat"
	"todo_api/internal/config"
	"todo_api/internal/database"
	"todo_api/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool" // PostgreSQL驅動程式的connection pool版本，提供高效連線管理
	// 新增
)

func main() {
	// 1. config + DB pool (現有，不動)
	var cfg *config.Config
	var err error

	cfg, err = config.Load()
	if err != nil {
		log.Fatal(err)
	}
	var pool *pgxpool.Pool

	// 1️⃣ 應用啟動時：只建立「一次」連線池（生命週期 = 整個應用）
	pool, err = database.Connect(cfg.DatabaseURL)
	if err != nil {
		// 連線失敗時立即終止程式
		log.Fatal(err)
	}

	defer pool.Close() // 確保程式結束時關閉連線池

	// 2. Gin router + CORS (現有，不動)
	var router *gin.Engine = gin.Default() // gin => do client request and response

	/*
		AllowOrigins: 允許的domain
		AllowMethods: 允許的HTTP Method
		AllowHeaders: 允許的Header 信息
		AllowCredentials: 是否允許請求包含驗證憑證
		ExposeHeaders: 允許暴露的Header信息
		MaxAge: 可被存取的時間
	*/
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:5173"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT"}
	corsConfig.AllowHeaders = []string{"Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"}
	corsConfig.AllowCredentials = true
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	// 🔥 3. 【新增】Chat Room (這裡放！)
	chatRoom := chat.NewRoom()
	go chatRoom.Run() // 非阻塞，REST API 照常運行。Room 只監聽 channel，不影響 Gin

	// 4. 所有 REST routes (現有，不動)
	router.GET("/", func(c *gin.Context) {
		router.SetTrustedProxies(nil) // if you don't use any proxy, you can disable this feature by using nil, then Context.ClientIP() will return the remote address directly to avoid some unnecessary computation
		// gin.H is a shortcut for map[string]interface{} or map[string]any
		c.JSON(200, gin.H{
			"message":  "!todo api running successfully",
			"status":   "success",
			"database": "connected",
		})
	})

	// 當前專案會用到 REST API
	router.POST("/todos", handlers.CreateTodoHandler(pool))
	router.GET("/todos", handlers.GetAllTodosHandler(pool))
	router.GET("/todos/:id", handlers.GetTodoByIDHandler(pool))
	router.PUT("/todos/:id", handlers.UpdateToDoHandler(pool))
	// 當前專案會用到 WebSocket
	router.GET("/ws", func(c *gin.Context) {
		chatRoom.ServeHTTP(c.Writer, c.Request)
	})

	// ✅ 新增 SSE
	router.GET("/events", handlers.SseHandler)

	// 交易所才會用到，只是在這進行測試
	router.POST("/products", handlers.CreatteProductHandler(pool))
	router.GET("/products", handlers.GetAllProductsHandler(pool)) // 無 keyword：全拿
	router.PUT("products/:id", handlers.UpdateProductHandler(pool))
	router.GET("/products/:id", handlers.GetProductByIDHandler(pool))
	// router 加這行（不碰現有）已經實驗過搜尋 "太陽神" 關鍵字會只拿到 太陽神有關的商品列表 => http://localhost:3000/products/search?keyword=太陽神
	router.GET("/products/search", handlers.ListProductsHandler(pool))

	// 6. Run server (現有，不動)
	router.Run(":" + cfg.Port) // 後端port是3000

}
