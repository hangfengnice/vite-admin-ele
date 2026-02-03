<script lang="ts" setup>
import { VBEN_DOC_URL } from '@/packages/constants'
import { openWindow } from '@/utils'

const props = defineProps<{ path: string }>()

function handleClick() {
  // 如果没有.html，打开页面时可能会出现404
  const path =
    VBEN_DOC_URL +
    (props.path.toLowerCase().endsWith('.html')
      ? props.path
      : `${props.path}.html`)
  openWindow(path)
}
</script>

<template>
  <ElButton @click="handleClick">查看组件文档</ElButton>
</template>
