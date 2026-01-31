import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { viteInjectAppLoadingPlugin } from './src/packages/plugins/inject-app-loading/index'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'

  const [loadingPlugin] = await Promise.all([
    viteInjectAppLoadingPlugin(isBuild, env),
  ])
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // 自动导入组件（<el-button />）
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      loadingPlugin,
    ],
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
