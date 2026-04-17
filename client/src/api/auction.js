export async function createAuctionListing(payload) {
  const res = await fetch("http://localhost:8080/auctions", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error || "建立拍賣商品失敗");
  }

  return result;
}