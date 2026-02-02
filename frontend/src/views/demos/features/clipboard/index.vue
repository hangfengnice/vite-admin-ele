<script setup lang="ts">
import { ref } from 'vue'

import { Page } from '@/packages/effects/common-ui/src'

import { useClipboard } from '@vueuse/core'

const source = ref('Hello')
const { copy, text } = useClipboard({ legacy: true, source })
</script>

<template>
  <Page title="剪切板示例">
    <ElCard header="基本使用">
      <p class="mb-3">
        Current copied:
        <code>{{ text || 'none' }}</code>
      </p>
      <div class="flex">
        <ElInput v-model:value="source" class="mr-3 flex w-[200px]" />
        <ElButton type="primary" @click="copy(source)">Copy</ElButton>
      </div>
    </ElCard>
  </Page>
</template>
