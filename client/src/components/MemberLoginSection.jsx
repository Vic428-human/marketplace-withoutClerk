import { useEffect, useState } from "react";
import { Signal, SignalLow } from "lucide-react";
import { useProductNotices } from "../hooks/useProductNotices";
import { ProductNoticesPanel } from "../components/Home/ProductNoticesPanel";

export default function MemberLoginSection() {
  const SSE_URL = "http://localhost:3000/products/stream";
  const { notices, connected, error } = useProductNotices(SSE_URL);

  return (
    <section className="w-full mt-5 mb-5">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-stretch gap-12">
          {/* 左：訊息公告 */}
          <ProductNoticesPanel
            connected={connected}
            notices={notices}
            error={error}
          />

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
