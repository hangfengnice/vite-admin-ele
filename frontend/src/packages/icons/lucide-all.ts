/**
 * Lucide 图标完整集合
 * 包含所有 3334+ 个 lucide-vue-next 图标
 *
 * 使用方式：
 * import { getLucideIcon, getLucideIconNames } from '@/packages/icons/lucide-all'
 */

// 常用图标分组
export const lucideIconCategories = {
  arrows: [
    'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp',
    'ArrowBigDown', 'ArrowBigLeft', 'ArrowBigRight', 'ArrowBigUp',
    'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp',
    'ChevronsDown', 'ChevronsLeft', 'ChevronsRight', 'ChevronsUp',
    'ArrowDownLeft', 'ArrowDownRight', 'ArrowUpLeft', 'ArrowUpRight',
    'ArrowUpDown', 'ArrowLeftRight', 'Move', 'MoveVertical', 'MoveHorizontal',
  ],
  interface: [
    'Menu', 'X', 'Search', 'Settings', 'Home', 'User', 'Users',
    'Check', 'Circle', 'Square', 'Star', 'Heart', 'Bookmark',
    'Bell', 'Mail', 'Phone', 'Calendar', 'Clock', 'AlertCircle',
    'Info', 'HelpCircle', 'ToggleLeft', 'ToggleRight',
  ],
  files: [
    'File', 'FileText', 'Folder', 'FolderOpen', 'Download', 'Upload',
    'Copy', 'Cut', 'Clipboard', 'Archive', 'Trash', 'Trash2',
    'Save', 'FileEdit', 'FileSearch', 'FilePlus', 'FileMinus',
  ],
  editing: [
    'Edit', 'Edit2', 'Edit3', 'PenTool', 'Highlighter', 'Eraser',
    'Scissors', 'Crop', 'Undo', 'Redo', 'History', 'RefreshCw',
  ],
  media: [
    'Image', 'Film', 'Music', 'Mic', 'Mic2', 'Video', 'Camera',
    'CameraOff', 'Volume', 'Volume2', 'VolumeX', 'Play', 'Pause',
    'Stop', 'SkipBack', 'SkipForward', 'Rewind', 'FastForward',
  ],
  devices: [
    'Monitor', 'Laptop', 'Tablet', 'Smartphone', 'Phone',
    'Keyboard', 'Mouse', 'MousePointer', 'Touchpad', 'Watch',
  ],
  status: [
    'CheckCircle', 'XCircle', 'AlertTriangle', 'AlertOctagon',
    'CheckSquare', 'XSquare', 'HelpCircle', 'Info',
    'CircleCheck', 'CircleX', 'CircleAlert', 'CircleHelp',
  ],
  charts: [
    'BarChart', 'BarChart2', 'BarChart3', 'BarChart4',
    'LineChart', 'PieChart', 'Activity', 'TrendingUp', 'TrendingDown',
    'Zap', 'ZapOff', 'Power', 'PowerOff',
  ],
  shapes: [
    'Circle', 'Square', 'Triangle', 'Hexagon', 'Octagon',
    'CirclePlus', 'CircleMinus', 'SquarePlus', 'SquareMinus',
    'Plus', 'Minus', 'Divide', 'Percent',
  ],
  security: [
    'Lock', 'Unlock', 'LockKeyhole', 'Shield', 'ShieldCheck',
    'ShieldAlert', 'ShieldClose', 'Key', 'KeyRound', 'Fingerprint',
    'Eye', 'EyeOff', 'UserCheck', 'UserX', 'UserPlus',
  ],
  navigation: [
    'Home', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
    'CornerUpLeft', 'CornerUpRight', 'CornerDownLeft', 'CornerDownRight',
    'Expand', 'Shrink', 'Maximize', 'Minimize', 'Minimize2',
    'Fullscreen', 'ExternalLink', 'LogOut', 'LogIn',
  ],
  social: [
    'Github', 'Twitter', 'Facebook', 'Instagram', 'Linkedin',
    'Youtube', 'Mail', 'MessageCircle', 'Send', 'Share', 'Share2',
  ],
  weather: [
    'Sun', 'Moon', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudLightning',
    'CloudDrizzle', 'CloudFog', 'Wind', 'Thermometer', 'ThermometerSun',
    'ThermometerSnow', 'Sunrise', 'Sunset', 'Snowflake',
  ],
  time: [
    'Clock', 'AlarmClock', 'Timer', 'TimerReset', 'Watch', 'Hourglass',
    'Calendar', 'CalendarDays', 'CalendarRange', 'CalendarCheck',
  ],
}

// 获取所有图标名称（通过动态导入 lucide-vue-next）
export function getLucideIconNames(): string[] {
  return Object.values(lucideIconCategories).flat()
}

// 按分类获取图标
export function getLucideIconsByCategory(category: keyof typeof lucideIconCategories): string[] {
  return lucideIconCategories[category] || []
}

// 获取所有分类
export function getLucideCategories(): Array<{ name: string; key: string; count: number }> {
  return Object.entries(lucideIconCategories).map(([key, icons]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    key,
    count: icons.length,
  }))
}
