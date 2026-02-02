import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MemberListParams } from '@/types/member'

const defaultPagination: MemberListParams = {
  page: 1,
  pageSize: 10,
  query: '',
  sortBy: 'ASC',
}

export const useMemberStore = defineStore('member', () => {
  const pagination = ref<MemberListParams>({ ...defaultPagination })

  function setPagination(paginationArgs: MemberListParams) {
    pagination.value = {
      page: paginationArgs.page,
      pageSize: paginationArgs.pageSize,
      query: paginationArgs.query,
      sortBy: paginationArgs.sortBy,
    }
  }

  function clearPagination() {
    pagination.value = { ...defaultPagination }
  }

  return {
    pagination,
    setPagination,
    clearPagination,
  }
})
