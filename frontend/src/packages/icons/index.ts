import { createIconifyIcon } from './create-icon'
export { createIconifyIcon }
export const MdiKeyboardEsc = createIconifyIcon('mdi:keyboard-esc')

export { default as EmptyIcon } from './empty-icon.vue'
export * from './svg'

export * from './lucide'

export type { IconifyIcon as IconifyIconStructure } from '@iconify/vue'

export {
  addCollection,
  addIcon,
  Icon as IconifyIcon,
  listIcons,
} from '@iconify/vue'
