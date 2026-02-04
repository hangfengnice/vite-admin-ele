import { baseRequest, request } from '@/api/request'

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string
    username?: string
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string
  }

  export interface RefreshTokenResult {
    data: string
    status: number
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // return requestClient.post<AuthApi.LoginResult>('/auth/login', data)
  return request.post(`/auth/login`, data)
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequest.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  })
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequest.post('/auth/logout', {
    withCredentials: true,
  })
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return request.get<string[]>('/auth/codes')
}
