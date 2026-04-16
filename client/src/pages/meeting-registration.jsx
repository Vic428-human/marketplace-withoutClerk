import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import CheckboxGroup from "../components/form/CheckboxGroup";
import RadioGroup from "../components/form/RadioGroup";
import { assets } from "../assets/assets";

// 避免每次 render 都重新建立一次
const initialFormData = {
  // 基本資訊
  name: "", // 姓名
  email: "", // 常用信箱
  phone: "", // 手機號碼
  organisation: "", // 服務單位

  // 工作產業類別
  industry: "", // 下拉選單的選中值
  industryOther: "", // 選擇 Other 時需填寫的產業名稱

  // 欲參與的會議場次
  sessions: [], // checkbox group，多選值陣列

  // 是否參與晚宴
  attendDinner: "", // radio 值：yes / no

  // 飲食習慣
  diet: "", // 晚宴選 yes 後顯示的 radio 值
  dietOther: "", // 飲食習慣選 Other 時的補充輸入
};

const initialErrors = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  industry: "",
  industryOther: "",
  sessions: "",
  attendDinner: "",
  diet: "",
  dietOther: "",
};

const industryOptions = [
  { value: "technology", label: "科技業" },
  { value: "finance", label: "金融業" },
  { value: "education", label: "教育業" },
  { value: "healthcare", label: "醫療業" },
  { value: "media", label: "媒體／出版" },
  { value: "other", label: "其他" },
];

const sessionOptions = [
  { value: "session-a", label: "Session A" },
  { value: "session-b", label: "Session B" },
  { value: "session-c", label: "Session C" },
  { value: "session-d", label: "Session D" },
];

const dinnerOptions = [
  { value: "yes", label: "是" },
  { value: "no", label: "否" },
];

const dietOptions = [
  { value: "normal", label: "葷食" },
  { value: "vegetarian", label: "素食" },
  { value: "other", label: "其他（請填寫）" },
];

function MeetingRegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 使用者重新輸入時先把該欄位錯誤清掉
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

  const handleSessionChange = (values) => {
    // values =>  ["session-a", "session-b"]
    setFormData((prev) => ({
      ...prev,
      sessions: values,
    }));

    if (values.length === 0) {
      setErrors((prev) => ({
        ...prev,
        sessions: "請至少選擇一個會議場次",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        sessions: "",
      }));
    }
  };

  const handleRadioChange = (e) => {
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

  const handleDietChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        diet: value,
      };

      // 如果不是其他，清空補充欄位
      if (value !== "other") {
        next.dietOther = "";
      }

      return next;
    });

    setErrors((prev) => ({
      ...prev,
      diet: "",
      ...(value !== "other" ? { dietOther: "" } : {}),
    }));
  };

  return (
    <div className="min-h-screen bg-[#f6eaf2] px-4 py-0 md:px-6">
      <div className="mx-auto w-full max-w-[576px]">
        <div className="overflow-hidden bg-white/90 shadow-sm">
          <header
            className="relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${assets.pinkBg})` }}
          >
            {/* 這個 header 裡面有內容把它撐開高度，所以背景圖有地方可以顯示 */}
            <div className="px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-12">
              <h1 className="text-center text-[28px] font-bold tracking-[0.08em] text-[#b0005b] md:text-[44px]">
                線上會議報名表
              </h1>
            </div>
          </header>

          <main className="px-6 pb-8 pt-4 md:px-8 md:pb-10">
            <form className="space-y-5">
              {/* 姓名 */}
              <div>
                <InputField
                  id="name"
                  label="姓名"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                  placeholder="請輸入姓名"
                />
              </div>
              <InputField
                id="email"
                label="常用信箱"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                placeholder="請輸入 Email"
              />
              <InputField
                id="phone"
                label="手機號碼"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
                placeholder="請輸入手機號碼"
              />
              <InputField
                id="organisation"
                label="服務單位"
                value={formData.organisation}
                onChange={handleInputChange}
                error={errors.organisation}
                required
                placeholder="請輸入服務單位"
              />

              {/* 工作產業類別 */}
              <SelectField
                id="industry"
                label="工作產業類別"
                value={formData.industry}
                onChange={handleSelectChange}
                options={industryOptions}
                error={errors.industry}
                required
              />

              {/* 欲參與的會議場次 */}
              <div>
                <div className="space-y-3">
                  <CheckboxGroup
                    label="欲參與的會議場次"
                    name="sessions"
                    options={sessionOptions}
                    value={formData.sessions}
                    onChange={handleSessionChange}
                    error={errors.sessions}
                  />
                </div>
              </div>

              {/* 是否參與晚宴 */}
              <div>
                <p className="mb-2 block text-sm font-medium text-gray-800">
                  是否參與晚宴 <span className="text-red-500">*</span>
                </p>

                <div className="flex gap-6">
                  {dinnerOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="attendDinner"
                        value={option.value}
                        checked={formData.attendDinner === option.value}
                        onChange={handleRadioChange}
                        className="h-4 w-4"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>

                {errors.attendDinner && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.attendDinner}
                  </p>
                )}
              </div>

              {/* 飲食習慣 - 只有選擇「是」才顯示 */}
              <div>
                {formData.attendDinner === "yes" && (
                  <>
                    <RadioGroup
                      label="飲食習慣"
                      name="diet"
                      options={dietOptions}
                      value={formData.diet}
                      onChange={handleDietChange}
                      error={errors.diet}
                      required
                      variant="circle"
                    />

                    {/* 只有飲食習慣選擇「其他」時才顯示補充欄位 */}
                    {formData.diet === "other" && (
                      <InputField
                        id="dietOther"
                        label="請補充您的飲食習慣"
                        value={formData.dietOther}
                        onChange={handleInputChange}
                        error={errors.dietOther}
                        placeholder="請詳細說明您的飲食需求（例如：無蛋奶素、海鮮過敏等）"
                      />
                    )}
                  </>
                )}
              </div>
            </form>
          </main>

          <footer className="relative overflow-hidden">
            {/* 先給 footer 一個明確高度，讓整個區塊有穩定基準 */}
            <div className="relative h-[180px] md:h-[230px]">
              {/* 背景圖獨立一層，貼在底部，不再跟按鈕綁死 */}-+
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-[length:100%_auto] bg-bottom bg-no-repeat md:h-[170px]"
                style={{ backgroundImage: `url(${assets.footerBg})` }}
              />
              {/* 按鈕獨立一層，用 absolute 定位，不靠 padding 猜位置 */}
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

          {/* <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
            {JSON.stringify(formData, null, 2)}
          </pre> */}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/meeting-registration")({
  component: MeetingRegistrationPage,
});
