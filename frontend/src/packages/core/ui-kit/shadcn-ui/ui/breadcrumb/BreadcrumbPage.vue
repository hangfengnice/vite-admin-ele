<script lang="ts" setup>
import { cn } from '@/packages/core/base/shared/src/utils'

const props = defineProps<{
  class?: any
}>()
</script>

<template>
  <span
    :class="cn('font-normal text-foreground', props.class)"
    aria-current="page"
    aria-disabled="true"
    role="link"
  >
    <slot></slot>
  </span>
</template>
