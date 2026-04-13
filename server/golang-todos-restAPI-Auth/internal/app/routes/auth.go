package routes

import (
	"todo_api/internal/config"
	"todo_api/internal/handlers"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

// 這個檔案只負責 auth domain 的 route 註冊，
// 不處理：
// 1. config 載入
// 2. DB 連線建立
// 3. JWT 驗證邏輯本身
// 4. handler 內部業務邏輯
//
// 只做一件事：把 /auth 底下相關 endpoint 掛到 router 上
func RegisterAuthRoutes(router *gin.Engine, pool *pgxpool.Pool, cfg *config.Config) {
	// 登入：驗證帳密並建立登入狀態
	router.POST("/auth/login", handlers.LoginHandler(pool, cfg))

	// 驗證目前使用者是否已登入
	router.GET("/auth/me", handlers.MeHandler(cfg))
}
