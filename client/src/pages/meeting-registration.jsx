import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField";
import CheckboxGroup from "../components/form/CheckboxGroup";

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

  return (
    <div className="min-h-screen bg-[#fdf7fb] px-4 py-10">
      <div className="mx-auto w-full max-w-[576px] rounded-2xl bg-white/80 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-pink-700">
          線上會議報名表
        </h1>
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
        </form>

        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-700">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/meeting-registration")({
  component: MeetingRegistrationPage,
});
