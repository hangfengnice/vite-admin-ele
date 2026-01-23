import { createApp, watchEffect } from 'vue'

import { registerAccessDirective } from './packages/effects/access'
import { registerLoadingDirective } from '@/packages/effects/common-ui/src'
import { preferences } from './packages/core/preferences/src'
import { initStores } from './packages/stores'
import './packages/styles/src/ele/index.css'
import '@/style/tailwind.css'
import './packages/styles/src/index'

// import '@/packages/icons/register'

import { useTitle } from '@vueuse/core'
import { ElLoading } from 'element-plus'

import { $t, setupI18nEle } from './locales'

import { initComponentAdapter } from './adapter/component'
import { initSetupVbenForm } from './adapter/form'
import App from './app.vue'
import { router } from './router'

async function bootstrap(namespace: string) {
  // 初始化组件适配器
  await initComponentAdapter()

  // 初始化表单组件
  await initSetupVbenForm()

  // // 设置弹窗的默认配置
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // // 设置抽屉的默认配置
  // setDefaultDrawerProps({
  //   zIndex: 2000,
  // });
  const app = createApp(App)

  // 注册Element Plus提供的v-loading指令
  app.directive('loading', ElLoading.directive)

  // 注册Vben提供的v-loading和v-spinning指令
  registerLoadingDirective(app, {
    loading: false, // Vben提供的v-loading指令和Element Plus提供的v-loading指令二选一即可，此处false表示不注册Vben提供的v-loading指令
    spinning: 'spinning',
  })

  // 国际化 i18n 配置
  await setupI18nEle(app)

  // 配置 pinia-tore
  await initStores(app, { namespace })

  // 安装权限指令
  registerAccessDirective(app)

  // 初始化 tippy
  const { initTippy } =
    await import('@/packages/effects/common-ui/src/components/tippy')
  initTippy(app)

  // 配置路由及路由守卫
  app.use(router)

  // 配置Motion插件
  const { MotionPlugin } = await import('@/packages/effects/plugins/src/motion')
  app.use(MotionPlugin)

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name
      useTitle(pageTitle)
    }
  })

  app.mount('#app')
}

export { bootstrap }
