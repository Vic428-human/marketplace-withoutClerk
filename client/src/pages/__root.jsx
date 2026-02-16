import { createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navabr'; // 你的 Navbar

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen">
      <Navbar /> {/* 全域導航 */}
      <main className="pt-16"> {/* 避開 Navbar */}
        <Outlet /> {/* ✅ 關鍵：自動渲染子頁面 */}
      </main>
    </div>
  );
}
