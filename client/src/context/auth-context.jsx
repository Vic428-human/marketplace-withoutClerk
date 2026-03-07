// src/context/auth-context.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./auth-context-def.js";  // 匯入 Context

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
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
      } catch (err) {
        console.error("檢查登入狀態失敗:", err);
        setIsAuthenticated(false);
        setUserInfo(null);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    userInfo,
    authLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
