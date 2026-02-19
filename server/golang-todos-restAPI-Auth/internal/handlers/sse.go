package handlers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/v4/mem"
)

// UseTicker: 不要在這裡 defer Stop()，交給呼叫者（handler）控制生命週期
func UseTicker() *time.Ticker {
	return time.NewTicker(time.Second)
}

// SSE /events
func SseHandler(c *gin.Context) {
	w := c.Writer
	r := c.Request

	// 1) SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	// CORS 你已經全域 gin middleware 有做了，通常不用再 set
	// 但若你想保險，也可保留：
	// w.Header().Set("Access-Control-Allow-Origin", "*")

	// 2) 確保 writer 支援 flush（Gin 的 ResponseWriter 通常支援）
	rc := http.NewResponseController(w)

	// 3) tickers
	memT := UseTicker()
	defer memT.Stop()

	// 4) client disconnect
	clientGone := r.Context().Done()

	for {
		select {
		case <-clientGone:
			log.Println("SSE client disconnected")
			return

		case <-memT.C:
			m, err := mem.VirtualMemory()
			if err != nil {
				log.Printf("unable to get mem: %v", err)
				return
			}

			// SSE event 格式：每個事件用 \n\n 結束
			if _, err := fmt.Fprintf(w,
				"event: mem\ndata: Total: %d,Used: %d,Perc: %.2f%%\n\n",
				m.Total, m.Used, m.UsedPercent,
			); err != nil {
				log.Printf("unable to write mem: %v", err)
				return
			}
			rc.Flush()
		}
	}
}
