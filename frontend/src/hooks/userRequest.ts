import { ref } from 'vue'

export function useRequest<T>(api: () => Promise<T>) {
  const loading = ref(false)
  const data = ref<T | null>(null)

  const run = async () => {
    loading.value = true
    try {
      data.value = await api()
    } finally {
      loading.value = false
    }
  }

  return { loading, data, run }
}
