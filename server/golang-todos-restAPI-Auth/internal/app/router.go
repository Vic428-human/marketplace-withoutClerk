package app

import (
	"log"

	"todo_api/internal/config"

	"github.com/gin-gonic/gin"
)

// NewRouter 建立並回傳已完成基礎設定的 Gin router
func NewRouter(cfg *config.Config) *gin.Engine {
	router := gin.Default()

	// 後端先不要相信任何轉送過來的假 IP 資訊
	// TODO: 當你開始真的要辨識使用者真實 IP的時候，才要調整

	if err := router.SetTrustedProxies(nil); err != nil {
		log.Fatal(err)
	}

	// 掛上 CORS middleware
	router.Use(NewCorsMiddleware(cfg))

	return router
}

/*
TODO: 等未來使用 Nginx / Cloudflare / LB，還要拿真實 IP → 改成信任那些 proxy 的 IP 或 網段
你開始要用真實 IP 做功能判斷
例如：
登入風控
rate limit
防刷
稽核 log
地區限制

例如:
router := gin.Default()

trustedProxies := []string{
	"127.0.0.1",      // 本機 Nginx
	"10.0.0.0/8",     // 內網 proxy 範例
	"192.168.0.0/16", // 內網 proxy 範例
}

if err := router.SetTrustedProxies(trustedProxies); err != nil {
	log.Fatal(err)
}
*/
