import { useEffect, useState } from "react";

export default function MemberLoginSection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* ✅ 兩欄同高：items-stretch + 每欄用 grid 切 auto / auto / 1fr / auto */}
        <div className="flex items-stretch gap-12">
          {/* 左：訊息公告 */}
          <div className="flex-1">
            {/* ✅ 固定整欄高度（業界常見：這裡可依設計調整） */}
            <div className="grid min-h-[280px] grid-rows-[auto_auto_1fr_auto]">
              {/* 標題列 */}
              <div className="flex items-center justify-between">
                <h2 className="text-red-500 text-xl font-semibold">訊息公告</h2>
                <button className="bg-red-600 px-4 py-1 text-sm text-white">
                  更多
                </button>
              </div>

              {/* 上 border */}
              <div className="mt-4 border-b border-[#a17575]" />

              {/* ✅ 兩條 border 中間：固定高度 + 可滾動（關鍵：min-h-0） */}
              <div className="min-h-0 overflow-y-auto mt-6">
                <div className="space-y-5 text-sm">
                  <div className="flex gap-3 text-white">
                    <span className="shrink-0">2026/02/24</span>
                    <span>
                      《商城》「波利造型音效一卡通」出貨延期說明與補償公告
                    </span>
                  </div>
                  <div className="flex gap-3 text-red-500">
                    <span className="shrink-0">2026/02/05</span>
                    <span>《商城》2月活動－馬年迎春：好運隨行（進行中）</span>
                  </div>
                  <div className="flex gap-3 text-white">
                    <span className="shrink-0">2025/08/22</span>
                    <span>《GNJOY》小額付費MID門號身分識別說明</span>
                  </div>
                  <div className="flex gap-3 text-white">
                    <span className="shrink-0">2026/02/10</span>
                    <span>《商城》2026春節物流暫停出貨通知</span>
                  </div>
                  <div className="flex gap-3 text-white">
                    <span className="shrink-0">2026/02/10</span>
                    <span>《GNJOY》2026農曆春節期間客服中心服務說明</span>
                  </div>

                  {/* 你之後資料多了只會在這裡滾，不會撐高整欄 */}
                </div>
              </div>

              {/* 下 border */}
              <div className="mt-8 border-b border-[#a17575]" />
            </div>
          </div>

          {/* 右：密碼登入 */}
          <div className="flex-1 w-full max-w-[500px]">
            {/* ✅ 固定整欄高度，讓右側跟左側同一套規則 */}
            <div className="grid min-h-[280px] grid-rows-[auto_auto_1fr_auto]">
              {/* 標題列 */}
              <div className="flex items-center justify-between">
                <h2 className="text-red-500 text-xl font-semibold">登入會員</h2>
              </div>

              {/* 上 border */}
              <div className="mt-4 border-b border-[#a17575]" />

              {/* ✅ 兩條 border 中間：固定高度 + 可滾動 */}
              <div className="min-h-0 overflow-y-auto">
                {/* 帳號密碼 */}
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

                {/* 如果你之後要加更多登入方式/說明文字，超出也只會滾動這塊 */}
              </div>

              {/* 下 border */}
              <div className="mt-8 border-b border-[#a17575]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}