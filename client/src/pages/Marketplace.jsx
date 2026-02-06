import React from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigator = useNavigate();
  const [showFilter, setShowFilter] = React.useState(false);
  

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      {/* 上半段 */}
      <div className="flex items-center justify-between text-slate-500">
        <button onClick={()=>{navigator('/'); scrollTo(0, 0);}} className="flex items-center gap-2 py-4">
          <ArrowLeftIcon className="size-4"/>
          回上一頁
        </button>
        <button onClick={()=>{setShowFilter(true); navigator('/'); scrollTo(0, 0);}} className="flex sm:hidden items-center gap-2 py-4">
          <FilterIcon className="size-4" />
          篩選器</button>
      </div>
      
      {/* 下半段 左邊篩選內容 + 右邊展示產品 */}
      <div className="relative flex items-start justify-between gap-8 pb-8">
          <div className="hidden sm:block flex-1">篩選器</div>
          <div className="flex-1 grid xl:grid-cols-2 gap-4">列表</div>
      </div>
    </div>
  );
};

export default Marketplace;
