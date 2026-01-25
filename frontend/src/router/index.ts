import { createRouter, createWebHistory } from 'vue-router'
import { resetStaticRoutes } from '@/utils/helpers/reset-routes'
import { createRouterGuard } from './guard'
import { routes } from './routes'

console.log(routes, 'routes')

/**
 *  @zh_CN 创建vue-router实例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
  // 应该添加到路由的初始路由列表。
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  },
  // 是否应该禁止尾部斜杠。
  // strict: true,
})

const resetRoutes = () => resetStaticRoutes(router, routes)

// 创建路由守卫
createRouterGuard(router)

export { resetRoutes, router }
