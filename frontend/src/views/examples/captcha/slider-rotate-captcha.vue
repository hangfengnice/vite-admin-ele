<script setup lang="ts">
import { computed } from 'vue'

import { Page, SliderRotateCaptcha } from '@/packages/effects/common-ui/src'
import { preferences } from '@/packages/core/preferences/src'
import { useUserStore } from '@/stores'

import { Card, message } from 'element-plus'

const userStore = useUserStore()
function handleSuccess() {
  message.success('success!')
}

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar
})
</script>

<template>
  <Page description="用于前端简单的拖动校验场景" title="滑块旋转校验">
    <Card class="mb-5" title="基本示例">
      <div class="flex items-center justify-center p-4">
        <SliderRotateCaptcha :src="avatar" @success="handleSuccess" />
      </div>
    </Card>
  </Page>
</template>
