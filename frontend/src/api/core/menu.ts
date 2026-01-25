import type { RouteRecordStringComponent } from '@/packages/types'

import { request } from '@/api/request'

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return request.get<RouteRecordStringComponent[]>('/menu/all')
}
