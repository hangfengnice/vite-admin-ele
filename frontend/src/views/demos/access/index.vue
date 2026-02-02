<script lang="ts" setup>
import type { Recordable } from '@/packages/types'

import { useRouter } from 'vue-router'

import { useAccess } from '@/packages/effects/access'
import { Page } from '@/packages/effects/common-ui/src'
import { resetAllStores, useUserStore } from '@/stores'

import { useAuthStore } from '@/stores'

const accounts: Record<string, Recordable<any>> = {
  admin: {
    password: '123456',
    username: 'admin',
  },
  super: {
    password: '123456',
    username: 'vben',
  },
  user: {
    password: '123456',
    username: 'jack',
  },
}

const { accessMode, toggleAccessMode } = useAccess()
const userStore = useUserStore()
const accessStore = useAuthStore()
const router = useRouter()

function roleButtonType(role: string) {
  return userStore.userRoles.includes(role) ? 'primary' : 'default'
}

async function changeAccount(role: string) {
  if (userStore.userRoles.includes(role)) {
    return
  }

  const account = accounts[role]
  resetAllStores()
  if (account) {
    await accessStore.authLogin(account, async () => {
      router.go(0)
    })
  }
}

async function handleToggleAccessMode() {
  if (!accounts.super) {
    return
  }
  await toggleAccessMode()
  resetAllStores()

  await accessStore.authLogin(accounts.super, async () => {
    setTimeout(() => {
      router.go(0)
    }, 150)
  })
}
</script>

<template>
  <Page
    :title="`${accessMode === 'frontend' ? '前端' : '后端'}页面访问权限演示`"
    description="切换不同的账号，观察左侧菜单变化。"
  >
    <ElCard class="mb-5" header="权限模式">
      <span class="font-semibold">当前权限模式:</span>
      <span class="mx-4 text-primary">
        {{ accessMode === 'frontend' ? '前端权限控制' : '后端权限控制' }}
      </span>
      <ElButton type="primary" @click="handleToggleAccessMode">
        切换为{{ accessMode === 'frontend' ? '后端' : '前端' }}权限模式
      </ElButton>
    </ElCard>
    <ElCard header="账号切换">
      <ElButton :type="roleButtonType('super')" @click="changeAccount('super')">
        切换为 Super 账号
      </ElButton>

      <ElButton
        :type="roleButtonType('admin')"
        class="mx-4"
        @click="changeAccount('admin')"
      >
        切换为 Admin 账号
      </ElButton>
      <ElButton :type="roleButtonType('user')" @click="changeAccount('user')">
        切换为 User 账号
      </ElButton>
    </ElCard>
  </Page>
</template>
