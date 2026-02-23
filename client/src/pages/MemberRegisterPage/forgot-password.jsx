import { createFileRoute } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";

export const Route = createFileRoute("/MemberRegisterPage/forgot-password")({
  component: ForgotPasswordPage,
});

const METHODS = [
  { label: "EMail", value: "email" },
];

function ForgotPasswordPage() {
  const [method, setMethod] = useState("email");
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [captchaOk, setCaptchaOk] = useState(true); // 先當作示意成功（你可接 turnstile 後改成真狀態）

  const submitDisabled = useMemo(() => {
    if (!agree) return true;
    if (!captchaOk) return true;
    if (!account.trim()) return true;

    if (method === "email") return !email.trim();
    return false;
  }, [agree, captchaOk, account, email, method]);

  function onReset() {
    setMethod("email");
    setAccount("");
    setEmail("");
    setAgree(false);
    setCaptchaOk(true);
  }

  function onSubmit(e) {
    e.preventDefault();

    // TODO: 這裡接你真正的 API
    // 例：POST /api/auth/forgot-password { method, account, email }
    alert("已送出重置申請（示意）");
  }

  return (
    <div className="w-full">
      <div className="rounded-sm border border-black/10 bg-[#e9e9e9] p-6 md:p-10">
        {/* 背景斜紋感（用簡單漸層模擬） */}
        <div className="pointer-events-none absolute opacity-0" />

        <form onSubmit={onSubmit} className="space-y-10">
          {/* 查詢方式 */}
          <section className="space-y-3">
            <label className="block text-orange-500 text-xl font-semibold">
              查詢方式：
            </label>

            <div className="relative">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full appearance-none bg-black text-white px-5 py-4 pr-12 outline-none"
              >
                {METHODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
                ▾
              </div>
            </div>
          </section>
          {/* EMail（method=email 才需要） */}
          {method === "email" && (
            <section className="space-y-3">
              <label className="block text-orange-500 text-xl font-semibold">
                EMail：
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="輸入註冊時的電子信箱"
                className="w-full bg-black text-white placeholder:text-gray-500 px-5 py-4 outline-none"
              />
            </section>
          )}


          {/* 同意條款 */}
          <section className="flex items-start gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              我已閱讀並同意
              <span className="text-red-600 font-semibold"> 服務條款 </span>
              及
              <span className="text-red-600 font-semibold"> 隱私權政策</span>
              ，如未滿十八歲，已取得法定代理人同意。
            </label>
          </section>

          {/* Buttons */}
          <section className="flex items-center justify-center gap-8 pt-2">
            <button
              type="button"
              onClick={onReset}
              className="w-[220px] max-w-full bg-[#cfcfcf] text-gray-700 py-4 border border-black/20 hover:bg-[#d8d8d8] transition"
            >
              取消重填
            </button>

            <button
              type="submit"
              disabled={submitDisabled}
              className={[
                "w-[220px] max-w-full py-4 transition",
                submitDisabled
                  ? "bg-red-700/40 text-white/60 cursor-not-allowed"
                  : "bg-red-700 text-white hover:bg-red-800",
              ].join(" ")}
            >
              EMail重置密碼
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}