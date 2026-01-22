<script lang="ts" setup>
import type { DropdownMenuProps } from '@/packages/core/ui-kit/shadcn-ui'

import { ChevronDown } from '@/packages/core/base/icons/src'
import { VbenDropdownMenu } from '@/packages/core/ui-kit/shadcn-ui'

defineProps()
</script>

<template>
  <VbenDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center h-full cursor-pointer border-l border-border px-2 text-lg font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <ChevronDown class="size-4" />
    </div>
  </VbenDropdownMenu>
</template>
