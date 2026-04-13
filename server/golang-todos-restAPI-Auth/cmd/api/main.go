// responsible for running database
package main

import (
	"fmt"
	"log"

	"todo_api/internal/app"
	"todo_api/internal/chat"
	"todo_api/internal/config"
	"todo_api/internal/database"
	"todo_api/internal/models"
	"todo_api/internal/repository"
	"todo_api/internal/stream"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/robfig/cron/v3"
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

	// 4) Chat Room（只建立一次）
	chatRoom := chat.NewRoom()
	go chatRoom.Run()

	const maxProductsForStream = 10

	// 5) Products Cache（只建立一次：cron 寫、SSE 讀）
	productsCache := stream.NewProductsCache(maxProductsForStream)

	// 小工具：只留前 N 筆（假設 products 已依你 SQL 排好順序）
	limitProducts := func(products []models.Product, n int) []models.Product {
		if n <= 0 || len(products) <= n {
			return products
		}
		return products[:n]
	}

	// 6) 啟動時先抓一次 products（避免等排程才更新）
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

	// 7) Cron（只負責更新 cache）
	cr := cron.New()
	_, err = cr.AddFunc("@every 12h", func() {
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

	// 8) 統一註冊所有 routes
	app.RegisterRoutes(router, pool, cfg, chatRoom, productsCache)

	// 9) 啟動 server
	fmt.Println(">>> server starting on port", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal(err)
	}
}
