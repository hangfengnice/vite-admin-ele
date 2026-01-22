<script setup lang="ts">
// import type { TreeProps } from '@/packages/core/ui-kit/shadcn-ui'

import { Inbox } from '@/packages/icons'
import { $t } from '@/packages/locales'

import { treePropsDefaults, VbenTree } from '@/packages/core/ui-kit/shadcn-ui'

// const props = withDefaults(defineProps<TreeProps>(), treePropsDefaults())
const props = withDefaults(defineProps(), treePropsDefaults())
</script>

<template>
  <VbenTree v-if="props.treeData?.length > 0" v-bind="props">
    <template v-for="(_, key) in $slots" :key="key" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </VbenTree>
  <div
    v-else
    class="flex-col-center text-muted-foreground cursor-pointer rounded-lg border p-10 text-sm font-medium"
  >
    <Inbox class="size-10" />
    <div class="mt-1">{{ $t('common.noData') }}</div>
  </div>
</template>
