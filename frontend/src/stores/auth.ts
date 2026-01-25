import type { Recordable, UserInfo } from '@/packages/types'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { LOGIN_PATH } from '@/packages/constants'
import { preferences } from '@/packages/core/preferences/src'
import { resetAllStores } from '@/stores/setup'
import { useUserStore } from '@/stores/modules/user'
import { useAccessStore } from '@/stores/modules/access'

import { ElNotification } from 'element-plus'
import { defineStore } from 'pinia'

import { getUserInfoApi } from '@/api/core/user'
import { getAccessCodesApi, loginApi, logoutApi } from '@/api/core/auth'
import { $t } from '@/locales'

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore()
  const userStore = useUserStore()
  const router = useRouter()

  const loginLoading = ref(false)

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null
    try {
      loginLoading.value = true
      const user = await loginApi(params)
      let { token } = user
      // 如果成功获取到 token
      if (token) {
        // 将 accessToken 存储到 accessStore 中
        accessStore.setAccessToken(token)

        // 获取用户信息并存储到 accessStore 中
        // const [fetchUserInfoResult, accessCodes] = await Promise.all([
        //   fetchUserInfo(),
        //   getAccessCodesApi(),
        // ])

        userInfo = user

        userStore.setUserInfo(userInfo)
        // accessStore.setAccessCodes(accessCodes)
        accessStore.setAccessCodes([
          'AC_100100',
          'AC_100110',
          'AC_100120',
          'AC_100010',
        ])

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false)
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(
                userInfo?.homePath || preferences.app.defaultHomePath,
              )
        }

        if (userInfo?.realName) {
          ElNotification({
            message: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
            title: $t('authentication.loginSuccess'),
            type: 'success',
          })
        }
      }
    } finally {
      loginLoading.value = false
    }

    return {
      userInfo,
    }
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi()
    } catch {
      // 不做任何处理
    }
    resetAllStores()
    accessStore.setLoginExpired(false)

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    })
  }

  async function fetchUserInfo() {
    let userInfo: null | UserInfo = null
    userInfo = await getUserInfoApi()
    userStore.setUserInfo(userInfo)
    return userInfo
  }

  function $reset() {
    loginLoading.value = false
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  }
})
