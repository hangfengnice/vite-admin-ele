<script lang="ts" setup>
import { Fallback, VbenButton } from '@/packages/effects/common-ui/src'
import { useTabs } from '@/packages/effects/hooks'
import { X } from '@/packages/icons'

const { closeCurrentTab } = useTabs()
</script>

<template>
  <Fallback
    description="当前路由在菜单中不可见"
    status="coming-soon"
    title="被隐藏的子菜单"
    show-back
  >
    <template #action>
      <VbenButton size="lg" @click="closeCurrentTab()">
        <X class="mr-2 size-4" />
        关闭当前标签页
      </VbenButton>
    </template>
  </Fallback>
</template>
