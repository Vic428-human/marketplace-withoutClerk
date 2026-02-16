import React, { useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSiderbar from "../components/FilterSiderbar";
import { createFileRoute } from "@tanstack/react-router";



const Marketplace = () => {
  const navigator = useNavigate();
  const { listings } = useSelector((state) => state.listing);
  const [showFilter, setShowFilter] = useState(false);
  // TODO: 篩選器會有多種情況，預計拿這邊的狀態傳給後端，然後進行篩選
  const [filters, setFilters] = useState({
    inputValue: "",
    platform: null,
    maxPrice: 100000,
    minPrice: 0,
    // verified: false,
    // featured: false,
  });

  // TODO: call API前先拿 inputValue，然後只先透過 inputValue 去查詢
  console.log("filters==>", filters);

  // 認證過的優先顯示
  const sortedListings = [...listings].sort((a, b) => b.verified - a.verified);
  return (
    <div className="flex flex-col px-6 md:px-16 lg:px-24 xl:px-32">
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
      <div className="relative flex items-start justify-between gap-8 pb-8 ">
        {/* 這邊是篩選器 */}
        <FilterSiderbar
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filters={filters}
          setFilters={setFilters}
        />
        {/* TODO: 按下送出後，作為post api的參數 */}
        <button>搜尋</button>
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

export const Route = createFileRoute("/Marketplace")({
  path: "/marketplace",
  component: Marketplace,
});