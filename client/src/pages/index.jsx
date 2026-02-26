import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { bannerItems } from "../app/config/bannerConfig";
import Hero from "../components/Hero";
import LatestListing from "../components/LatestListing";
import Plans from "../components/Plans";
import ProductsSseFeed from "../components/ProductsSseFeed.jsx";
import MarqueeCarousel from "../components/MarqueeCarousel.jsx";
import Carousel from "../components/Carousel.jsx";
import MemberLoginSection from "../components/MemberLoginSection.jsx";
import { useCountdown } from "../hooks/useCountdown";
import { getStoredValue, setStoredValue } from "../utils/localStorage";
import { mockPointsRewardProgram } from "../mock/mockPointsRewardProgram";

const cardsData = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "華麗金屬",
    from: "台南",
    description:
      "上次在Line交易群被騙，心碎三天… 你這邊交易有保障還能查賣家評價，終於敢放心買裝備了！",
    reward: "100",
  },
  {
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "金掐楊",
    from: "台中",
    description: "平常代煉賺外快，靠你平臺接單賺爆～已經在這成交好幾單！",
    reward: "50",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "富川",
    from: "香港",
    description:
      "入門新手！平台操作介面容易，一點心意，給平台維運人員一點支持~",
    reward: "80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "走敲",
    from: "日本",
    description:
      "靠北這平台也太物操所值了吧~~~一個月訂閱方案居然只要1塊美金，平台方也太佛心了!!",
    reward: "350",
  },
];

const leftBanners = bannerItems.filter((item) => item.side === "left");
const rightBanners = bannerItems.filter((item) => item.side === "right");

const slides = [
  "https://banner.gnjoy.com.tw/Uploads/a9980f2aeb9e488c90e5863f5f3b32ad.jpg",
  "https://banner.gnjoy.com.tw/Uploads/42601ff3dc914ad5bfa4f5ff4347170f.jpg",
  "https://banner.gnjoy.com.tw/Uploads/c884dcbb168b46629ea917f40b44ac00.jpg",
  "https://banner.gnjoy.com.tw/Uploads/8cee6b67c04e4ac98e15a2190601c03c.jpg",
];

const Home = () => {
  const [isAdOpen, setIsAdOpen] = useState(
    getStoredValue("WELCOME_AD_IS_OPEN", true),
  );
  const handleCloseAd = () => setIsAdOpen(false);
  const { remindTime, isCountingDown, startCountdown } = useCountdown(
    3,
    handleCloseAd,
  );
  useEffect(() => setStoredValue("WELCOME_AD_IS_OPEN", isAdOpen), [isAdOpen]);
  const program = mockPointsRewardProgram;
  return (
    <>
      {/* 外層 div 從空 class → 變成 relative 容器 */}
      <div className="relative w-full">
        {/* fixed inset-0（把背景圖層固定在 viewport） */}
        {/* 圖片小於容器時，可能會 repeat，所以要避免圖片重複出現，確保只出現一次，不會在 X/Y 方向重複貼滿*/}
        <div
          className="fixed inset-0 -z-10 pointer-events-none bg-no-repeat bg-left-top bg-cover"
          style={{
            backgroundImage:
              "url(https://static.gnjoy.com.tw/TRO/event/20260202_horseYear/img/acc_fixed_flower.png)",
          }}
        />
        <div className="relative z-10">
          {isAdOpen && (
            <div className="fixed inset-0 z-50 w-full h-full bg-yellow-200/30 flex items-center justify-center">
              <div className="relative">
                <button
                  onClick={startCountdown}
                  className="absolute top-1 right-2 z-110 text-red-500"
                >
                  <XIcon className="w-5 h-5" />
                </button>
                {isCountingDown ? (
                  <p className="mb-1">{remindTime}s 後關閉</p>
                ) : (
                  <p className="mb-1">按 X 即可關閉</p>
                )}
                <img
                  src="https://p2.bahamut.com.tw/B/2KU/17/9d5087cd7079a2b12b2e8d6bef1us6h5.JPG"
                  alt=""
                  className="w-100 h-auto"
                />
              </div>
            </div>
          )}
          <div className="relative">
            <div className="w-full">
              <Carousel slides={slides} />
            </div>
          </div>
          <MemberLoginSection />
          <section className="w-full">
            {/* 外層：置中 + 留邊 */}
            <div className="mx-auto w-[min(92vw,880px)] px-4 sm:px-6">
              {/* 外框背景容器: 建立定位容器、固定比例避免變形、保證背景完整顯示*/}
              <div
                className="relative w-full aspect-[1536/845]
              bg-[url('https://roworld.gnjoy.hk/mlktwgh/png/bg-bbb27a79.png')]
              bg-no-repeat bg-center bg-contain
              "
                // 對齊「積分」那個「積」：這裡用整張圖的百分比去定
                style={{
                  "--bar-x": "18%",
                  "--bar-top": "20%",
                  "--bar-h": "58%",
                }}
              >
                {/* ✅ 直條：直接以「整個畫框」為參考，不會因為左欄在手機變高/變矮而改變 */}
                <div
                  className="
      absolute
      left-[var(--bar-x)]
      top-[var(--bar-top)]
      h-[var(--bar-h)]
      w-[10px]
      rounded-full
      bg-[#9a6a4d]/70
    "
                />
                {/* ✅ 內容安全區：把內容推進畫框內（你之後可微調 %） */}
                <div className="absolute inset-0 px-[6%] pt-[9%] pb-[10%]">
                  {/* ✅ 兩欄：左（進度/獎勵）右（任務） */}
                  <div className="grid h-full grid-cols-12 gap-6">
                    {/* ---------------- Left: Progress + Rewards ---------------- */}
                    <aside className="col-span-12 md:col-span-4">
                      <div className="relative h-full">
                        {/* （這裡就不要再放那根 absolute 直條） */}
                         {/* milestones list */}
                      </div>
                    </aside>
                    {/* ---------------- Right: Tasks ---------------- */}
                    <main className="col-span-12 md:col-span-8"></main>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 下面先不動 */}
          <div className="flex">
            {/* 左半邊 */}
            <div className="flex-1 flex flex-col items-center max-md:hidden">
              <MarqueeCarousel
                type="guild"
                bannerData={leftBanners}
                style={`flex flex-col`}
                direction="vertical"
              />
            </div>
            {/*正中間*/}
            <div className="flex-1.5 flex flex-col items-center">
              <Hero />
              <LatestListing />
              <div className="w-full">
                <Plans />
                <div className="text-center mb-14">
                  <h2 className="text-gray-700 text-4xl font-semibold">
                    金主爸爸
                  </h2>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    感謝金主爸爸的贊助，讓小弟得以營運此平台。
                  </p>
                </div>
                <div className="block max-md:hidden">
                  <MarqueeCarousel
                    type="donate"
                    bannerData={cardsData}
                    style={`flex`}
                    direction="horizontal"
                  />
                </div>
                <div className="hidden max-md:block">
                  <MarqueeCarousel
                    type="donate"
                    bannerData={cardsData}
                    style={`flex flex-col`}
                    direction="vertical"
                  />
                </div>
              </div>
            </div>
            {/* 右半邊 */}
            <div className="flex-1 flex flex-col items-center max-md:hidden">
              <MarqueeCarousel
                type="guild"
                bannerData={rightBanners}
                style={`flex flex-col`}
                direction="vertical"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
export const Route = createFileRoute("/")({
  component: Home,
});
