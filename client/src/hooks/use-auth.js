// src/hooks/use-auth.js
import { useContext } from "react";
import { AuthContext } from "../context/auth-context-def";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth 必須在 AuthProvider 內使用");
  }
  return context;
};
