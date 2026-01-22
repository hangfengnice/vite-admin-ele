<template>
  <div class="login-div">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username" clearable />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          {{ loading ? '登录中...' : '登录' }}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import { login } from '@/api/user'

const authStore = useAuthStore()
const router = useRouter()

interface RuleForm {
  username: string
  password: string
}
let loading = ref(false)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: 'hf',
  password: '1',
})
const rules = reactive<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur',
    },
    { min: 2, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      let { username, password } = ruleForm
      login({ username, password })
        .then((res) => {
          console.log(res, 'res')
          authStore.login(res)
          router.push({ path: '/' })
        })
        .finally(() => {
          loading.value = false
        })
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
