<script lang="ts" setup>
import type { MenuRecordRaw } from '@/packages/types'

// import type { MenuProps } from '@/packages/core/ui-kit/menu-ui/src'

import { useRoute } from 'vue-router'

import { Menu } from '@/packages/core/ui-kit/menu-ui/src'

import { useNavigation } from './use-navigation'

// interface Props extends MenuProps {
//   collapse?: boolean
//   menus?: MenuRecordRaw[]
// }

// withDefaults(defineProps<Props>(), {
//   accordion: true,
//   menus: () => [],
// })
withDefaults(defineProps(), {
  accordion: true,
  menus: () => [],
})

const route = useRoute()
const { navigation } = useNavigation()

async function handleSelect(key: string) {
  await navigation(key)
}
</script>

<template>
  <Menu
    :accordion="accordion"
    :collapse="collapse"
    :default-active="route.meta?.activePath || route.path"
    :menus="menus"
    :rounded="rounded"
    :theme="theme"
    mode="vertical"
    @select="handleSelect"
  />
</template>
