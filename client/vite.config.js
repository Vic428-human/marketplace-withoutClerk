import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite"; // ✅ 小寫 + 新匯入

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      // ✅ 小寫函數
      routesDirectory: "./src/pages", // 你的 pages
      target: "react",
    }),
  ],
});
