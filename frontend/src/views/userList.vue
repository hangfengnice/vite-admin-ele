<template>
  <div class="page">
    <h2>用户列表</h2>

    <input v-model="query.keyword" placeholder="搜索用户名" />
    <button @click="fetchData(query)">搜索</button>

    <button @click="fetchData()">刷新</button>

    <button :disabled="pagination.page === 1" @click="onprev">上一页</button>

    <button
      :disabled="pagination.page * pagination.pageSize >= pagination.total"
      @click="onnext"
    >
      下一页
    </button>

    <p v-if="loading">加载中...</p>
    <p v-else-if="errorMsg">{{ errorMsg }}</p>
    <p v-else-if="list.length === 0">暂无数据</p>

    <ul v-else>
      <li v-for="item in list" :key="item.id">
        {{ item.name }}（{{ item.email }}）
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useList } from '@/hooks/useList'
import { fetchUserList } from '@/api/user'

const query = reactive({
  keyword: '',
})

const { list, loading, errorMsg, pagination, fetchData } = useList(
  fetchUserList,
  {
    immediate: false,
  }
)

onMounted(() => {
  fetchData()
})

let onprev = () => {
  if (pagination.page > 1) {
    pagination.page--
    fetchData(query)
  }
}
let onnext = () => {
  pagination.page++
  fetchData(query)
}
</script>
