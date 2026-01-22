<template>
  <div>
    <!-- <div class="content">莹莹 伟大!</div> -->
    <el-button @click="toAdmin">admin</el-button>
    <el-button @click="toProfile">profile</el-button>

    <div>{{ msg }} 哈哈</div>
    <Tasks />

    <div class="user">
      <input
        v-model="params.keyword"
        placeholder="搜索用户名"
        @keyup.native.enter="fetchData"
      />
      <table>
        <tr v-for="user in list" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>
      <button @click="params.page--, fetchData()" :disabled="params.page <= 1">
        上一页
      </button>
      <button
        @click="params.page++, fetchData()"
        :disabled="params.page * params.pageSize >= total"
      >
        下一页
      </button>
    </div>
  </div>
  <!-- <UserList /> -->
</template>

<script lang="ts" setup>
import { useList } from '../../hooks/useList'
import { getUserList } from '../../api/user'
const { list, total, loading, params, fetchData } = useList(getUserList)
fetchData()

import Tasks from '@/views/tasks.vue'
import { getTest, hello } from '@/api/user'
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

let msg = ref('')
onMounted(() => {
  console.log('zheli')
  // getTest({ a: 1 }).then((res) => {
  //   console.log('res', res)
  //   let { message } = res
  //   msg.value = message
  // })
  hello({ name: '莹莹' }).then((res) => {
    console.log('res', res)
    let { message } = res
    msg.value = message
  })
})

const toAdmin = () => {
  router.replace({ path: '/admin' })
}
const toProfile = () => {
  router.push({ path: '/profile' })
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
