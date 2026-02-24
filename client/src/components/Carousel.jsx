import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 3000,
  slides,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      {/* 可讓 transform 變化平滑執行 500ms 並以緩出曲線結束 */}
      {/* 讓容器向左平移 curr 個幻燈片寬度的距離（curr 是當前索引，如 0、1、2...），使第 curr 張 slide 顯示在視窗中 */}
      {/* curr = 0 → translateX(0%) → 第1張顯示
          curr = 1 → translateX(-100%) → 第2張顯示  
          curr = 2 → translateX(-200%) → 第3張顯示 
      */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img) => (
          <img src={img} alt="" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          onClick={prev}
        >
          <ChevronLeft size={40} />
        </button>
        <button
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
          onClick={next}
        >
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurr(i)}
              className={`
      w-3 h-3 rounded-full transition-all
      ${curr === i ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}
    `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
