<script setup lang="ts">
import { Page } from '@/packages/effects/common-ui/src'

import { refAutoReset } from '@vueuse/core'

import ConcurrencyCaching from './concurrency-caching.vue'
import InfiniteQueries from './infinite-queries.vue'
import PaginatedQueries from './paginated-queries.vue'
import QueryRetries from './query-retries.vue'

const showCaching = refAutoReset(true, 1000)
</script>

<template>
  <Page title="Vue Query示例">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ElCard title="分页查询">
        <PaginatedQueries />
      </ElCard>
      <ElCard title="无限滚动">
        <InfiniteQueries class="h-[300px] overflow-auto" />
      </ElCard>
      <ElCard title="错误重试">
        <QueryRetries />
      </ElCard>
      <ElCard
        title="并发和缓存"
        v-spinning="!showCaching"
        :body-style="{ minHeight: '330px' }"
      >
        <template #extra>
          <ElButton @click="showCaching = false">重新加载</ElButton>
        </template>
        <ConcurrencyCaching v-if="showCaching" />
        <ElEmpty v-else description="正在加载..." />
      </ElCard>
    </div>
  </Page>
</template>
