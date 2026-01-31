<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Page } from '@/packages/effects/common-ui/src'
import { useTabs } from '@/packages/effects/hooks'

const router = useRouter()
const newTabTitle = ref('')

const {
  closeAllTabs,
  closeCurrentTab,
  closeLeftTabs,
  closeOtherTabs,
  closeRightTabs,
  closeTabByKey,
  refreshTab,
  resetTabTitle,
  setTabTitle,
} = useTabs()

function openTab() {
  // 这里就是路由跳转，也可以用path
  router.push({ name: 'VbenAbout' })
}

function openTabWithParams(id: number) {
  // 这里就是路由跳转，也可以用path
  router.push({ name: 'FeatureTabDetailDemo', params: { id } })
}

function reset() {
  newTabTitle.value = ''
  resetTabTitle()
}
</script>

<template>
  <Page description="用于需要操作标签页的场景" title="标签页">
    <ElCard class="mb-5" header="打开/关闭标签页">
      <div class="mb-3 text-foreground/80">
        如果标签页存在，直接跳转切换。如果标签页不存在，则打开新的标签页。
      </div>
      <div class="flex flex-wrap gap-3">
        <ElButton type="primary" @click="openTab">打开 "关于" 标签页</ElButton>
        <ElButton type="primary" @click="closeTabByKey('/vben-admin/about')">
          关闭 "关于" 标签页
        </ElButton>
      </div>
    </ElCard>

    <ElCard class="mb-5" header="标签页操作">
      <div class="mb-3 text-foreground/80">用于动态控制标签页的各种操作</div>
      <div class="flex flex-wrap gap-3">
        <ElButton type="primary" @click="closeCurrentTab()">
          关闭当前标签页
        </ElButton>
        <ElButton type="primary" @click="closeLeftTabs()">
          关闭左侧标签页
        </ElButton>
        <ElButton type="primary" @click="closeRightTabs()">
          关闭右侧标签页
        </ElButton>
        <ElButton type="primary" @click="closeAllTabs()">
          关闭所有标签页
        </ElButton>
        <ElButton type="primary" @click="closeOtherTabs()">
          关闭其他标签页
        </ElButton>
        <ElButton type="primary" @click="refreshTab()">刷新当前标签页</ElButton>
      </div>
    </ElCard>

    <ElCard class="mb-5" header="动态标题">
      <div class="mb-3 text-foreground/80">
        该操作不会影响页面标题，仅修改Tab标题
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <ElInput
          v-model:value="newTabTitle"
          class="w-40"
          placeholder="请输入新标题"
        />
        <ElButton type="primary" @click="() => setTabTitle(newTabTitle)">
          修改
        </ElButton>
        <ElButton @click="reset">重置</ElButton>
      </div>
    </ElCard>

    <ElCard class="mb-5" header="最大打开数量">
      <div class="mb-3 text-foreground/80">
        限制带参数的tab打开的最大数量，由 `route.meta.maxNumOfOpenTab` 控制
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <template v-for="item in 5" :key="item">
          <ElButton type="primary" @click="openTabWithParams(item)">
            打开{{ item }}详情页
          </ElButton>
        </template>
      </div>
    </ElCard>
  </Page>
</template>
