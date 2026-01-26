<script lang="ts" setup>
import { Fallback } from '@/packages/effects/common-ui/src'

defineOptions({ name: 'FallbackOfflineDemo' })
</script>

<template>
  <Fallback status="offline" />
</template>
