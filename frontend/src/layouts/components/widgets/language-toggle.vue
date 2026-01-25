<script setup lang="ts">
import type { SupportedLanguagesType } from '@/locales'

import { SUPPORT_LANGUAGES } from '@/packages/constants'
import { Languages } from '@/packages/icons'
import { loadLocaleMessages } from '@/locales'
import { preferences, updatePreferences } from '@/packages/core/preferences/src'

import {
  VbenDropdownRadioMenu,
  SUIIconButton,
} from '@/packages/core/ui-kit/shadcn-ui'

defineOptions({
  name: 'LanguageToggle',
})

async function handleUpdate(value: string | undefined) {
  if (!value) return
  const locale = value as SupportedLanguagesType
  updatePreferences({
    app: {
      locale,
    },
  })
  await loadLocaleMessages(locale)
}
</script>

<template>
  <div>
    <VbenDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <SUIIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
        <Languages class="text-foreground size-4" />
      </SUIIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
