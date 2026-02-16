import React, { useEffect, useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSiderbar from "../components/FilterSiderbar";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "../api/products";
import { productKeys } from "../queries/productKeys";
import { useQuery } from "@tanstack/react-query";

// 推薦寫法 1：定義常數（最清晰）
const MINUTES = 1000 * 60;

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

  const { data, isLoading, error } = useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
    // 可選：staleTime 設定（避免同一個使用者一直重複打 API）
    staleTime: 3 * MINUTES, // 3分鐘內同個 queryKey 都不會重新發 API
    // cacheTime 已改名為 gcTime（garbage collection time）
    gcTime: 10 * MINUTES, // 頁面離開後，cache 還會保留 10 分鐘
  });

  // 建議加上載入中與錯誤處理（使用者體驗會好很多）
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-slate-500">正在載入商品...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        載入失敗：{error.message || "請稍後再試"}
      </div>
    );
  }

  // 這裡 data 可能為 undefined，先給預設空陣列
  const products = data ?? [];

  // 如果之後 filters 要做前端篩選，這邊可以再處理一次
  // 目前階段先直接用 API 回來的資料
  const sortedProducts = [...products].sort((a, b) => {
    // 假設後端回的資料有 verified 欄位（1/0 或 true/false）
    return Number(b.verified) - Number(a.verified);
  });
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
          {sortedProducts.length === 0 ? (
            <p className="col-span-full text-center py-12 text-slate-500">
              目前沒有符合條件的商品
            </p>
          ) : (
            sortedProducts.map((product, index) => (
              <ListingCard 
                key={product.id || index}           // ← 強烈建議用唯一 id
                listing={product} 
              />
            ))
          )}
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
