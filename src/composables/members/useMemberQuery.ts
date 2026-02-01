import { useQuery } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { User } from '@/types/user'
import { userService } from '@/services/UserService'
import { memberKeys } from './memberKeys'

export function useMemberQuery(id: MaybeRefOrGetter<string>) {
  const resolvedId = computed(() => toValue(id))
  const queryKey = computed(() => memberKeys.detail(resolvedId.value))
  const enabled = computed(() => !!resolvedId.value)

  const query = useQuery({
    queryKey,
    queryFn: async ({ queryKey: key }): Promise<User> => {
      const memberId = key[2] as string
      const response = await userService.getUserById(memberId)
      const raw = (response as { data?: unknown })?.data ?? response
      return {
        ...(raw as User),
        bandRoles: (raw as User).bandRoles ?? [],
        systemRoles: (raw as User).systemRoles ?? [],
      } as User
    },
    enabled,
  })

  return query
}
