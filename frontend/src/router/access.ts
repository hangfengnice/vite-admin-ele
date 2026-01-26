import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@/packages/types'

import { generateAccessible } from '@/packages/effects/access'
import { preferences } from '@/packages/core/preferences/src'

import { ElMessage } from 'element-plus'

import { getAllMenusApi } from '@/api/core/menu'
import { BasicLayout, IFrameView } from '@/layouts'
import { $t } from '@/locales'

const forbiddenComponent = () => import('@/views/fallback/forbidden.vue')

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue')

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  }

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      ElMessage({
        duration: 1500,
        message: `${$t('common.loadingMenu')}...`,
      })
      return await getAllMenusApi()
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  })
}

export { generateAccess }
