import React from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // ✅ 確認路徑

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => <div className="p-8 text-center">404 - 頁面不存在</div>, // ✅ 避免默認 Not Found
  context: { /* Redux 等全域狀態 */ },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
