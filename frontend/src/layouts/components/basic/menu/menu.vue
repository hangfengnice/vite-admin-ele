<script lang="ts" setup>
import type { MenuRecordRaw } from '@/packages/types'

// import type { MenuProps } from '@/packages/core/ui-kit/menu-ui/src'

import { Menu } from '@/packages/core/ui-kit/menu-ui/src'

// interface Props extends MenuProps {
//   menus?: MenuRecordRaw[]
// }

// const props = withDefaults(defineProps<Props>(), {
//   accordion: true,
//   menus: () => [],
// })
const props = withDefaults(defineProps(), {
  accordion: true,
  menus: () => [],
})

const emit = defineEmits<{
  open: [string, string[]]
  select: [string, string?]
}>()

function handleMenuSelect(key: string) {
  emit('select', key, props.mode)
}

function handleMenuOpen(key: string, path: string[]) {
  emit('open', key, path)
}
</script>

<template>
  <Menu
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :menus="menus"
    :mode="mode"
    :rounded="rounded"
    scroll-to-active
    :theme="theme"
    @open="handleMenuOpen"
    @select="handleMenuSelect"
  />
</template>
