import { jwtDecode } from "jwt-decode";
export function parseToken(token) {
  if (!token) return { userInfo: null, isExpired: false };
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    const isExpired = decoded.exp && decoded.exp < now;
    return { userInfo: decoded, isExpired };
  } catch (err) {
    console.error("Token 解析失敗", err);
    return { userInfo: null, isExpired: true };
  }
}
