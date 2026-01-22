import request from '@/utils/request'
import type { UserListParams, UserListRes } from '../types/user'

export function login(data: { username: string; password: string }) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function fetchUserInfoByToken(data = {}) {
  return request({
    url: '/user/info',
    method: 'post',
    data,
  })
}

export const createUser = (data: any) =>
  request({ url: '/users', method: 'post', data })
export const updateUser = (id: number, data: any) =>
  request({ url: `/users/${id}`, method: 'put', data })
export const deleteUser = (id: number) =>
  request({ url: `/users/${id}`, method: 'delete' })

export const getUserList = (params: UserListParams) => {
  return request.get<UserListRes>('/users', { params })
}

export const fetchUserList = (params) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true

      let list = [
        { id: 1, name: 'Tom', email: 'tom@test.com' },
        { id: 2, name: 'Jerry', email: 'jerry@test.com' },
      ]

      if (params.keyword) {
        list = list.filter((r) => r.name.includes(params.keyword))
      }

      if (success) {
        resolve({ list, total: 2 })
      } else {
        reject(new Error('获取数据失败'))
      }
    }, 500)
  })
}

export const hello = (params = {}) => {
  return request({
    url: `/hello`,
    method: 'get',
    params,
  })
}

export const getTest = (data = {}) => {
  return request({
    url: `/test`,
    method: 'post',
    data,
  })
}
