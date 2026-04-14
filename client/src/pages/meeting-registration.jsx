import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
function MeetingRegistrationPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  return (
    <div className="min-h-screen bg-[#fdf7fb] px-4 py-10">
      <div className="mx-auto w-full max-w-[576px] rounded-2xl bg-white/80 p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-pink-700">
          線上會議報名表
        </h1>

        <p className="text-sm text-gray-600">
          這裡先放頁面骨架，下一步再接表單欄位。
        </p>

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
