// 將 URL 路徑清理成標準格式：移除 query/hash、壓縮多餘 /、剔除非根路徑的尾隨 /。
export function normalizePath(input?: string) {
  if (!input) return ""; // • 空輸入（"" 或 undefined）→ 回傳空字串 ""

  // 只取 pathname（避免誤把 query/hash 算進去）
  // "https://example.com/path?query=1#hash" → "/path"
  const pathname = input.split("?")[0].split("#")[0];

  // 把多個 / 壓成一個
  // "/home//user//" → "/home/user"
  const collapsed = pathname.replace(/\/{2,}/g, "/"); 

  // 除了根目錄以外，移除結尾的 /
  // "/home/" → "/home"，但 "/" 保持不變
  if (collapsed !== "/" && collapsed.endsWith("/")) {
    return collapsed.slice(0, -1); 
  }

  return collapsed; 
}
