import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
const Hero = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/marketplace?search=${input}`);
  };
  return (
    <>
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-gray-800">
        {/* Avatars + Stars */}
        <div className="flex items-center mt-24 md:mt-36">
          <div className="flex space-x-0 pr-3">
            {user && (
              <img
                onClick={() => {
                  navigate("/");
                  scrollTo(0, 0);
                }}
                src={user.imageUrl}
                alt="自己的頭像"
                className="h-10 cursor-pointer"
              />
            )}

            <img
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              src={assets.avatar02}
              alt="logo"
              className="h-10 cursor-pointer"
            />
            <img
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              src={assets.avatar03}
              alt="logo"
              className="h-10 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star text-transparent fill-yellow-300"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                ))}
            </div>
            <p className="text-sm text-gray-700">
              {" "}
              獲得超過 10,000+ 玩家的一致好評
            </p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold max-w-lg md:max-w-2xl text-center mt-4 leading-tight md:leading-tight">
          在{" "}
          <span className="relative bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            RO樂園
            <div className="z-10 absolute bottom-0 left-0 w-full scale-120">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient_arc.svg"
                alt="gradient"
              />
            </div>
          </span>
          <span className="relative bg-gradient-to-r from-cyan-500 to-[#22d3ee] bg-clip-text text-transparent">
            買賣交易
          </span>
          裝備與道具平台
        </h1>

        <p className="max-w-xl text-center text-base my-7">
          安全可靠的交易平台，讓你快速、安心、零煩惱地買賣
        </p>

        {/* Search Box */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full flex justify-center group"
        >
          <label className="border border-gray-400 rounded-md p-1 flex items-center w-full max-w-md">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="快速查詢"
              className="pl-2 flex-1 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 px-6 rounded-md cursor-pointer transition-colors">
              查詢
            </button>
          </label>
        </form>
      </div>
    </>
  );
};

export default Hero;
