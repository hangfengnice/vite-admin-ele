<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { Page } from '@/packages/effects/common-ui/src'

import { getParamsData } from '@/api/examples/params'

const params = { ids: [2512, 3241, 4255] }
const paramsSerializer = ref<'brackets' | 'comma' | 'indices' | 'repeat'>(
  'brackets',
)
const response = ref('')
const paramsStr = computed(() => {
  // 写一段代码，从完整的URL中提取参数部分
  const url = response.value
  return new URL(url).searchParams.toString()
})

watchEffect(() => {
  getParamsData(params, paramsSerializer.value).then((res) => {
    response.value = res.request.responseURL
  })
})
</script>
<template>
  <Page
    title="请求参数序列化"
    description="不同的后台接口可能对数组类型的GET参数的解析方式不同，我们预置了几种数组序列化方式，通过配置 paramsSerializer 来实现不同的序列化方式"
  >
    <ElCard>
      <ElRadioGroup v-model:value="paramsSerializer" name="paramsSerializer">
        <ElRadio value="brackets">brackets</ElRadio>
        <ElRadio value="comma">comma</ElRadio>
        <ElRadio value="indices">indices</ElRadio>
        <ElRadio value="repeat">repeat</ElRadio>
      </ElRadioGroup>
      <div class="mt-4 flex flex-col gap-4">
        <div>
          <h3>需要提交的参数</h3>
          <div>{{ JSON.stringify(params, null, 2) }}</div>
        </div>
        <template v-if="response">
          <div>
            <h3>访问地址</h3>
            <pre>{{ response }}</pre>
          </div>
          <div>
            <h3>参数字符串</h3>
            <pre>{{ paramsStr }}</pre>
          </div>
          <div>
            <h3>参数解码</h3>
            <pre>{{ decodeURIComponent(paramsStr) }}</pre>
          </div>
        </template>
      </div>
    </ElCard>
  </Page>
</template>
