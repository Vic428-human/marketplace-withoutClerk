import React, { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSiderbar = ({ showFilter, setShowFilter, filters, setFilters }) => {
  const navigator = useNavigate();
  const [expandSections, setExpandSections] = useState({
    platform: true,
    maxPrice: true,
    minPrice: true,
    verified: false,
    featured: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // input搜尋欄位打字的時候同步更新Search Params（搜尋參數），沒輸入的時候，預設導回市集頁面
  const onChangeSearch = (e) => {
    if (e.target.value) {
      setSearchParams({ search: e.target.value });
      setSearch(e.target.value);
    } else {
      navigator(`/marketplace`);
      setSearch("");
    }
  };

  const toggleSection = (section) => {
    setExpandSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


  const onFiltersChange = (newFilters) => {
    // 拿更新後的內容覆蓋當前state的狀態
    setFilters({ ...filters, ...newFilters });
  };

  const platforms = [
    { value: "Discord", label: "Discord" },
    { value: "Google", label: "Google" },
    { value: "Line", label: "Line" },
    { value: "MetaMask", label: "MetaMask" },
  ];

  return (
    <div
      className={`${showFilter ? `max-sm:fixed` : `max-sm:hidden`} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}
    >
      <div className="p-4 border-b border-gray-200">
        {/* 篩選器標頭 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">篩選器</h3>
          </div>

          <div onClick={() => setShowFilter(false)} className="flex">
            <X className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded cursor-pointer transition-colors cursor-pointer" />
            {/* <button className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded">
              執行
            </button> */}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar">
        {/* search bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="透過關鍵字搜尋"
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-orange-400 focus:outline-2 focus:ring-2"
            onChange={onChangeSearch}
            value={search}
          />
        </div>

        {/* platform filter */}
        <button
          onClick={() => toggleSection("platform")}
          className="flex items-center justify-between w-full mb-3"
        >
          <label>平台</label>
          <ChevronDown
            className={`size-4 transition-transform ${expandSections.platform ? "rotate-180" : ""}`}
          />
        </button>

        {/* platform checkboxs list*/}
        {expandSections.platform && (
          <div className="grid grid-cols-2 gap-2">
            {platforms.map((platform) => (
              <label
                key={platform.value}
                className="flex items-center gap-2 text-gray-700 text-sm"
              >
                <input
                  type="checkbox"
                  // id={platform.value}
                  checked={filters.platform?.includes(platform.value) || false}
                  onChange={(e)=>{
                    const checked = e.target.checked;
                    const current = filters.platform || [];
                    // 當下打勾 => 加進陣列裡 , 當下取消打勾 => 從陣列裡刪掉
                    const updated = checked ? [...current, platform.value] : current.filter((p)=> p !== platform.value);

                    // 先前內容 + 修改特定屬性 (ex: platform) => 所以傳進去的 newFilters 就是更新後的內容，再透過 setState hook 更新畫面
                    onFiltersChange({ ...filters,  platform: updated.length > 0 ? updated : null });
                  }}
                />
                <span> {platform.label} </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSiderbar;
