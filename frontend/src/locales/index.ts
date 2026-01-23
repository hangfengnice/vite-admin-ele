import { i18n, localesMap, setupI18n, loadLocaleMessages } from './i18n'

import { type LocaleSetupOptions, type SupportedLanguagesType } from './typing'
import type { Language } from 'element-plus/es/locale'
import type { App } from 'vue'

import { preferences } from '@/packages/core/preferences/src'
import dayjs from 'dayjs'
import enLocale from 'element-plus/es/locale/lang/en'
import defaultLocale from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'
const elementLocale = ref<Language>(defaultLocale)

const $t = i18n.global.t

/**
 * 加载应用特有的语言包
 * 这里也可以改造为从服务端获取翻译数据
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
    loadThirdPartyMessage(lang),
  ])
  return appLocaleMessages?.default
}

/**
 * 加载第三方组件库的语言包
 * @param lang
 */
async function loadThirdPartyMessage(lang: SupportedLanguagesType) {
  await Promise.all([loadElementLocale(lang), loadDayjsLocale(lang)])
}

/**
 * 加载dayjs的语言包
 * @param lang
 */
async function loadDayjsLocale(lang: SupportedLanguagesType) {
  let locale
  switch (lang) {
    case 'en-US': {
      locale = await import('dayjs/locale/en')
      break
    }
    case 'zh-CN': {
      locale = await import('dayjs/locale/zh-cn')
      break
    }
    // 默认使用英语
    default: {
      locale = await import('dayjs/locale/en')
    }
  }
  if (locale) {
    dayjs.locale(locale)
  } else {
    console.error(`Failed to load dayjs locale for ${lang}`)
  }
}

/**
 * 加载element-plus的语言包
 * @param lang
 */
async function loadElementLocale(lang: SupportedLanguagesType) {
  switch (lang) {
    case 'en-US': {
      elementLocale.value = enLocale
      break
    }
    case 'zh-CN': {
      elementLocale.value = defaultLocale
      break
    }
  }
}

async function setupI18nEle(app: App, options: LocaleSetupOptions = {}) {
  await setupI18n(app, {
    defaultLocale: preferences.app.locale,
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  })
}

export { $t, elementLocale, i18n, setupI18nEle, loadLocaleMessages }
export { useI18n } from 'vue-i18n'
