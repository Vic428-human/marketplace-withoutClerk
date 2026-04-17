import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import { assets } from "../assets/assets";
import { createAuctionListing } from "../api/auction";

// 避免每次 render 都重新建立一次
const initialFormData = {
  // 商品基本資訊
  itemName: "",
  itemImageUrl: "",
  category: "",
  startingPrice: "",
  itemDescription: "",
  minIncrement: "",
  endTime: "",
};

const initialErrors = {
  itemName: "",
  itemImageUrl: "",
  category: "",
  startingPrice: "",
  itemDescription: "",
  minIncrement: "",
  endTime: "",
};

const categoryOptions = [
  { value: "currency", label: "遊戲幣" },
  { value: "equipment", label: "裝備" },
  { value: "consumable", label: "消耗品" },
  { value: "material", label: "材料" },
  { value: "other", label: "其他" },
];

function CreateAuctionListingPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const createAuctionMutation = useMutation({
    mutationFn: createAuctionListing,
    onSuccess: async (result) => {
      setFormData(initialFormData);
      setErrors(initialErrors);

      await queryClient.invalidateQueries({
        queryKey: ["auctions"],
      });

      console.log("create auction success:", result);
    },
    onError: (error) => {
      console.error("create auction error:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {
      ...initialErrors,
    };

    if (!formData.itemName.trim()) {
      nextErrors.itemName = "請輸入商品名稱";
    }

    if (!formData.itemImageUrl.trim()) {
      nextErrors.itemImageUrl = "請輸入商品圖片網址";
    }

    if (!formData.category) {
      nextErrors.category = "請選擇商品分類";
    }

    if (!formData.startingPrice || Number(formData.startingPrice) <= 0) {
      nextErrors.startingPrice = "請輸入有效的起標價";
    }

    if (formData.minIncrement && Number(formData.minIncrement) < 0) {
      nextErrors.minIncrement = "最小加價幅度不可小於 0";
    }

    if (!formData.endTime) {
      nextErrors.endTime = "請選擇結標時間";
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      item_name: formData.itemName.trim(),
      item_image_url: formData.itemImageUrl.trim(),
      item_description: formData.itemDescription.trim(),
      starting_price: Number(formData.startingPrice),
      min_increment: formData.minIncrement
        ? Number(formData.minIncrement)
        : 0,
      end_time: new Date(formData.endTime).toISOString(),
      // category: formData.category,
      // 目前先不送，避免和現有後端 API contract 不一致
    };

    createAuctionMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#f6eaf2] px-4 py-0 md:px-6">
      <div className="mx-auto w-full max-w-[576px]">
        <div className="overflow-hidden bg-white/90 shadow-sm">
          <header
            className="relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${assets.pinkBg})` }}
          >
            <div className="px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-12">
              <h1 className="text-center text-[28px] font-bold tracking-[0.08em] text-[#b0005b] md:text-[44px]">
                建立拍賣商品
              </h1>
            </div>
          </header>

          <main className="px-6 pb-8 pt-4 md:px-8 md:pb-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                id="itemName"
                label="商品名稱"
                value={formData.itemName}
                onChange={handleInputChange}
                error={errors.itemName}
                required
                placeholder="請輸入商品名稱"
              />

              <InputField
                id="itemImageUrl"
                label="商品圖片網址"
                value={formData.itemImageUrl}
                onChange={handleInputChange}
                error={errors.itemImageUrl}
                required
                placeholder="請輸入商品圖片網址"
              />

              <SelectField
                id="category"
                label="商品分類"
                value={formData.category}
                onChange={handleSelectChange}
                options={categoryOptions}
                error={errors.category}
                required
              />

              <InputField
                id="startingPrice"
                label="起標價"
                type="number"
                value={formData.startingPrice}
                onChange={handleInputChange}
                error={errors.startingPrice}
                required
                placeholder="請輸入起標價"
              />

              <InputField
                id="minIncrement"
                label="最小加價幅度"
                type="number"
                value={formData.minIncrement}
                onChange={handleInputChange}
                error={errors.minIncrement}
                placeholder="請輸入最小加價幅度"
              />

              <InputField
                id="endTime"
                label="結標時間"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleInputChange}
                error={errors.endTime}
                required
              />

              <InputField
                id="itemDescription"
                label="商品描述"
                value={formData.itemDescription}
                onChange={handleInputChange}
                error={errors.itemDescription}
                placeholder="請輸入商品描述"
              />

              {createAuctionMutation.isError && (
                <p className="text-sm font-medium text-red-500">
                  {createAuctionMutation.error?.message || "建立拍賣商品失敗"}
                </p>
              )}

              {createAuctionMutation.isSuccess && (
                <p className="text-sm font-medium text-green-600">
                  拍賣商品建立成功
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={createAuctionMutation.isPending}
                  className="w-full rounded-md bg-[#b0005b] px-4 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {createAuctionMutation.isPending ? "送出中..." : "建立拍賣商品"}
                </button>
              </div>
            </form>
          </main>

          <footer className="relative overflow-hidden">
            <div className="relative h-[180px] md:h-[230px]">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-[length:100%_auto] bg-bottom bg-no-repeat md:h-[170px]"
                style={{ backgroundImage: `url(${assets.footerBg})` }}
              />
              <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
                <button
                  type="button"
                  className="inline-block translate-y-2 transition hover:opacity-90 md:translate-y-4"
                >
                  <img
                    src={assets.registerBtn}
                    alt="馬上報名"
                    className="h-auto w-[220px] md:w-[260px]"
                  />
                </button>
              </div>
            </div>
          </footer>

          <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/create-auction")({
  component: CreateAuctionListingPage,
});