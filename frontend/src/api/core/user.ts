import type { UserInfo } from '@/packages/types'

import { request } from '@/api/request'

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return request.get<UserInfo>('/user/info')
}
