<script lang="ts" setup>
defineOptions({ name: 'App' })

import { elementLocale } from './locales'
import { useElementPlusDesignTokens } from '@/packages/effects/hooks'

useElementPlusDesignTokens()
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>
