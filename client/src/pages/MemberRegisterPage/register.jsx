import { createFileRoute } from "@tanstack/react-router";

function RegisterPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">會員註冊</h2>

      <p className="text-gray-600">
        請填寫以下資料完成平台會員註冊。
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm mb-1">信箱</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="請輸入信箱"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">密碼</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          立即註冊
        </button>
      </form>
    </div>
  );
}

export const Route = createFileRoute("/MemberRegisterPage/register")({
  component: RegisterPage,
});