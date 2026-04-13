package app

import (
	"fmt"

	"todo_api/internal/chat"
	"todo_api/internal/config"
	"todo_api/internal/handlers"
	"todo_api/internal/stream"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// RegisterRoutes 專門負責「註冊所有 API routes」
// 這裡不處理：
// 1. config 載入
// 2. DB 連線建立
// 3. router 初始化
// 4. cron / background jobs 啟動
//
// 它只做一件事：把 endpoint 掛到 router 上
func RegisterRoutes(
	router *gin.Engine,
	pool *pgxpool.Pool,
	cfg *config.Config,
	chatRoom *chat.Room,
	productsCache *stream.ProductsCache,
) {
	// 根路由：簡單確認 server 是否有正常啟動
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message":  "!todo api running successfully",
			"status":   "success",
			"database": "connected",
		})
	})

	// =========================
	// Todos
	// =========================
	// 這一區集中處理 todo 相關 REST API
	router.POST("/todos", handlers.CreateTodoHandler(pool))
	router.GET("/todos", handlers.GetAllTodosHandler(pool))
	router.GET("/todos/:id", handlers.GetTodoByIDHandler(pool))
	router.PUT("/todos/:id", handlers.UpdateToDoHandler(pool))

	// =========================
	// WebSocket
	// =========================
	// 即時聊天室連線入口
	router.GET("/ws", func(c *gin.Context) {
		chatRoom.ServeHTTP(c.Writer, c.Request)
	})

	// =========================
	// SSE
	// =========================
	// 原本的 SSE endpoint
	router.GET("/events", handlers.SseHandler)

	// Products SSE：提供前端即時接收 products stream
	router.GET("/products/stream", handlers.ProductsSseHandler(productsCache))

	// =========================
	// Products
	// =========================
	// 商品 CRUD / 查詢
	router.POST("/products", handlers.CreatteProductHandler(pool))
	router.GET("/products", handlers.GetAllProductsHandler(pool))
	router.PUT("/products/:id", handlers.UpdateProductHandler(pool))
	router.GET("/products/:id", handlers.GetProductByIDHandler(pool))
	router.GET("/products/search", handlers.ListProductsHandler(pool))

	// =========================
	// Users
	// =========================
	// 查看所有已註冊使用者
	router.GET("/users", handlers.GetUsersHandler(pool))

	// =========================
	// Auth
	// =========================
	// 登入 / 驗證目前登入狀態
	router.POST("/auth/login", handlers.LoginHandler(pool, cfg))
	router.GET("/auth/me", handlers.MeHandler(cfg))

	// =========================
	// Event Tasks / Progress
	// =========================
	// 活動任務清單與使用者任務進度更新
	router.GET("/events/:eventId/tasks", handlers.GetEventTasksHandler(pool, cfg))
	router.PATCH("/events/:eventId/tasks/:taskId/progress", handlers.UpdateEventTaskProgressHandler(pool, cfg))

	// =========================
	// Auctions
	// =========================
	// 競拍交易所相關 API
	router.POST("/auctions", handlers.CreateAuctionListingHandler(pool, cfg))
	router.GET("/auctions", handlers.GetAuctionListingsHandler(pool))
	router.GET("/auctions/:id", handlers.GetAuctionListingByIDHandler(pool))
	router.POST("/auctions/:id/bids", handlers.PlaceBidHandler(pool, cfg))
	router.GET("/auctions/:id/bids", handlers.GetAuctionBidsHandler(pool))

	// =========================
	// Admin
	// =========================
	// 後台建立活動
	fmt.Println(">>> registering POST /admin/events")
	router.POST("/admin/events", handlers.CreateEventHandler(pool, cfg))
	fmt.Println(">>> registered POST /admin/events")
}
