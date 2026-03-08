import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./auth-context-def.js"; 
/*
刷新頁面
     ↓
index.jsx 重新執行
     ↓
<AuthProvider> 重新 mount
     ↓
useEffect([]) 執行
     ↓
呼叫 /auth/me
*/
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 提取檢查認證的邏輯為獨立函數
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      setIsAuthenticated(true);
      setUserInfo(data.user);
      return true; // 成功
    } catch (err) {
      console.error("檢查登入狀態失敗:", err);
      setIsAuthenticated(false);
      setUserInfo(null);
      return false; // 失敗
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 提供給子組件使用的 refresh 方法
  const refreshAuth = useCallback(async () => {
    setAuthLoading(true);
    return await checkAuth();
  }, [checkAuth]);

  const value = {
    isAuthenticated,
    userInfo,
    authLoading,
    refreshAuth, // 新增這個方法
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
