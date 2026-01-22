<script setup lang="ts">
import { reactive } from 'vue'
import type { FormConfig } from '../types/form'

const props = defineProps<{
  config: FormConfig
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = reactive({ ...props.modelValue })

function onSubmit() {
  emit('submit', formData)
}
</script>

<template>
  <div class="dialog">
    <div class="form">
      <div v-for="field in config.fields" :key="field.prop">
        <label>{{ field.label }}</label>
        <input v-model="formData[field.prop]" :type="field.type" />
      </div>
      <button @click="onSubmit">提交</button>
    </div>
  </div>
</template>

<style>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  background: white;
  padding: 20px;
}
</style>
