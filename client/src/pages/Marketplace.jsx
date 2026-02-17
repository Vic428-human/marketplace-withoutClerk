import React, { useMemo, useCallback, useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSiderbar from "../components/FilterSiderbar";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "../api/products";
import { productKeys } from "../queries/productKeys";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";

const MINUTES = 1000 * 60;

const Marketplace = () => {
  const navigator = useNavigate();
  // ✅ 狀態 hooks
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    inputValue: "",
    platform: null,
    maxPrice: 100000,
    minPrice: 0,
    // verified: false,
    // featured: false,
  });

  // ✅ 所有邏輯 hooks  
  const handleSearch = useCallback((keyword) => {
    setFilters((prev) => ({ ...prev, inputValue: keyword }));
  }, []);

  // ✅ 查詢 hooks，同樣key短時間內重新呼叫不會耗效能
  const { data, isLoading, error } = useQuery({
    queryKey: productKeys.list(filters.inputValue || "all"),
    queryFn: () =>
      filters.inputValue ? searchProducts(filters.inputValue) : getProducts(),
    enabled: !!filters.inputValue || true,
    staleTime: 3 * MINUTES,
    gcTime: 10 * MINUTES,
  });


  // ✅ 計算 hooks (依賴 data)
  const products = useMemo(() => data ?? [], [data]);
  const sortedProducts = useMemo(() => {
    return products.length ? 
      [...products].sort((a, b) => Number(b?.verified || 0) - Number(a?.verified || 0)) 
      : [];
  }, [products]);

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
  return (
    <div className="lex flex-col px-6 md:px-16 lg:px-24 xl:px-32">
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
        {/* 3. 傳遞 onSearch 到 FilterSiderbar */}
        <FilterSiderbar
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          searchValue={filters.inputValue} // ← 新增這行
        />
        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {sortedProducts.length === 0 ? (
            <p className="col-span-full text-center py-12 text-slate-500">
              目前沒有符合條件的商品
            </p>
          ) : (
            sortedProducts.map((product, index) => (
              <ListingCard
                key={product.id || index} // ← 強烈建議用唯一 id
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
