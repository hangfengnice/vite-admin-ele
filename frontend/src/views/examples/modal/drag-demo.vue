<script lang="ts" setup>
import { useVbenModal } from '@/packages/effects/common-ui/src'

import { message } from 'element-plus'

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close()
  },
  onConfirm() {
    message.info('onConfirm')
    // modalApi.close();
  },
})
</script>
<template>
  <Modal title="可拖拽示例">鼠标移动到 header 上，可拖拽弹窗</Modal>
</template>
