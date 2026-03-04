import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateFormatter";
import { safeExtractProduct } from "../utils/proofing";


// 抽出來變成獨立工具函數

export function useProductNotices(sseUrl) {
  const [notices, setNotices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("連線中...");

  useEffect(() => {
    // 每次 sseUrl 改變 → 建立新的 EventSource
    const es = new EventSource(sseUrl);

    const handleOpen = () => {
      setConnected(true);
      setError("");
      setNotices([]);
    };

    const handleProduct = (e) => {
      try {
        const payload = JSON.parse(e.data);
        // 防呆
        const p = safeExtractProduct(payload);
        if (!p) {
          console.warn("無效的 product payload", e.data);
          return;
        }

        const item = {
          id: `${p.version}-${p.index}-${p.ts}`,
          date: formatDate(p.ts),
          text: `${p.username} 剛才刊登了 ${p.title} 商品`,
        };

        setNotices((prev) => {
          // 防抖：能擋完全一樣的 id 重複推送，SSE 偶爾會因為網路重連造成重複推送
          if (prev.some((n) => n.id === item.id)) {
            return prev;
          }

          if (prev.length >= 10) {
            // 最多只創建一個新陣列(效能優化)
            return [item, ...prev.slice(0, 9)];
          }
          return [item, ...prev];
        });
      } catch (err) {
        console.error("Invalid SSE product payload:", err, e.data);
      }
    };

    const handleError = () => {
      setConnected(false);
      setError("連線中斷，正在重新連線...");
    };

    es.onopen = handleOpen;
    es.addEventListener("product", handleProduct); 
    es.onerror = handleError;

    // 清理連線
    return () => {
      es.removeEventListener("product", handleProduct);
      es.close();
    };
  }, [sseUrl]);

  return { notices, connected, error };
}
