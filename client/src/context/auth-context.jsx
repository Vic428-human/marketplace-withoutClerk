// src/context/AuthProvider.jsx
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./auth-context-def.js"; // 引入定義

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", { credentials: "include" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setIsAuthenticated(true);
      setUserInfo(data.user);
      return true;
    } catch {
      setIsAuthenticated(false);
      setUserInfo(null);
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const refreshAuth = useCallback(async () => {
    setAuthLoading(true);
    return await checkAuth();
  }, [checkAuth]);

  const value = { isAuthenticated, userInfo, authLoading, refreshAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}