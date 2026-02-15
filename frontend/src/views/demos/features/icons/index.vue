<script lang="ts" setup>
import { computed, h, onMounted, ref, watch } from 'vue'

import { IconPicker, Page } from '@/packages/effects/common-ui/src'
import {
  IconifyIcon,
  listIcons,
  MdiKeyboardEsc,
  // SVG 图标
  SvgAntdvLogoIcon,
  SvgAvatar1Icon,
  SvgAvatar2Icon,
  SvgAvatar3Icon,
  SvgAvatar4Icon,
  SvgAvatarMan,
  SvgBellIcon,
  SvgCakeIcon,
  SvgCardIcon,
  SvgDingDingIcon,
  SvgDownloadIcon,
  SvgGithubIcon,
  SvgGoogleIcon,
  SvgQQChatIcon,
  SvgTDesignIcon,
  SvgWeChatIcon,
  // Lucide 图标（部分）
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell as LucideBell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Copy,
  Edit,
  Eye,
  EyeOff,
  Github,
  Home,
  Info,
  Lock,
  Mail,
  Menu,
  Plus,
  Search,
  Settings,
  Star,
  Trash,
  Unlock,
  User,
  X,
} from '@/packages/icons'
import {
  getLucideCategories,
  getLucideIconsByCategory,
  lucideIconCategories,
} from '@/packages/icons/lucide-all'

import { ElCard, ElInput, ElTabPane, ElTabs } from 'element-plus'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/card/style/css'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'

const iconValue1 = ref('ant-design:trademark-outlined')
const iconValue2 = ref('svg:avatar-1')
const iconValue3 = ref('mdi:alien-outline')
const iconValue4 = ref('mdi-light:book-multiple')

const ElInputComponent = h(ElInput)

// Iconify 相关
const allIconSets = ref<Record<string, string[]>>({})
const selectedSet = ref<string>('')
const selectedIcons = ref<string[]>([])
const searchQuery = ref('')
const loadingIconSets = ref(false)
const activeTab = ref('project')

// Lucide 相关
const lucideSearchQuery = ref('')
const selectedLucideCategory = ref('interface')
const lucideIconMap = ref<Record<string, any>>({})

// 常用图标集列表（优先展示）
const popularSets = [
  'mdi',
  'mdi-light',
  'material-symbols',
  'fa',
  'fa-solid',
  'fa-regular',
  'ion',
  'ri',
  'codicon',
  'carbon',
  'vscode-icons',
  'flat-color-icons',
]

// 获取所有已加载的图标
function loadAllIcons() {
  try {
    loadingIconSets.value = true
    const icons = listIcons()
    const grouped: Record<string, string[]> = {}

    // 按前缀分组
    for (const icon of icons) {
      const match = icon.match(/^([^:]+):(.+)$/)
      if (match) {
        const [, prefix, name] = match
        if (!grouped[prefix]) {
          grouped[prefix] = []
        }
        grouped[prefix].push(name)
      }
    }

    // 按流行度排序（常用集合在前）
    const sortedEntries = Object.entries(grouped).sort((a, b) => {
      const aIndex = popularSets.indexOf(a[0])
      const bIndex = popularSets.indexOf(b[0])
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a[0].localeCompare(b[0])
    })

    allIconSets.value = Object.fromEntries(sortedEntries)

    // 默认选择第一个集合
    const firstSet = sortedEntries[0]
    if (firstSet) {
      selectedSet.value = firstSet[0]
      selectedIcons.value = firstSet[1]
    }
  } catch (error) {
    console.error('Failed to load icons:', error)
  } finally {
    loadingIconSets.value = false
  }
}

// 过滤图标
const filteredIcons = computed(() => {
  if (!searchQuery.value) return selectedIcons.value
  const query = searchQuery.value.toLowerCase()
  return selectedIcons.value.filter(icon => icon.toLowerCase().includes(query))
})

// 切换图标集
function selectIconSet(prefix: string) {
  selectedSet.value = prefix
  selectedIcons.value = allIconSets.value[prefix] || []
  searchQuery.value = ''
}

