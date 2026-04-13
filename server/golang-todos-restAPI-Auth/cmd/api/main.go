// responsible for running database
package main

import (
	"fmt"
	"log"

	"todo_api/internal/app"
	"todo_api/internal/config"
	"todo_api/internal/database"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	fmt.Println(">>> KADY TEST 0322")

	// 1) 載入設定
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	// 2) 建立資料庫連線池
	var pool *pgxpool.Pool
	pool, err = database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	// 3) 建立已完成基礎設定的 router
	router := app.NewRouter(cfg)

	// 4) 初始化背景服務
	chatRoom := app.InitChatRoom()

	const maxProductsForStream = 10
	productsCache := app.InitProductsCache(pool, maxProductsForStream)

	cr := app.StartProductsRefreshJob(pool, productsCache, maxProductsForStream)
	defer cr.Stop()

	// 5) 統一註冊所有 routes
	app.RegisterRoutes(router, pool, cfg, chatRoom, productsCache)

	// 6) 啟動 server
	fmt.Println(">>> server starting on port", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
