<script setup lang="ts">
import type { BadgeVariants } from './badge'

import { cn } from '@/packages/core/base/shared/src/utils'

import { badgeVariants } from './badge'

const props = defineProps<{
  class?: any
  variant?: BadgeVariants['variant']
}>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot></slot>
  </div>
</template>
