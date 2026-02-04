import React, { useState }  from "react";
import Hero from "../components/Hero";
import LatestListing from "../components/LatestListing";
import Slider from "../components/Slider";
import InfiniteScrollAnimationPage from "../components/InfiniteScrollAnimationPage";

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

const Home = () => {
   const [stocks] = useState(stocksData);
  return (
    <div className="flex flex-col items-center">
      <InfiniteScrollAnimationPage stocks={stocks} />

      <Hero />
      <LatestListing />
    </div>
  );
};

export default Home;
