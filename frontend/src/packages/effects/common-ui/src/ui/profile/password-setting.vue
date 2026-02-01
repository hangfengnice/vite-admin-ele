<script setup lang="ts">
import type { Recordable } from '@/packages/types'

import type { VbenFormSchema } from '@/packages/core/ui-kit/form-ui/src'

import { computed, reactive } from 'vue'

import { useSchemaForm } from '@/packages/core/ui-kit/form-ui/src'
import { SUIButton } from '@/packages/core/ui-kit/shadcn-ui'

interface Props {
  formSchema?: VbenFormSchema[]
}

const props = withDefaults(defineProps<Props>(), {
  formSchema: () => [],
})

const emit = defineEmits<{
  submit: [Recordable<any>]
}>()

const [Form, formApi] = useSchemaForm(
  reactive({
    commonConfig: {
      // 所有表单项
      componentProps: {
        class: 'w-full',
      },
    },
    layout: 'horizontal',
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
)

async function handleSubmit() {
  const { valid } = await formApi.validate()
  const values = await formApi.getValues()
  if (valid) {
    emit('submit', values)
  }
}

defineExpose({
  getFormApi: () => formApi,
})
</script>
<template>
  <div>
    <Form />
    <SUIButton type="submit" class="mt-4" @click="handleSubmit">
      更新密码
    </SUIButton>
  </div>
</template>
