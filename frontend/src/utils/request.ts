import axios from 'axios'
import { useAuthStore } from '@/store'
import { router } from '@/router/index.ts'

const service = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

service.interceptors.request.use((config) => {
  // token
  const userStore = useAuthStore()
  if (userStore.token) {
    config.headers!['Authorization'] = `Bearer ${userStore.token}`
  }
  return config
})

service.interceptors.response.use(
  (response) => {
    let { data: { code, data, message } = {} } = response

    // 后端约定 code === 0 为成功
    if (code === 0) {
      return data
    } else {
      // 业务错误
      alert(message || '请求错误')
      return Promise.reject(response)
    }
  },
  (err) => {
    if (err.response?.status === 401) {
      const userStore = useAuthStore()
      userStore.logout()
      router.push('/login')
      alert('登录已过期，请重新登录')
    }
    return Promise.reject(err)
  },
)

export default service
