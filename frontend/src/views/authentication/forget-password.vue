<script lang="ts" setup>
defineOptions({ name: 'ForgetPassword' })

import type { VbenFormSchema } from '@/packages/effects/common-ui/src'
import type { Recordable } from '@/packages/types'
import { z } from '@/packages/effects/common-ui/src'
import { $t } from '@/locales'
import Title from './components/auth-title.vue'
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSchemaForm } from '@/packages/core/ui-kit/form-ui/src'
import { SUIButton } from '@/packages/core/ui-kit/shadcn-ui'

const loading = ref(false)

interface Props {
  // formSchema: VbenFormSchema[]
  /**
   * @zh_CN 是否处于加载处理状态
   */
  loading?: boolean
  /**
   * @zh_CN 登录路径
   */
  loginPath?: string
  /**
   * @zh_CN 标题
   */
  title?: string
  /**
   * @zh_CN 描述
   */
  subTitle?: string
  /**
   * @zh_CN 按钮文本
   */
  submitButtonText?: string
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
  loginPath: '/auth/login',
  submitButtonText: '',
  subTitle: '',
  title: '',
})
const router = useRouter()
function goToLogin() {
  router.push(props.loginPath)
}

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: 'example@example.com',
      },
      fieldName: 'email',
      label: $t('authentication.email'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.emailTip') })
        .email($t('authentication.emailValidErrorTip')),
    },
  ]
})
const [Form, formApi] = useSchemaForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => formSchema),
    showDefaultActions: false,
  }),
)
async function handleSubmit() {
  const { valid } = await formApi.validate()
  const values = await formApi.getValues()
  if (valid) {
    console.log('reset email:', values)
  }
}
</script>

<template>
  <div>
    <Title>
      <slot name="title">
        {{ title || $t('authentication.forgetPassword') }} 🤦🏻‍♂️
      </slot>
      <template #desc>
        <slot name="subTitle">
          {{ subTitle || $t('authentication.forgetPasswordSubtitle') }}
        </slot>
      </template>
    </Title>
    <Form />

    <div>
      <SUIButton
        :class="{
          'cursor-wait': loading,
        }"
        aria-label="submit"
        class="mt-2 w-full"
        @click="handleSubmit"
      >
        <slot name="submitButtonText">
          {{ submitButtonText || $t('authentication.sendResetLink') }}
        </slot>
      </SUIButton>
      <SUIButton class="mt-4 w-full" variant="outline" @click="goToLogin()">
        {{ $t('common.back') }}
      </SUIButton>
    </div>
  </div>
</template>
