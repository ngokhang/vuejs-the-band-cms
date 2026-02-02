<script setup lang="ts">
import DataTableState from '@/components/common/DataTableState.vue'
import SkeletonDataTable from '@/components/common/SkeletonDataTable.vue'
import { Button } from '@/components/ui/button'
import { useMembersQuery } from '@/composables/members/useMembersQuery'
import { useMemberStore } from '@/stores/member'
import MemberFilter from '@/views/members/_components/MemberFilter.vue'
import MemberStats from '@/views/members/_components/MemberStats.vue'
import MembersDataTable from '@/views/members/_components/MembersDataTable.vue'
import MemberTablePagination from '@/views/members/_components/MemberTablePagination.vue'
import { useMemberColumns } from '@/views/members/_components/useMemberColumns'
import type { User } from '@/types/user'
import { UserPlus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'

const router = useRouter()
const memberStore = useMemberStore()
const { pagination } = storeToRefs(memberStore)
const { setPagination } = memberStore

const {
  data: members,
  meta,
  isLoading,
  isError,
  error,
  isFetching,
  dataUpdatedAt,
} = useMembersQuery()

const filterQuery = computed({
  get: () => pagination.value.query ?? '',
  set: (value: string) => {
    setPagination({
      page: 1,
      pageSize: pagination.value.pageSize,
      query: value || null,
      sortBy: pagination.value.sortBy ?? undefined,
    })
  },
})

const handleEdit = (member: User) => {
  router.push({ name: 'members-edit', params: { id: member.id } })
}

const handleDelete = (member: User) => {
  console.log('Xoá thành viên', member)
}

const columns = useMemberColumns({
  onEdit: handleEdit,
  onDelete: handleDelete,
})

const handleFilterChange = (value: string) => {
  const q = value ? value.trim() : ''
  setPagination({
    page: 1,
    pageSize: pagination.value.pageSize,
    query: q || null,
    sortBy: pagination.value.sortBy ?? undefined,
  })
}

const currentPage = computed(() => pagination.value.page)
const tableKey = computed(() => `${currentPage}-${dataUpdatedAt.value ?? 0}`)
const pageCount = computed(() => meta.value?.totalPages ?? 1)
const totalFromMeta = computed(() => meta.value?.totalItems ?? 1)

const totalMembers = computed(() => totalFromMeta.value)
const activeMembers = computed(() => totalFromMeta.value)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Quản lý thành viên</h2>
        <p class="mt-1 text-sm text-gray-600">Danh sách và quản lý tất cả thành viên</p>
      </div>
      <Button class="gap-2" @click="router.push({ name: 'members-create' })">
        <UserPlus class="h-4 w-4" />
        Thêm thành viên
      </Button>
    </div>

    <!-- Stats -->
    <MemberStats :total-members="totalMembers" :active-members="activeMembers" />

    <!-- Filter -->
    <MemberFilter v-model="filterQuery" @update:model-value="handleFilterChange" />

    <DataTableState
      v-if="isError"
      variant="error"
      :message="error?.message ?? 'Đã xảy ra lỗi khi tải danh sách thành viên'"
    />

    <SkeletonDataTable v-else-if="isLoading || isFetching" :column-count="4" />

    <MembersDataTable
      v-else
      :key="tableKey"
      :members="members"
      :columns="columns as ColumnDef<User, any>[]"
    >
      <template #pagination>
        <MemberTablePagination
          :page-size="pagination.pageSize"
          :page-count="pageCount"
          :current-page="currentPage"
          :total="totalFromMeta"
          @update:page="(page: number) => setPagination({ ...pagination, page })"
        />
      </template>
    </MembersDataTable>
  </div>
</template>
