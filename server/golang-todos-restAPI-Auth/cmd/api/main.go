// responsible for running database
package main

import (
	"log"
	"time"

	"todo_api/internal/chat"
	"todo_api/internal/config"
	"todo_api/internal/database"
	"todo_api/internal/handlers"
	"todo_api/internal/models"
	"todo_api/internal/repository"
	"todo_api/internal/stream"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/robfig/cron/v3"
)

func main() {
	// 1) config + DB pool（只建立一次）
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	var pool *pgxpool.Pool
	pool, err = database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	// 2) Gin router + CORS
	router := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:5173"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT"}
	corsConfig.AllowHeaders = []string{
		"Access-Control-Allow-Headers",
		"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
	}
	corsConfig.AllowCredentials = true
	corsConfig.ExposeHeaders = []string{"Content-Length"}
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	// 3) Chat Room（只建立一次）
	chatRoom := chat.NewRoom()
	go chatRoom.Run()

	const maxProductsForStream = 10

	// 4) Products Cache（只建立一次：cron 寫、SSE 讀）
	productsCache := stream.NewProductsCache(maxProductsForStream)

	// 小工具：只留前 N 筆（假設 products 已依你 SQL 排好順序）
	limitProducts := func(products []models.Product, n int) []models.Product {
		if n <= 0 || len(products) <= n {
			return products
		}
		return products[:n]
	}

	// 5) 啟動時先抓一次 products（避免等 1 分鐘/1 小時）
	refreshProducts := func(tag string) {
		products, err := repository.GetAllProducts(pool)
		if err != nil {
			log.Printf("%s refresh products failed: %v", tag, err)
			return
		}

		products = limitProducts(products, maxProductsForStream)
		productsCache.Set(products)

		log.Printf("%s products cache loaded: %d products", tag, len(products))
	}
	refreshProducts("initial")

	// 6) Cron（只負責更新 cache，不要在這裡動 router）
	cr := cron.New()
	_, err = cr.AddFunc("@every 1h", func() {
		log.Println("cron job running: refresh products cache")

		products, err := repository.GetAllProducts(pool)
		if err != nil {
			log.Printf("cron refresh products failed: %v", err)
			return
		}

		products = limitProducts(products, maxProductsForStream)
		productsCache.Set(products)

		log.Printf("products cache updated: %d products", len(products))
	})
	if err != nil {
		log.Fatal(err)
	}
	cr.Start()
	defer cr.Stop()

	// 7) Routes（只註冊一次）
	router.GET("/", func(c *gin.Context) {
		router.SetTrustedProxies(nil)
		c.JSON(200, gin.H{
			"message":  "!todo api running successfully",
			"status":   "success",
			"database": "connected",
		})
	})

	// Todos REST
	router.POST("/todos", handlers.CreateTodoHandler(pool))
	router.GET("/todos", handlers.GetAllTodosHandler(pool))
	router.GET("/todos/:id", handlers.GetTodoByIDHandler(pool))
	router.PUT("/todos/:id", handlers.UpdateToDoHandler(pool))

	// WebSocket
	router.GET("/ws", func(c *gin.Context) {
		chatRoom.ServeHTTP(c.Writer, c.Request)
	})

	// 原本 SSE（mem）—不動
	router.GET("/events", handlers.SseHandler)

	// ✅ 新增：Products SSE（stream） 不會在瀏覽器 DevTools → Network 裡看到任何 /products 呼叫
	router.GET("/products/stream", handlers.ProductsSseHandler(productsCache))

	// Products REST（你原本的）
	router.POST("/products", handlers.CreatteProductHandler(pool))
	router.GET("/products", handlers.GetAllProductsHandler(pool))
	router.PUT("/products/:id", handlers.UpdateProductHandler(pool)) // 你原本少了開頭 /，我順便修正
	router.GET("/products/:id", handlers.GetProductByIDHandler(pool))
	router.GET("/products/search", handlers.ListProductsHandler(pool))

	// 8) Run server（最後）
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
