import React from "react";
import { useSelector } from "react-redux";
import Title from "./Title";
import ListingCard from "./ListingCard";

const LatestListing = () => {
  // state.listing.listings => state.[slice name].[initialState]
  const { listings } = useSelector((state) => state.listing);
  const sortedListings = [...listings].sort((a, b) => b.views - a.views);
  return (
    <div className="mt-20 mb-8">
      <Title
        title="近期熱門商品"
        desciption="展示時間靠前，且觀看次數最高的前三筆"
      />
      <div className="flex flex-col gap-6 p">
        {/* 預期後端傳來的資料都是時間最靠近現在的 */}
        {/* 展示的是時間靠前，且觀看次數最高的前三筆 */}
        {sortedListings.slice(0, 3).map((listing, index) => (
          <div key={index}>
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListing;
