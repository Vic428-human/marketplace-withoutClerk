import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { assets } from "../assets/assets";

const Aution = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:8080/auctions", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("failed to fetch auctions");
        }

        const data = await res.json();
        setListings(data.data || []);
      } catch (err) {
        console.error("fetch auctions error:", err);
        setError("Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const items = listings.map((listing, index) => ({
    id: listing.id,
    position: index + 1,
    src: listing.item_image_url,
    alt: listing.item_name,
    currentPrice: listing.current_price,
  }));

  console.log('items:', items);

  const quantity = items.length || 1;

  if (loading) {
    return <div className="text-center pt-20">Loading auctions...</div>;
  }

  if (error) {
    return <div className="text-center pt-20 text-red-500">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center pt-20">No auctions available.</div>;
  }

  return (
    <div className="-mt-20 w-screen h-screen text-center overflow-hidden relative">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://en.pimg.jp/120/301/641/1/120301641.jpg')",
        }}
      />

      <div className="absolute left-1/2 top-[5%] -translate-x-1/2 w-[420px] pointer-events-none z-0">
        <img
          src={assets.model}
          alt="center"
          className="w-full object-contain"
        />
      </div>

      <div
        className="banner-slider absolute w-[150px] h-[200px] top-[15%] left-[calc(50%-100px)] [transform-style:preserve-3d] [transform:perspective(1000px)] z-10"
        style={{ "--quantity": quantity }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            className="absolute inset-0 [transform:rotateY(calc((var(--position)-1)*(360deg/var(--quantity))))_translateZ(550px)]"
            style={{ "--position": it.position }}
          >
            <Link
              to="/auctions/$id"
              params={{ id: it.id }}
              className="block w-full h-full"
            >
              <img
                className="w-full h-full object-cover cursor-pointer"
                src={it.src}
                alt={it.alt}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aution;

export const Route = createFileRoute("/Aution")({
  component: Aution,
});