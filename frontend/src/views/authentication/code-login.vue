<script lang="ts" setup>
defineOptions({
  name: 'AuthenticationCodeLogin',
})

import type { VbenFormSchema } from '@/packages/effects/common-ui/src'
import type { Recordable } from '@/packages/types'
import { z } from '@/packages/effects/common-ui/src'
import { $t } from '@/locales'
import { useSchemaForm } from '@/packages/core/ui-kit/form-ui/src'
import { SUIButton } from '@/packages/core/ui-kit/shadcn-ui'
import Title from './components/auth-title.vue'
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const CODE_LENGTH = 6

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
      },
      fieldName: 'phoneNumber',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode')
          return text
        },
        placeholder: $t('authentication.code'),
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ]
})
/**
 * 异步处理登录操作
 * Asynchronously handle the login process
 * @param values 登录表单数据
 */

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
  /**
   * @zh_CN 是否显示返回按钮
   */
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showBack: true,
  loginPath: '/auth/login',
  submitButtonText: '',
  subTitle: '',
  title: '',
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
    console.log(values, 'values')
  }
}

const router = useRouter()
function goToLogin() {
  router.push(props.loginPath)
}

defineExpose({
  getFormApi: () => formApi,
})
</script>

<template>
  <div>
    <Title>
      <slot name="title">
        {{ title || $t('authentication.welcomeBack') }} 📲
      </slot>
      <template #desc>
        <span class="text-muted-foreground">
          <slot name="subTitle">
            {{ subTitle || $t('authentication.codeSubtitle') }}
          </slot>
        </span>
      </template>
    </Title>
    <Form />
    <SUIButton
      :class="{
        'cursor-wait': loading,
      }"
      :loading="loading"
      class="w-full"
      @click="handleSubmit"
    >
      <slot name="submitButtonText">
        {{ submitButtonText || $t('common.login') }}
      </slot>
    </SUIButton>
    <SUIButton
      v-if="showBack"
      class="mt-4 w-full"
      variant="outline"
      @click="goToLogin()"
    >
      {{ $t('common.back') }}
    </SUIButton>
  </div>
</template>
