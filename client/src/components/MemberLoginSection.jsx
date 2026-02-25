import { useEffect, useState } from "react";
import { Signal, SignalLow } from "lucide-react";

function safeStr(v, fallback = "") {
  if (v === null || v === undefined) return fallback;
  const s = String(v);
  return s.trim() ? s : fallback;
}

function formatDate(ts) {
  const d = new Date(Number(ts) || Date.now());
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export default function MemberLoginSection() {
  const SSE_URL = "http://localhost:3000/products/stream";

  // ✅ 公告清單：一開始就是空的，全部靠 SSE
  const [notices, setNotices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setConnected(false);
    setError("");
    setNotices([]); // 需要的話：每次 url 變更就清空

    const es = new EventSource(SSE_URL);

    es.onopen = () => {
      setConnected(true);
      setError("");
    };

    const onProduct = (e) => {
      try {
        const payload = JSON.parse(e.data);
        const p = payload?.data ?? {};

        const username = safeStr(p.username, "某位使用者");
        const title = safeStr(p.title, "某個商品");
        const ts = payload?.ts ?? Date.now();

        const item = {
          id: `${payload?.version ?? "v"}-${payload?.index ?? "i"}-${ts}`, // ✅ 給 React key 用
          date: formatDate(ts),
          text: `${username} 剛才刊登了「${title}」商品`,
          tone: "red", // 你要紅字就 red；不然改 white
          ts,
          raw: p, // 需要的話可以保留原始 product
        };

        setNotices((prev) => {
          const next = [item, ...prev];
          return next.slice(0, 10);
        });
      } catch (err) {
        console.error("Invalid SSE product payload:", err, e.data);
      }
    };

    es.addEventListener("product", onProduct);

    es.onerror = () => {
      setConnected(false);
      setError("SSE disconnected / reconnecting…");
    };

    return () => {
      es.removeEventListener("product", onProduct);
      es.close();
    };
  }, [SSE_URL]);

  return (
    <section className="w-full mt-5 mb-5">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-stretch gap-12">
          {/* 左：訊息公告 */}
          <div className="flex-1">
            <div className="grid min-h-[280px] max-h-[280px] grid-rows-[auto_auto_1fr_auto]">
              {" "}
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold flex items-center gap-2">
                  <h2 className="text-red-500">訊息公告</h2>
                  <span>{connected ? <Signal  className="w-5 h-5 text-green-500"/> : <SignalLow  className="w-5 h-5 text-red-500"/>}</span>
                </div>
                <button className="bg-red-600 px-4 py-1 text-sm text-white">
                  更多
                </button>
              </div>
              <div className="mt-4 border-b border-[#a17575]" />
              <div className="min-h-0 overflow-y-auto mt-6">
                <div className="space-y-5 text-sm">
                  {notices.length === 0 ? (
                    <div className="text-white/60 text-sm">
                      目前沒有即時訊息…
                    </div>
                  ) : (
                    notices.map((n, idx) => (
                      <div
                        key={n.id}
                        className={`flex gap-3 ${idx === 0 ? "text-yellow-300" : "text-white"}`}
                      >
                        <span className="shrink-0">{n.date}</span>
                        <span>{n.text}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-8 border-b border-[#a17575]" />
            </div>
          </div>

          {/* 右：密碼登入（你原本的） */}
          <div className="flex-1 w-full max-w-[500px]">
            <div className="grid min-h-[280px] max-h-[280px] grid-rows-[auto_auto_1fr_auto]">
              <div className="flex items-center justify-between">
                <h2 className="text-red-500 text-xl font-semibold">登入會員</h2>
              </div>

              <div className="mt-4 border-b border-[#a17575]" />

              <div className="min-h-0 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <input
                    className="h-11 bg-transparent border border-white/30 px-3 text-sm"
                    placeholder="平台帳號"
                  />
                  <input
                    className="h-11 bg-transparent border border-white/30 px-3 text-sm"
                    placeholder="平台密碼"
                    type="password"
                  />
                </div>

                <div className="mt-4">
                  <button className="bg-red-600 text-white text-sm w-full h-11">
                    登入會員
                  </button>
                </div>
              </div>

              <div className="mt-8 border-b border-[#a17575]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