// 获取图标集显示名称
function getSetName(prefix: string): string {
  const nameMap: Record<string, string> = {
    'mdi': 'Material Design Icons',
    'mdi-light': 'Material Design Icons Light',
    'material-symbols': 'Material Symbols',
    'fa': 'Font Awesome',
    'fa-solid': 'Font Awesome Solid',
    'fa-regular': 'Font Awesome Regular',
    'ion': 'Ionicons',
    'ri': 'Remix Icon',
    'codicon': 'VS Code Icons',
    'carbon': 'Carbon Design System',
    'vscode-icons': 'VS Code Icons',
    'flat-color-icons': 'Flat Color Icons',
  }
  return nameMap[prefix] || prefix
}

// 获取集合统计
const setStats = computed(() => {
  return Object.entries(allIconSets.value).map(([prefix, icons]) => ({
    prefix,
    name: getSetName(prefix),
    count: icons.length,
  }))
})

// Lucide 图标过滤
const filteredLucideIcons = computed(() => {
  const categoryIcons = getLucideIconsByCategory(
    selectedLucideCategory.value as keyof typeof lucideIconCategories
  )
  if (!lucideSearchQuery.value) return categoryIcons
  const query = lucideSearchQuery.value.toLowerCase()
  return categoryIcons.filter(icon => icon.toLowerCase().includes(query))
})

const lucideCategories = computed(() => getLucideCategories())

onMounted(() => {
  loadAllIcons()
})

// SVG 图标列表
const svgIcons = [
  { name: 'Avatar1', component: SvgAvatar1Icon },
  { name: 'Avatar2', component: SvgAvatar2Icon },
  { name: 'Avatar3', component: SvgAvatar3Icon },
  { name: 'Avatar4', component: SvgAvatar4Icon },
  { name: 'AvatarMan', component: SvgAvatarMan },
  { name: 'Bell', component: SvgBellIcon },
  { name: 'Cake', component: SvgCakeIcon },
  { name: 'Card', component: SvgCardIcon },
  { name: 'Download', component: SvgDownloadIcon },
  { name: 'Github', component: SvgGithubIcon },
  { name: 'Google', component: SvgGoogleIcon },
  { name: 'QQChat', component: SvgQQChatIcon },
  { name: 'WeChat', component: SvgWeChatIcon },
  { name: 'DingDing', component: SvgDingDingIcon },
  { name: 'AntdvLogo', component: SvgAntdvLogoIcon },
  { name: 'TDesign', component: SvgTDesignIcon },
]

// 项目中使用的 Lucide 图标
const projectLucideIcons = [
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'Bell', component: LucideBell },
  { name: 'Check', component: Check },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'Circle', component: Circle },
  { name: 'Copy', component: Copy },
  { name: 'Edit', component: Edit },
  { name: 'Eye', component: Eye },
  { name: 'EyeOff', component: EyeOff },
  { name: 'Github', component: Github },
  { name: 'Home', component: Home },
  { name: 'Info', component: Info },
  { name: 'Lock', component: Lock },
  { name: 'Mail', component: Mail },
  { name: 'Menu', component: Menu },
  { name: 'Plus', component: Plus },
  { name: 'Search', component: Search },
  { name: 'Settings', component: Settings },
  { name: 'Star', component: Star },
  { name: 'Trash', component: Trash },
  { name: 'Unlock', component: Unlock },
  { name: 'User', component: User },
  { name: 'X', component: X },
]

// 动态导入 Lucide 图标
async function loadLucideIcon(iconName: string) {
  if (lucideIconMap.value[iconName]) {
    return lucideIconMap.value[iconName]
  }
  try {
    const module = await import('lucide-vue-next')
    const icon = module[iconName as keyof typeof module]
    if (icon) {
      lucideIconMap.value[iconName] = icon
    }
    return icon
  } catch {
    return null
  }
}

