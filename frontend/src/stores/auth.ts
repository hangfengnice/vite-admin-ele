import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  username: string
  role: 'admin' | 'user'
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userInfo: null as UserInfo | null,
    routesLoaded: false,
    checkedRemoteInfo: false,
  }),
  persist: {
    key: 'auth',
    paths: ['token', 'userInfo'],
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    login(info: UserInfo) {
      this.token = info.token
      this.userInfo = info
      this.routesLoaded = false
      // this.checkedRemoteInfo =
    },
    logout() {
      this.token = ''
      this.userInfo = null
    },
  },
})
