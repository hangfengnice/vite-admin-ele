<script setup lang="ts">
import type { TableConfig } from '../types/table'

defineProps<{
  config: TableConfig
  data: any[]
}>()
</script>

<template>
  <table border="1" cellspacing="0" cellpadding="8">
    <thead>
      <tr>
        <th v-for="col in config.columns" :key="col.prop">
          {{ col.label }}
        </th>
        <th v-if="config.actions">操作</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="col in config.columns" :key="col.prop">
          {{ row[col.prop] }}
        </td>
        <td v-if="config.actions">
          <button
            v-for="btn in config.actions"
            :key="btn.label"
            @click="btn.onClick(row)"
          >
            {{ btn.label }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
