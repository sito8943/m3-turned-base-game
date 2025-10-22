import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist",
    rollupOptions: {
      input: "src/main.tsx",
    },
  },
});
