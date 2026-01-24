import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteInjectAppLoadingPlugin } from './plugins/inject-app-loading/index'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'

  const startTime = new Date()

  // 在这里编写你的业务逻辑

  const [loadingPlugin] = await Promise.all([
    viteInjectAppLoadingPlugin(isBuild, env),
  ])

  // 记录结束时间
  const endTime = new Date()

  // 计算执行时间（以毫秒为单位）
  const executionTime = endTime - startTime

  // 输出执行时间
  console.log(`代码执行时间：${executionTime} 毫秒`)
  return {
    plugins: [vue(), loadingPlugin],
    // plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(
        process.env.npm_package_version,
      ),
    },
  }
})
