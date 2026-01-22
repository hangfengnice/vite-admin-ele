<script setup lang="ts">
import type { SupportedLanguagesType } from '@/packages/locales'

import { SUPPORT_LANGUAGES } from '@/packages/constants'
import { Languages } from '@/packages/icons'
import { loadLocaleMessages } from '@/packages/locales'
import { preferences, updatePreferences } from '@/packages/preferences'

import {
  VbenDropdownRadioMenu,
  VbenIconButton,
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
      <VbenIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
        <Languages class="text-foreground size-4" />
      </VbenIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
