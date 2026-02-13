import { use, useEffect, useState } from "react";
import Hero from "../components/Hero";
import LatestListing from "../components/LatestListing";
import Plans from "../components/Plans";
import InfiniteScrollAnimationPage from "../components/InfiniteScrollAnimationPage";
import { bannerItems } from "../app/config/bannerConfig";
import MarqueeCarousel from "../components/MarqueeCarousel.jsx";
import { XIcon } from "lucide-react";

const stocksData = [
  { id: 1, territory: "維爾茨堡", guild: "土匪" },
  { id: 2, territory: "夏洛滕堡", guild: "不想說·__·" },
  { id: 3, territory: "紅樓", guild: "鼎旺乾坤－瞬殺無痕" },
  { id: 4, territory: "紐倫堡", guild: "嶽夜森林" },
  { id: 5, territory: "權德", guild: "?" },
  { id: 6, territory: "尤布利格", guild: "不想說·__·" },
  { id: 7, territory: "米榭思德茲", guild: "凌雲閣" },
  { id: 8, territory: "克林喜德", guild: "今夜不准睡" },
  { id: 9, territory: "明淨", guild: "血染的風采" },
  { id: 10, territory: "天壇", guild: "?" },
  { id: 11, territory: "佛影", guild: "鼎旺乾坤－瞬殺無痕" },
  { id: 12, territory: "竹林唄", guild: "?" },
];

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

const Home = () => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [remindTime, setRemindTime] = useState(3);
  const [showBanner, setShowBanner] = useState(() => {
    try {
      const data = window.localStorage.getItem("MY_WELCOME_SHOW_BANNER");
      return data !== null ? JSON.parse(data) : true;
    } catch {
      return true; // 解析失敗時預設 true
    }
  });
  const [stocks] = useState(stocksData);

  useEffect(() => {
    window.localStorage.setItem(
      "MY_WELCOME_SHOW_BANNER",
      JSON.stringify(showBanner),
    );
  }, [showBanner]);

  return (
    <>
      <div className="">
        {/* <button
          onClick={() => {
            setShowBanner(true);
            setRemindTime(3);
          }}
        >
          測試打開廣告
        </button> */}
        {showBanner && (
          <div className="fixed inset-0 z-100 w-full h-full bg-yellow-200/30 flex items-center justify-center">
            <div className="relative">
              <button
                onClick={() => {
                  if (isCountingDown) return; // 防止重複點擊
                  setIsCountingDown(true); // 開始進入倒數模式
                  const timer = setInterval(() => {
                    setRemindTime((v) => {
                      if (v > 0) {
                        return v - 1;
                      }
                      clearInterval(timer);
                      setShowBanner(false);
                      setIsCountingDown(false); // 新增：倒數結束後重置狀態

                      return 0;
                    });
                  }, 1000);
                }}
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

        <InfiniteScrollAnimationPage stocks={stocks} />
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
    </>
  );
};

export default Home;
