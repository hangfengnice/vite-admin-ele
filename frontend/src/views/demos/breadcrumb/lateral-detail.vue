<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { Fallback } from '@/packages/effects/common-ui/src'

import { Button } from 'element-plus'

const router = useRouter()
</script>

<template>
  <Fallback
    description="面包屑导航-平级模式-详情页"
    status="coming-soon"
    title="注意观察面包屑导航变化"
  >
    <template #action>
      <Button @click="router.go(-1)">返回</Button>
    </template>
  </Fallback>
</template>
