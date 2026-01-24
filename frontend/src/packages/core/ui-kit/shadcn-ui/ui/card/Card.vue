<script setup lang="ts">
import { cn } from '@/packages/core/base/shared/src/utils'

const props = defineProps<{
  class?: any
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-border bg-card text-card-foreground',
        props.class
      )
    "
  >
    <slot></slot>
  </div>
</template>
