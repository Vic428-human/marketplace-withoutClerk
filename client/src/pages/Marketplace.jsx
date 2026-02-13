import React, { useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSiderbar from "../components/FilterSiderbar";

const Marketplace = () => {
  const navigator = useNavigate();
  const { listings } = useSelector((state) => state.listing);
  const [showFilter, setShowFilter] = useState(false);
  // 當前狀態，若有新的變化，也是在這更新
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minPrice: 0,
    verified: false,
    featured: false,
  });
  console.log('filters===>', filters)
  const quantity = 10;

  const items = [
    {
      position: 2,
      src: "https://rd.fharr.com/images/tw/card/4121/",
      alt: "皮里恩",
    },
    {
      position: 1,
      src: "https://rd.fharr.com/images/tw/card/4168/",
      alt: "黑暗之王",
    },
    {
      position: 3,
      src: "https://rd.fharr.com/images/tw/card/4302/",
      alt: "塔奧群卡",
    },
    {
      position: 4,
      src: "https://rd.fharr.com/images/tw/card/4241/",
      alt: "聖天使波利卡片",
    },
    {
      position: 5,
      src: "https://rd.fharr.com/images/tw/card/4131/",
      alt: "月夜貓卡片",
    },
    {
      position: 6,
      src: "https://rd.fharr.com/images/tw/card/4306/",
      alt: "蛙王",
    },
    {
      position: 7,
      src: "https://rz.fharr.com/images/tw/card/4123/",
      alt: "虎王卡片",
    },
    {
      position: 8,
      src: "https://rd.fharr.com/images/tw/card/4144/",
      alt: "俄塞里斯卡片",
    },
    {
      position: 9,
      src: "https://rd.fharr.com/images/tw/card/4143/",
      alt: "獸人英雄卡片",
    },
    {
      position: 10,
      src: "https://rd.fharr.com/images/tw/card/4236/",
      alt: "古埃及王卡片",
    },
  ];
  // 認證過的優先顯示
  const sortedListings = [...listings].sort((a, b) => b.verified - a.verified);
  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24 xl:px-32">
      {/* 超稀有卡片區 */}
      <div className="hidden md:block  mt-8 w-full h-[300px] text-center fixed top-[5%] z-50">
        <div
          className="banner-slider absolute w-[75px] h-[100px] top-[15%] left-[calc(50%-100px)]
                   [transform-style:preserve-3d] [transform:perspective(1000px)]"
          style={{ ["--quantity"]: quantity }}
        >
          {items.map((it) => (
            <div
              key={it.position}
              className="absolute inset-0
                       [transform:rotateY(calc((var(--position)-1)*(360deg/var(--quantity))))_translateZ(550px)]"
              style={{ ["--position"]: it.position }}
              title={it.alt}
              onClick={() => {
                navigator(`/auctions/${it.alt}`, { state: { alt: it.alt } });
                scrollTo(0, 0);
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={it.src}
                alt={it.alt}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 上半段 */}
      <div className="flex items-center justify-between text-slate-500">
        <button
          onClick={() => {
            navigator("/");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-4 z-150"
        >
          <ArrowLeftIcon className="size-4" />
          回上一頁
        </button>
        <button
          onClick={() => {
            setShowFilter(true);
            scrollTo(0, 0);
          }}
          className="flex sm:hidden items-center gap-2 py-4"
        >
          <FilterIcon className="size-4" />
          篩選器
        </button>
      </div>

      {/* 下半段 左邊篩選內容 + 右邊展示產品 */}
      <div className="relative flex items-start justify-between gap-8 pb-8 ">
        <FilterSiderbar
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {/* 有認證過的帳號擺最前面 */}
          {sortedListings.map((listing, index) => (
            <ListingCard listing={listing} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
