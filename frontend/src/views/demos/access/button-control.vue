<script lang="ts" setup>
import type { Recordable } from '@/packages/types'

import { useRouter } from 'vue-router'

import { AccessControl, useAccess } from '@/packages/effects/access'
import { Page } from '@/packages/effects/common-ui/src'
import { resetAllStores, useUserStore } from '@/stores'

import { useAuthStore } from '@/stores'
import { ElButton } from 'element-plus'

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

const { accessMode, hasAccessByCodes } = useAccess()
const authStore = useAuthStore()
const userStore = useUserStore()
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
    await authStore.authLogin(account, async () => {
      router.go(0)
    })
  }
}
</script>

<template>
  <Page
    :title="`${accessMode === 'frontend' ? '前端' : '后端'}按钮访问权限演示`"
    description="切换不同的账号，观察按钮变化。"
  >
    <ElCard class="mb-5">
      <template #title>
        <span class="font-semibold">当前角色:</span>
        <span class="mx-4 text-lg text-primary">
          {{ userStore.userRoles?.[0] }}
        </span>
      </template>

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

    <ElCard class="mb-5" title="组件形式控制 - 权限码">
      <AccessControl :codes="['AC_100100']" type="code">
        <ElButton class="mr-4">Super 账号可见 ["AC_100100"]</ElButton>
      </AccessControl>
      <AccessControl :codes="['AC_100030']" type="code">
        <ElButton class="mr-4">Admin 账号可见 ["AC_100030"]</ElButton>
      </AccessControl>
      <AccessControl :codes="['AC_1000001']" type="code">
        <ElButton class="mr-4">User 账号可见 ["AC_1000001"]</ElButton>
      </AccessControl>
      <AccessControl :codes="['AC_100100', 'AC_100030']" type="code">
        <ElButton class="mr-4">
          Super & Admin 账号可见 ["AC_100100","AC_100030"]
        </ElButton>
      </AccessControl>
    </ElCard>

    <ElCard
      v-if="accessMode === 'frontend'"
      class="mb-5"
      title="组件形式控制 - 角色"
    >
      <AccessControl :codes="['super']" type="role">
        <ElButton class="mr-4">Super 角色可见</ElButton>
      </AccessControl>
      <AccessControl :codes="['admin']" type="role">
        <ElButton class="mr-4">Admin 角色可见</ElButton>
      </AccessControl>
      <AccessControl :codes="['user']" type="role">
        <ElButton class="mr-4">User 角色可见</ElButton>
      </AccessControl>
      <AccessControl :codes="['super', 'admin']" type="role">
        <ElButton class="mr-4">Super & Admin 角色可见</ElButton>
      </AccessControl>
    </ElCard>

    <ElCard class="mb-5" title="函数形式控制">
      <ElButton v-if="hasAccessByCodes(['AC_100100'])" class="mr-4">
        Super 账号可见 ["AC_100100"]
      </ElButton>
      <ElButton v-if="hasAccessByCodes(['AC_100030'])" class="mr-4">
        Admin 账号可见 ["AC_100030"]
      </ElButton>
      <ElButton v-if="hasAccessByCodes(['AC_1000001'])" class="mr-4">
        User 账号可见 ["AC_1000001"]
      </ElButton>
      <ElButton
        v-if="hasAccessByCodes(['AC_100100', 'AC_100030'])"
        class="mr-4"
      >
        Super & Admin 账号可见 ["AC_100100","AC_100030"]
      </ElButton>
    </ElCard>

    <ElCard class="mb-5" title="指令方式 - 权限码">
      <ElButton class="mr-4" v-access:code="['AC_100100']">
        Super 账号可见 ["AC_100100"]
      </ElButton>
      <ElButton class="mr-4" v-access:code="['AC_100030']">
        Admin 账号可见 ["AC_100030"]
      </ElButton>
      <ElButton class="mr-4" v-access:code="['AC_1000001']">
        User 账号可见 ["AC_1000001"]
      </ElButton>
      <ElButton class="mr-4" v-access:code="['AC_100100', 'AC_100030']">
        Super & Admin 账号可见 ["AC_100100","AC_100030"]
      </ElButton>
    </ElCard>

    <ElCard
      v-if="accessMode === 'frontend'"
      class="mb-5"
      title="指令方式 - 角色"
    >
      <ElButton class="mr-4" v-access:role="['super']">Super 角色可见</ElButton>
      <ElButton class="mr-4" v-access:role="['admin']">Admin 角色可见</ElButton>
      <ElButton class="mr-4" v-access:role="['user']">User 角色可见</ElButton>
      <ElButton class="mr-4" v-access:role="['super', 'admin']">
        Super & Admin 角色可见
      </ElButton>
    </ElCard>
  </Page>
</template>
