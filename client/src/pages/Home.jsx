import { useState } from "react";
import Hero from "../components/Hero";
import LatestListing from "../components/LatestListing";
import Plans from "../components/Plans";
import InfiniteScrollAnimationPage from "../components/InfiniteScrollAnimationPage";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import CTA from "../components/CTA";
import { bannerItems } from "../app/config/bannerConfig";
const MotionDiv = motion.div;

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

const leftBanners = bannerItems.filter((item) => item.side === "left");
const rightBanners = bannerItems.filter((item) => item.side === "right");


const Home = () => {
  const [stocks] = useState(stocksData);

  return (
    <>
      <div className="">
        <InfiniteScrollAnimationPage stocks={stocks} />
        <div className="flex">
          {/* 左半邊 */}
          <div className="flex-1 flex flex-col items-center mt-5">
            <div className="overflow-hidden text-white flex items-center">
              <MotionDiv
                className="flex flex-col gap-2.5"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                }}
              >
                {leftBanners.map((item) => (
                  <div key={item.id} className="relative w-[220px] h-[220px]">
                    <img
                      src={assets.bannerFrame}
                      alt="banner frame"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                      draggable="false"
                    />
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="absolute top-21 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] aspect-square object-contain pointer-events-none"
                      draggable="false"
                    />
                  </div>
                ))}
              </MotionDiv>
            </div>
          </div>
          {/*正中間*/}
          <div className="flex-1.5 flex flex-col items-center">
            <Hero />
            <LatestListing />
          </div>
          {/* 右半邊 */}
          <div className="flex-1 flex flex-col items-center">
            <div className="overflow-hidden text-white flex items-center">
              <MotionDiv
                className="flex flex-col gap-2.5"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                }}
              >
                {rightBanners.map((item) => (
                  <div key={item.id} className="relative w-[220px] h-[220px]">
                    <img
                      src={assets.bannerFrame}
                      alt="banner frame"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                      draggable="false"
                    />
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] aspect-square object-contain pointer-events-none"
                      draggable="false"
                    />
                  </div>
                ))}
              </MotionDiv>
            </div>
          </div>
        </div>
        <Plans />
        <CTA />
      </div>
    </>
  );
};

export default Home;
