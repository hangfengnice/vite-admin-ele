import type {
  VbenFormSchema as FormSchema,
  VbenFormProps,
} from '@/packages/effects/common-ui/src'

import type { ComponentType } from './component'

import {
  setupVbenForm,
  useSchemaForm as useForm,
  z,
} from '@/packages/effects/common-ui/src'
import { $t } from '@/locales'

async function initSetupVbenForm() {
  setupVbenForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
      },
    },
    defineRules: {
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label])
        }
        return true
      },
      selectRequired: (value, _params, ctx) => {
        if (value === undefined || value === null) {
          return $t('ui.formRules.selectRequired', [ctx.label])
        }
        return true
      },
    },
  })
}

const useSchemaForm = useForm<ComponentType>

export { initSetupVbenForm, useSchemaForm, z }

export type VbenFormSchema = FormSchema<ComponentType>
export type { VbenFormProps }
