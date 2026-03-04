export function safeExtractProduct(payload){
  console.log('payload', payload);
  if (!payload || typeof payload !== "object") {
    return null; // 或 throw new Error("無效 payload")
  }

  const data = payload.data ?? {};
  const ts = payload.ts ?? Date.now();

  return {
    username: data.username || "某位使用者",
    title: data.title || "某個商品",
    version: payload.version ?? "v",
    index: payload.index ?? "i",
    ts,
  };
};