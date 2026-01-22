<script lang="ts" setup>
import type { VbenFormSchema } from '@/packages/effects/common-ui/src'
import type { Recordable } from '@/packages/types'

import { computed, ref } from 'vue'

import {
  AuthenticationForgetPassword,
  z,
} from '@/packages/effects/common-ui/src'
import { $t } from '@/locales'

defineOptions({ name: 'ForgetPassword' })

const loading = ref(false)

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

function handleSubmit(value: Recordable<any>) {
  // eslint-disable-next-line no-console
  console.log('reset email:', value)
}
</script>

<template>
  <AuthenticationForgetPassword
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
