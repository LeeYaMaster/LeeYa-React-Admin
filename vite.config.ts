import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 体积分析插件：打包后生成 dist/stats.html
    visualizer({
      open: true, // 打包后自动打开报告
      filename: 'dist/stats.html',
      gzipSize: true, // 显示 gzip 压缩后的大小
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 第三方核心依赖单独打包（缓存复用）
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // 大体积库单独拆包（避免 vendor 过大）
          echarts: ['echarts/core', 'echarts/charts'],
          // 非首屏路由组件拆包（配合路由懒加载）
          list: ['./src/dashboard/list.tsx'],
          statistics: ['./src/dashboard/statistics.tsx'],
        },
      },
    },
  }
})
