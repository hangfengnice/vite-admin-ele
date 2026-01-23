<script lang="ts" setup>
import { Settings } from '@/packages/icons'

import { SUIIconButton } from '@/packages/core/ui-kit/shadcn-ui'

import Preferences from './preferences.vue'

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>()

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout')
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <SUIIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
      <Settings class="text-foreground size-4" />
    </SUIIconButton>
  </Preferences>
</template>
