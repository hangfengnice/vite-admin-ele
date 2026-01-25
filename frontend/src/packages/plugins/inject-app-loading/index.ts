import type { PluginOption } from 'vite'

import fs from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 用于生成将loading样式注入到项目中
 * 为多app提供loading样式，无需在每个 app -> index.html单独引入
 */
async function viteInjectAppLoadingPlugin(
  isBuild: boolean,
  env: Record<string, any> = {},
  loadingTemplate = 'default-loading.html',
): Promise<PluginOption | undefined> {
  const loadingHtml = getLoadingRawByHtmlTemplate(loadingTemplate)
  const version = process.env.npm_package_version
  const envRaw = isBuild ? 'prod' : 'dev'
  const cacheName = `'${env.VITE_APP_NAMESPACE}-${version}-${envRaw}-preferences-theme'`

  // 获取缓存的主题
  // 保证黑暗主题下，刷新页面时，loading也是黑暗主题
  const injectScript = `
  <script data-app-loading="inject-js">
  !function () {
    try{
      var theme = localStorage.getItem(${cacheName});
      document.documentElement.classList.toggle('dark', /dark/.test(theme));
    }catch(err) {
      console.log(err);
    }
  }();
  </script>
  ${loadingHtml.replace('<%= VITE_APP_TITLE %>', env.VITE_APP_TITLE)}
  `

  if (!loadingHtml) {
    return
  }

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    transformIndexHtml: {
      handler(html) {
        if (html.includes('data-app-loading="inject-js"')) return html
        return html.replace(/<body[^>]*>/i, (m) => `${m}\n${injectScript}`)
      },
      order: 'pre',
    },
  }
}

/**
 * 用于获取loading的html模板
 */
function getLoadingRawByHtmlTemplate(loadingTemplate: string) {
  // 支持在app内自定义loading模板，模版参考default-loading.html即可
  let appLoadingPath = join(process.cwd(), loadingTemplate)

  if (!fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    appLoadingPath = join(__dirname, './default-loading.html')
  }

  return fs.readFileSync(appLoadingPath, 'utf8')
}

export { viteInjectAppLoadingPlugin }
