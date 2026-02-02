import type { MemberListParams } from '@/types/member'

export type { MemberListParams }
export const memberKeys = {
  all: ['members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  list: (params: MemberListParams) =>
    [...memberKeys.lists(), params.page, params.pageSize, params.query, params.sortBy] as const,
  details: () => [...memberKeys.all, 'detail'] as const,
  detail: (id: string) => [...memberKeys.details(), id] as const,
}
