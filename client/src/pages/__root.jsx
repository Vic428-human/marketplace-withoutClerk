import { createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navabr'; // 你的 Navbar

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen">
      {/* 固定或正常高度 */}
      <Navbar /> 
      {/* 所有頁面都會被往下推 5rem。 */}
      <main className="mt-20"> 
        <Outlet /> {/* ✅ 關鍵：自動渲染子頁面 */}
      </main>
    </div>
  );
}