// 预加载当前分类的图标
watch(
  () => selectedLucideCategory.value,
  async () => {
    const icons = getLucideIconsByCategory(
      selectedLucideCategory.value as keyof typeof lucideIconCategories
    )
    for (const iconName of icons.slice(0, 50)) { // 预加载前50个
      await loadLucideIcon(iconName)
    }
  },
  { immediate: true }
)
</script>

<template>
  <Page header="图标">
    <template #description>
      <div class="mt-2 text-foreground/80">
        图标可在
        <a
          class="text-primary"
          href="https://icon-sets.iconify.design/"
          target="_blank"
        >
          Iconify
        </a>
        中查找，支持多种图标库，如 Material Design, Font Awesome, Jam Icons 等。
      </div>
    </template>

    <ElCard class="mb-5">
      <ElTabs v-model="activeTab">
        <ElTabPane label="项目图标" name="project">
          <div class="space-y-5">
            <ElCard header="Iconify 示例">
              <div class="flex items-center gap-5">
                <SvgGithubIcon class="size-8" />
                <SvgGoogleIcon class="size-8" />
                <SvgQQChatIcon class="size-8" />
                <SvgWeChatIcon class="size-8" />
                <MdiKeyboardEsc class="size-8" />
              </div>
            </ElCard>

            <ElCard header="Svg Icons (16个)">
              <div class="flex flex-wrap gap-4">
                <div v-for="icon in svgIcons" :key="icon.name" class="flex flex-col items-center gap-2 p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <component :is="icon.component" class="size-8" />
                  <span class="text-xs text-gray-500">{{ icon.name }}</span>
                </div>
              </div>
            </ElCard>

            <ElCard header="Lucide Icons (项目使用)">
              <div class="flex flex-wrap gap-4">
                <div v-for="icon in projectLucideIcons" :key="icon.name" class="flex flex-col items-center gap-2 p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                  <component :is="icon.component" class="size-6" />
                  <span class="text-xs text-gray-500">{{ icon.name }}</span>
                </div>
              </div>
            </ElCard>

            <ElCard header="Tailwind CSS">
              <div class="flex items-center gap-5 text-3xl">
                <span class="icon-[ant-design--alipay-circle-outlined]"></span>
                <span class="icon-[ant-design--account-book-filled]"></span>
                <span class="icon-[ant-design--container-outlined]"></span>
                <span class="icon-[svg-spinners--wind-toy]"></span>
                <span class="icon-[svg-spinners--blocks-wave]"></span>
                <span class="icon-[line-md--compass-filled-loop]"></span>
              </div>
            </ElCard>

            <ElCard header="图标选择器">
              <div class="mb-5 flex items-center gap-5">
                <span>原始样式(Iconify):</span>
                <IconPicker v-model="iconValue1" class="w-[200px]" />
              </div>
              <div class="mb-5 flex items-center gap-5">
                <span>原始样式(svg):</span>
                <IconPicker v-model="iconValue2" class="w-[200px]" prefix="svg" />
              </div>
              <div class="mb-5 flex items-center gap-5">
                <span>自定义Input:</span>
                <IconPicker
                  :input-component="ElInputComponent"
                  v-model="iconValue3"
                  icon-slot="suffix"
                  model-value-prop="value"
                  prefix="mdi"
                />
              </div>
              <div class="flex items-center gap-5">
                <span>显示为一个Icon:</span>
                <ElInput
                  v-model:value="iconValue4"
                  allow-clear
                  placeholder="点击这里选择图标"
                  style="width: 300px"
                >
                  <template #suffix>
                    <IconPicker v-model="iconValue4" prefix="mdi-light" type="icon" />
                  </template>
                </ElInput>
              </div>
            </ElCard>
          </div>
        </ElTabPane>

        <ElTabPane label="Iconify 全部图标" name="iconify">
          <div v-if="loadingIconSets" class="text-center py-10">
            <span class="text-gray-500">加载中...</span>
          </div>
          <div v-else-if="Object.keys(allIconSets).length === 0" class="text-center py-10">
            <span class="text-gray-500">暂无图标集</span>
          </div>
          <div v-else class="flex gap-5">
            <!-- 左侧图标集列表 -->
            <div class="w-64 flex-shrink-0">
              <div class="mb-3">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  图标集 ({{ Object.keys(allIconSets).length }})
                </h3>
              </div>
              <div class="max-h-[600px] overflow-y-auto space-y-1">
                <button
                  v-for="set in setStats"
                  :key="set.prefix"
                  @click="selectIconSet(set.prefix)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded text-sm transition-colors',
                    selectedSet === set.prefix
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <span class="truncate flex-1">{{ set.name }}</span>
                    <span class="text-xs text-gray-400 ml-2">{{ set.count }}</span>
                  </div>
                  <div class="text-xs text-gray-400 truncate">{{ set.prefix }}</div>
                </button>
              </div>
            </div>

            <!-- 右侧图标展示 -->
            <div class="flex-1">
              <div class="mb-4 flex items-center gap-4">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ getSetName(selectedSet) }} ({{ filteredIcons.length }} 个图标)
                </h3>
                <ElInput
                  v-model="searchQuery"
                  placeholder="搜索图标..."
                  class="w-48"
                  clearable
                />
              </div>

              <div class="max-h-[600px] overflow-y-auto">
                <div class="flex flex-wrap gap-3">
                  <div
                    v-for="iconName in filteredIcons"
                    :key="iconName"
                    class="flex flex-col items-center gap-1 p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <IconifyIcon :icon="`${selectedSet}:${iconName}`" class="size-6" />
                    <span class="text-xs text-gray-500 text-center leading-tight" :title="iconName">
                      {{ iconName.length > 12 ? iconName.slice(0, 12) + '...' : iconName }}
                    </span>
                  </div>
                </div>
                <div v-if="filteredIcons.length === 0" class="text-center py-10 text-gray-500">
                  未找到匹配的图标
                </div>
              </div>
            </div>
          </div>
        </ElTabPane>

        <ElTabPane label="Lucide 图标库" name="lucide">
          <div class="text-center mb-4">
            <p class="text-sm text-gray-500">
              Lucide 包含 3334+ 个图标，按分类展示
            </p>
          </div>

          <div class="flex gap-5">
            <!-- 左侧分类列表 -->
            <div class="w-48 flex-shrink-0">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                图标分类
              </h3>
              <div class="max-h-[600px] overflow-y-auto space-y-1">
                <button
                  v-for="cat in lucideCategories"
                  :key="cat.key"
                  @click="selectedLucideCategory = cat.key"
                  :class="[
                    'w-full text-left px-3 py-2 rounded text-sm transition-colors',
                    selectedLucideCategory === cat.key
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <span>{{ cat.name }}</span>
                    <span class="text-xs text-gray-400 ml-2">{{ cat.count }}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- 右侧图标展示 -->
            <div class="flex-1">
              <div class="mb-4 flex items-center gap-4">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ lucideCategories.find(c => c.key === selectedLucideCategory)?.name }}
                  ({{ filteredLucideIcons.length }} 个图标)
                </h3>
                <ElInput
                  v-model="lucideSearchQuery"
                  placeholder="搜索图标..."
                  class="w-48"
                  clearable
                />
              </div>

              <div class="max-h-[600px] overflow-y-auto">
                <div class="flex flex-wrap gap-3">
                  <div
                    v-for="iconName in filteredLucideIcons"
                    :key="iconName"
                    class="flex flex-col items-center gap-1 p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-20"
                  >
                    <div class="size-8 flex items-center justify-center">
                      <IconifyIcon :icon="`lucide:${iconName.toLowerCase()}`" class="size-6" />
                    </div>
                    <span class="text-xs text-gray-500 text-center leading-tight line-clamp-2 w-full" :title="iconName">
                      {{ iconName }}
                    </span>
                  </div>
                </div>
                <div v-if="filteredLucideIcons.length === 0" class="text-center py-10 text-gray-500">
                  未找到匹配的图标
                </div>
              </div>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </ElCard>
  </Page>
</template>
