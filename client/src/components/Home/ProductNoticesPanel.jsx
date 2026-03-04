import { Signal, SignalLow } from "lucide-react";

export function ProductNoticesPanel({ title = "訊息公告", connected, notices, error }) {
  return (
    <div className="flex-1">
      <div className="grid min-h-[280px] max-h-[280px] grid-rows-[auto_auto_1fr_auto]">
        {/* header 區塊 */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold flex items-center gap-2">
            <h2 className="text-red-500">{title}</h2>
            <span>
              {connected ? (
                <Signal className="w-5 h-5 text-green-500" />
              ) : (
                <SignalLow className="w-5 h-5 text-red-500" />
              )}
            </span>
          </div>
          <button className="bg-red-600 px-4 py-1 text-sm text-white">
            更多
          </button>
        </div>

        <div className="mt-4 border-b border-[#a17575]" />

        {/* 內容區塊 */}
        <div className="min-h-0 overflow-y-auto mt-6">
          <div className="space-y-5 text-sm">
            {notices.length === 0 ? (
              <div className="text-white/60 text-sm">
                {error || "目前沒有即時訊息…"}
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
  );
}
