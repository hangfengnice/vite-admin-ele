import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { UserListParams } from '../types/user'
import _ from 'lodash'

export function useList<T>(
  api: (params: any) => Promise<{ total: number; list: T[] }>
) {
  const list = ref<T[]>([])
  const total = ref(0)
  const loading = ref(false)
  const params = ref<UserListParams>({
    page: 1,
    pageSize: 10,
    keyword: '',
  })

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await api(params.value)
      list.value = res.list
      total.value = res.total
    } finally {
      loading.value = false
    }
  }

  // // 防抖搜索
  // const search = _.debounce(() => {
  //   params.value.page = 1
  //   fetchData()
  // }, 300)

  // 监听分页变化
  watch(() => [params.value.page, params.value.pageSize], fetchData)

  return {
    list,
    total,
    loading,
    params,
    fetchData,
    // search,
  }
}
