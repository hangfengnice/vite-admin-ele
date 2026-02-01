<script lang="ts" setup>
defineOptions({
  name: 'RegisterForm',
})

import type { VbenFormSchema } from '@/packages/effects/common-ui/src'
import type { Recordable } from '@/packages/types'
import { z } from '@/packages/effects/common-ui/src'
import { $t } from '@/locales'
import { computed, reactive, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSchemaForm } from '@/packages/core/ui-kit/form-ui/src'
import { SUIButton } from '@/packages/core/ui-kit/shadcn-ui'
import Title from './components/auth-title.vue'

const loading = ref(false)

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        }
      },
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            })
        },
        triggerFields: ['password'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
    },
    {
      component: 'VbenCheckbox',
      fieldName: 'agreePolicy',
      renderComponentContent: () => ({
        default: () =>
          h('span', [
            $t('authentication.agree'),
            h(
              'a',
              {
                class: 'vben-link ml-1 ',
                href: '',
              },
              `${$t('authentication.privacyPolicy')} & ${$t(
                'authentication.terms',
              )}`,
            ),
          ]),
      }),
      rules: z.boolean().refine((value) => !!value, {
        message: $t('authentication.agreeTip'),
      }),
    },
  ]
})

interface Props {
  // formSchema?: VbenFormSchema[]
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
  // formSchema: () => [],
  loading: false,
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
    console.log(
      'register submit:',
      values as { password: string; username: string },
    )
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
        {{ title || $t('authentication.createAnAccount') }} 🚀
      </slot>
      <template #desc>
        <slot name="subTitle">
          {{ subTitle || $t('authentication.signUpSubtitle') }}
        </slot>
      </template>
    </Title>
    <Form />

    <SUIButton
      :class="{
        'cursor-wait': loading,
      }"
      :loading="loading"
      aria-label="register"
      class="mt-2 w-full"
      @click="handleSubmit"
    >
      <slot name="submitButtonText">
        {{ submitButtonText || $t('authentication.signUp') }}
      </slot>
    </SUIButton>
    <div class="mt-4 text-center text-sm">
      {{ $t('authentication.alreadyHaveAccount') }}
      <span class="vben-link text-sm font-normal" @click="goToLogin()">
        {{ $t('authentication.goToLogin') }}
      </span>
    </div>
  </div>
</template>
