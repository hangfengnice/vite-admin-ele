<script lang="ts" setup>
import { ref } from 'vue'

import { useVbenDrawer } from '@/packages/effects/common-ui/src'

import { message } from 'element-plus'

const data = ref()

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close()
  },
  onConfirm() {
    message.info('onConfirm')
    // drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      data.value = drawerApi.getData<Record<string, any>>()
    }
  },
})
</script>
<template>
  <Drawer title="数据共享示例">
    <div class="flex-col-center">外部传递数据： {{ data }}</div>
  </Drawer>
</template>
