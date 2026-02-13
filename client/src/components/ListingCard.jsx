import React from "react";
import { platformIcons } from "../assets/assets";
import {
  BadgeCheck,
  Flame,
  View,
  CircleDollarSign,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigator = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "$";

  return (
    <div className="flex relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transaction">
      {listing.featured ? (
        <>
          <div className="flex flex-col items-center justify-center w-[50px] px-1 text-center">
            <Flame className="text-red-500 w-5" />
            <span className="text-sm text-yellow-500 bg-gradient-to-r from-red-500 to-purple-500 rounded">熱推</span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-[50px] px-1 border-r-0 text-center" />
      )}
      {/* 推薦tag的右半邊 */}
      <div className="p-5 pt-8 w-[100%]">
        {/* header */}
        <div className="flex items-center gap-3 mb-3">
          {platformIcons[listing.platform]}
          <div className="flex flex-col">
            <h2>{listing.title}</h2>
            <p className="text-sm text-gray-500">
              @{listing.username} -{" "}
              <span className="capitalize">{listing.game}</span>
            </p>
          </div>
          {listing.verified && (
            <BadgeCheck className="text-blue-500 ml-auto w-5" />
          )}
        </div>
        {/* stats */}
        <div className="flex items-center gap-10 max-w-lg">
          <div className="flex items-center text-sm text-gray-400">
            <View className="size-6 mr-1 text-gray-400" />
            <span className="text-lg font-medium text-slate-800 mr-1.5">
              {listing.views.toLocaleString()}
            </span>{" "}
            次
          </div>

          {listing.price && (
            <div className="flex items-center text-sm text-gray-400">
              <CircleDollarSign className="size-6 mr-1 text-amber-300" />
              <span className="text-lg font-medium text-slate-800 mr-1.5">
                {listing.price}
              </span>
            </div>
          )}
        </div>
        {/* tags and location */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-medium bg-pink-100 text-pink-600 px-3 py-1 rounded-full capitalize">
            來源
          </span>
          {listing.country && (
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="size-6 mr-1 text-gray-400" />
              {listing.country}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-4 mt-2 line-clamp-2">
          {listing.description}
        </p>
        <hr className="my-5 border-gray-200 w-full" />
        {/* footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm text-green-400 font-bold">創建時間</p>
            <span> {listing.createdAt}</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-blue-600 font-bold">更新時間</p>
            <span> {listing.updatedAt}</span>
          </div>
          <button
            className="px-7 py-3 bg-indigo-600 text-white text-sm rounded-lg hoverLbg-indigo-700 transition"
            onClick={() => {
              navigator(`/listing/${listing.id}`);
              scrollTo(0, 0);
            }}
          >
            詳情
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
