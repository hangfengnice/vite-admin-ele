<script setup lang="ts">
import BaseTable from '../components/BaseTable.vue'
import { useList } from '../hooks/useList'
import { getUserList } from '../api/user'
import type { TableConfig } from '../types/table'
import type { User } from '../types/user'
import { ref } from 'vue'

const { list, fetchData } = useList<User>(getUserList)
fetchData()

const tableConfig: TableConfig<User> = {
  columns: [
    { label: 'ID', prop: 'id' },
    { label: '用户名', prop: 'username' },
    { label: '邮箱', prop: 'email' },
  ],
  actions: [
    { label: '编辑', onClick: editUser },
    { label: '删除', onClick: removeUser },
  ],
}

import BaseForm from '../components/BaseForm.vue'
import { createUser, updateUser, deleteUser } from '../api/user'

const showForm = ref(false)
const isEdit = ref(false)
const currentRow = ref<any>({})

const formConfig = {
  fields: [
    { label: '用户名', prop: 'username', type: 'input' },
    { label: '密码', prop: 'password', type: 'password' },
    { label: '邮箱', prop: 'email', type: 'email' },
  ],
}

function openAdd() {
  isEdit.value = false
  currentRow.value = {}
  showForm.value = true
}

function editUser(row: any) {
  isEdit.value = true
  currentRow.value = { ...row }
  showForm.value = true
}

async function submitForm(data: any) {
  if (isEdit.value) {
    await updateUser(currentRow.value.id, data)
  } else {
    await createUser(data)
  }
  showForm.value = false
  fetchData()
}

async function removeUser(row: any) {
  console.log(row, 'row')

  await deleteUser(row.id)
  fetchData()
}
</script>

<template>
  <div>
    <h1>用户管理</h1>
    <button @click="openAdd">新增用户</button>
    <BaseTable :config="tableConfig" :data="list" />
    <BaseForm
      v-if="showForm"
      :config="formConfig"
      :modelValue="currentRow"
      @submit="submitForm"
    />
  </div>
</template>
