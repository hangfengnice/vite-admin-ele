<script lang="ts" setup>
import { useElementPlusDesignTokens } from '@/packages/effects/hooks'

import { ElConfigProvider } from 'element-plus'

import { elementLocale } from './locales'

defineOptions({ name: 'App' })

useElementPlusDesignTokens()
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
