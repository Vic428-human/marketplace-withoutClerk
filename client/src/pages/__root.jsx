import { createRootRoute, Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navabr'; // 你的 Navbar

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen">
      <Navbar /> 
      <main className="mt-20"> 
        <Outlet /> 
      </main>
    </div>
  );
}
