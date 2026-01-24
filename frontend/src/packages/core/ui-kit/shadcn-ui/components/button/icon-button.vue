<script setup lang="ts">
import type { ButtonVariants } from '../../ui'
import type { SUIButtonProps } from './button'

import { computed, useSlots } from 'vue'

import { cn } from '@/utils'

import { VbenTooltip } from '../tooltip'
import SUIButton from './button.vue'

interface Props extends SUIButtonProps {
  class?: any
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  tooltipDelayDuration?: number
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top'
  variant?: ButtonVariants
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
})

const slots = useSlots()

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip)
</script>

<template>
  <SUIButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </SUIButton>

  <VbenTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <template #trigger>
      <SUIButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </SUIButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"></slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </VbenTooltip>
</template>
