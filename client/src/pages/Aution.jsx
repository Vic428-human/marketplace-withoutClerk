import { createFileRoute } from "@tanstack/react-router"
import React from "react";
import { useLocation } from "react-router-dom";

const Aution = () => {
  const location = useLocation();

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

    const quantity = 10;
  return (
    <div>
      {/* Aution : {location.state.alt} */}
      <div>

        <div className="mt-8 w-full h-[300px] text-center fixed top-[5%] z-50">
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
      </div>
    </div>
  );
};

export default Aution;

export const Route = createFileRoute('/Aution')({  // 或 '/aution'
  component: Aution,
});
