<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@/packages/effects/common-ui/src'
import { LOGIN_PATH } from '@/packages/constants'

defineOptions({ name: 'QrCodeLogin' })
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
