<template>
  <div class="layout">
    <header class="header">
      <span>新起点</span>
      <el-button @click="handleLogout">退出登录</el-button>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  authStore.checkedRemoteInfo = false
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  .header {
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
