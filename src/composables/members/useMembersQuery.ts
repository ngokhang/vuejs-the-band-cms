import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import type { ApiResponse } from '@/types/response'
import type { User } from '@/types/user'
import { useMemberStore } from '@/stores/member'
import { userService } from '@/services/UserService'
import { memberKeys } from './memberKeys'

export function useMembersQuery() {
  const memberStore = useMemberStore()
  const { pagination } = storeToRefs(memberStore)

  const queryKey = computed(() =>
    memberKeys.list({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize,
      query: pagination.value.query ?? undefined,
      sortBy: pagination.value.sortBy ?? undefined,
    })
  )

  const query = useQuery({
    queryKey,
    queryFn: async (): Promise<ApiResponse<User[]>> => {
      return userService.getUserWithPagination(pagination.value)
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  })

  const data = computed(() => query.data.value?.data ?? [])
  const meta = computed(() => query.data.value?.meta)

  return {
    ...query,
    data,
    meta,
  }
}
