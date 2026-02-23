// 菜單系統工具：建立路徑-標題映射並提供活躍狀態判斷
import { normalizePath } from "./path";

export function buildMenuLabelMap(menus: { to: string; label: string }[]) {
  // 建立路徑 → 標題的 Map，統一用 normalizePath 標準化 key
  // 用途：將菜單配置轉成快速查詢字典，避免重複 normalize 計算
  const map = new Map<string, string>();
  for (const m of menus) {
    map.set(normalizePath(m.to), m.label); 
  }
  return map;
}

export function getMenuTitleByPathname(
  pathname: string, // ex: /MemberRegisterPage/register
  labelMap: Map<string, string>,
  /*
  ex: {
        "key": "/MemberRegisterPage/register",
        "value": "會員註冊"
    }
  */
  fallback = "會員註冊", // 找不到對應標題時的預設值
) {
  // 根據當前路徑從映射中取得對應菜單標題
  // 用途：動態顯示當前頁面的麵包屑或標題
  const key = normalizePath(pathname);
  return labelMap.get(key) || fallback;
}

export function isActivePath(pathname: string, to: string) {
  // 判斷當前路徑是否匹配某個菜單項（用於高亮 active 狀態）
  // 用途：React Router 等路由系統中標記當前活躍菜單
  return normalizePath(pathname) === normalizePath(to);
}
