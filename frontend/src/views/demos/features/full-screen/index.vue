<script lang="ts" setup>
import { ref } from 'vue'

import { Page } from '@/packages/effects/common-ui/src'

import { useFullscreen } from '@vueuse/core'

const domRef = ref<HTMLElement>()

const { enter, exit, isFullscreen, toggle } = useFullscreen()

const { isFullscreen: isDomFullscreen, toggle: toggleDom } =
  useFullscreen(domRef)
</script>

<template>
  <Page title="全屏示例">
    <ElCard title="Window Full Screen">
      <div class="flex flex-wrap items-center gap-4">
        <ElButton :disabled="isFullscreen" type="primary" @click="enter">
          Enter Window Full Screen
        </ElButton>
        <ElButton @click="toggle">Toggle Window Full Screen</ElButton>

        <ElButton :disabled="!isFullscreen" danger @click="exit">
          Exit Window Full Screen
        </ElButton>

        <span class="text-nowrap">Current State: {{ isFullscreen }}</span>
      </div>
    </ElCard>

    <ElCard class="mt-5" title="Dom Full Screen">
      <ElButton type="primary" @click="toggleDom">
        Enter Dom Full Screen
      </ElButton>
    </ElCard>

    <div
      ref="domRef"
      class="mx-auto mt-10 flex h-64 w-1/2 items-center justify-center rounded-md bg-yellow-400"
    >
      <ElButton class="mr-2" type="primary" @click="toggleDom">
        {{ isDomFullscreen ? 'Exit Dom Full Screen' : 'Enter Dom Full Screen' }}
      </ElButton>
    </div>
  </Page>
</template>
