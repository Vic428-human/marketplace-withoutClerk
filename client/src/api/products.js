
export const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`產品載入失敗：${response.status}`);
  }

  return response.json();
};