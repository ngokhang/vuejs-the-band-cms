import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Customer } from '@/types/customer'
import { useCustomerStore } from '@/stores/customer'

export function useCustomersQuery() {
  const customerStore = useCustomerStore()
  const { pagination, customersList } = storeToRefs(customerStore)

  const data = computed(() => {
    const q = (pagination.value.query ?? '').trim().toLowerCase()
    let filtered = customersList.value
    if (q) {
      filtered = filtered.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.email?.toLowerCase().includes(q) ?? false)
      )
    }
    const total = filtered.length
    const page = pagination.value.page
    const pageSize = pagination.value.pageSize
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    return { items, total, totalPages }
  })

  const meta = computed(() => ({
    totalItems: data.value.total,
    totalPages: data.value.totalPages,
  }))

  const dataUpdatedAt = computed(() => customersList.value.length)

  return {
    data: computed(() => data.value.items),
    meta,
    isLoading: ref(false),
    isError: ref(false),
    error: ref<Error | null>(null),
    isFetching: ref(false),
    dataUpdatedAt,
  }
}
