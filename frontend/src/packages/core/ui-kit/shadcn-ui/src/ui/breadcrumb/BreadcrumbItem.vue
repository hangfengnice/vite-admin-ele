<script lang="ts" setup>
import { cn } from '@/packages/core/base/shared/src/utils'

const props = defineProps<{
  class?: any
}>()
</script>

<template>
  <li
    :class="
      cn('inline-flex items-center gap-1.5 hover:text-foreground', props.class)
    "
  >
    <slot></slot>
  </li>
</template>
