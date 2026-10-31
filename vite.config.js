// N3 corrected by chatgpt.com
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
    },
  },
});

// N2
// vite.config.js - from web-invitation-> based(business-card)
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@components": path.resolve(__dirname, "./src/components"),
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "@assets": path.resolve(__dirname, "./src/assets"),
//       "@utils": path.resolve(__dirname, "./src/utils"),
//     },
//   },
// });

// N1
// Origin vite.config.js
// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
