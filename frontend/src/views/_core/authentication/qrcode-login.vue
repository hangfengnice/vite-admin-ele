<script lang="ts" setup>
defineOptions({
  name: 'AuthenticationQrCodeLogin',
})

import { LOGIN_PATH } from '@/packages/constants'
import { $t } from '@/locales'
import { SUIButton } from '@/packages/core/ui-kit/shadcn-ui'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import Title from './components/auth-title.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  /**
   * @zh_CN 是否处于加载处理状态
   */
  loading?: boolean
  /**
   * @zh_CN 登录路径
   */
  loginPath?: string
  /**
   * @zh_CN 标题
   */
  title?: string
  /**
   * @zh_CN 描述
   */
  subTitle?: string
  /**
   * @zh_CN 按钮文本
   */
  submitButtonText?: string
  /**
   * @zh_CN 描述
   */
  description?: string
  /**
   * @zh_CN 是否显示返回按钮
   */
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  loading: false,
  showBack: true,
  loginPath: LOGIN_PATH || '/auth/login',
  submitButtonText: '',
  subTitle: '',
  title: '',
})

const text = ref('https://vben.vvbin.cn')

const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  margin: 4,
})

const router = useRouter()
function goToLogin() {
  router.push(props.loginPath)
}
</script>

<template>
  <div>
    <Title>
      <slot name="title">
        {{ title || $t('authentication.welcomeBack') }} 📱
      </slot>
      <template #desc>
        <span class="text-muted-foreground">
          <slot name="subTitle">
            {{ subTitle || $t('authentication.qrcodeSubtitle') }}
          </slot>
        </span>
      </template>
    </Title>

    <div class="flex-col-center mt-6">
      <img :src="qrcode" alt="qrcode" class="w-1/2" />
      <p class="text-muted-foreground mt-4 text-sm">
        <slot name="description">
          {{ description || $t('authentication.qrcodePrompt') }}
        </slot>
      </p>
    </div>

    <SUIButton
      v-if="showBack"
      class="mt-4 w-full"
      variant="outline"
      @click="goToLogin()"
    >
      {{ $t('common.back') }}
    </SUIButton>
  </div>
</template>
