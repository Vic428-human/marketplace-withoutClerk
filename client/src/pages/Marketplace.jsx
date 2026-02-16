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

  // 認證過的優先顯示
  const sortedListings = [...listings].sort((a, b) => b.verified - a.verified);
  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24 xl:px-32">
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
