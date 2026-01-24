<script lang="ts" setup>
import { Maximize, Minimize } from '@/packages/core/base/icons/src'

import { useFullscreen } from '@vueuse/core'

import { SUIIconButton } from '../button'

defineOptions({ name: 'FullScreen' })

const { isFullscreen, toggle } = useFullscreen()

// 重新检查全屏状态
isFullscreen.value = !!(
  document.fullscreenElement ||
  // @ts-ignore
  document.webkitFullscreenElement ||
  // @ts-ignore
  document.mozFullScreenElement ||
  // @ts-ignore
  document.msFullscreenElement
)
</script>
<template>
  <SUIIconButton
    class="hover:animate-[shrink_0.3s_ease-in-out]"
    @click="toggle"
  >
    <Minimize v-if="isFullscreen" class="size-4 text-foreground" />
    <Maximize v-else class="size-4 text-foreground" />
  </SUIIconButton>
</template>
