package app

// app 去 import routes
import (
	approutes "todo_api/internal/app/routes"
	"todo_api/internal/chat"
	"todo_api/internal/config"
	"todo_api/internal/stream"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// 這裡只保留總調度，不放各模組細節
func RegisterRoutes(
	router *gin.Engine,
	pool *pgxpool.Pool,
	cfg *config.Config,
	chatRoom *chat.Room,
	productsCache *stream.ProductsCache,
) {
	// 基礎健康檢查 / 根路由
	approutes.RegisterHealthRoutes(router)

	// Todo 模組
	approutes.RegisterTodoRoutes(router, pool)

	// WebSocket 模組
	approutes.RegisterWebSocketRoutes(router, chatRoom)

	// Auth 模組
	approutes.RegisterAuthRoutes(router, pool, cfg)

	// Product 模組
	approutes.RegisterProductRoutes(router, pool, productsCache)

	// User 模組
	approutes.RegisterUserRoutes(router, pool)
	// approutes.RegisterEventRoutes(router, pool, cfg)
	// approutes.RegisterAuctionRoutes(router, pool, cfg)
	// approutes.RegisterAdminRoutes(router, pool, cfg)

	// 暫時先避免未使用參數報錯
	_ = pool
	_ = cfg
	_ = chatRoom
	_ = productsCache
}
