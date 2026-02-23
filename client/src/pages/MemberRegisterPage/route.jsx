import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  buildMenuLabelMap,
  getMenuTitleByPathname,
  isActivePath,
} from "../../utils/menu";

const MENUS = [
  { label: "會員註冊", to: "/MemberRegisterPage/register" },
  { label: "忘記平台密碼", to: "/MemberRegisterPage/forgot-password" },
];

/* 每個路徑有對應的標題，用於動態顯示麵包屑或標題
{
    "key": "/MemberRegisterPage/register",
    "value": "會員註冊"
}
*/
const menuLabelMap = buildMenuLabelMap(MENUS);

function MemberRegisterPageLayout() {
  // 根據當前路徑，拿到對應標題
  const pathnameRaw = useRouterState({ select: (s) => s.location.pathname });
  const currentTitle = getMenuTitleByPathname(pathnameRaw, menuLabelMap);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 md:flex md:justify-center">
        <div className="w-full md:w-[1100px] py-8">
          {/* breadcrumb */}
          <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
            <span>首頁</span>
            <span>&gt;</span>
            <span>會員專區</span>
            <span>&gt;</span>
            <span className="text-orange-500 font-medium">{currentTitle}</span>
          </div>

          {/* 手機版橫向選單，桌面模式下會隱藏 */}
          <section className="md:hidden mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-1 h-10 bg-orange-500" />
              <h2 className="text-3xl font-bold text-orange-500">會員專區</h2>
            </div>
            <ul className="flex flex-wrap gap-y-3 text-gray-200 text-base leading-relaxed">
              {MENUS.map((m, idx) => {
                const active = isActivePath(pathnameRaw, m.to);
                return (
                  <li key={m.to} className="flex items-center">
                    <Link
                      to={m.to}
                      className={active ? "text-orange-500 font-medium" : ""}
                    >
                      {m.label}
                    </Link>
                    {idx !== MENUS.length - 1 && (
                      <span className="text-gray-500 px-2">|</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="md:flex md:gap-12">
            {/* 桌機 sidebar */}
            <aside className="hidden md:block w-[240px]">
              <h2 className="text-2xl font-bold text-orange-500 mb-6">
                會員專區
              </h2>

              <ul className="space-y-4 text-gray-300">
                {MENUS.map((m) => {
                  const active = isActivePath(pathnameRaw, m.to);
                  return (
                    <li key={m.to}>
                      <Link
                        to={m.to}
                        className={active ? "text-orange-500 font-medium" : ""}
                      >
                        {m.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* 右側 content */}
            <main className="flex-1">
              <div className="flex items-center gap-3 border-b border-gray-700 pb-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-orange-500">
                  {currentTitle}
                </h1>
                <span className="text-sm text-gray-400">註冊教學</span>
              </div>

              <div className="bg-white text-black rounded-sm p-6 md:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ 重點：parent route 不要用尾巴 /
// ✅ 檔名建議：client/src/pages/MemberRegisterPage/route.jsx
export const Route = createFileRoute("/MemberRegisterPage")({
  component: MemberRegisterPageLayout,
});
