<script setup lang="ts">
import DataTable from '@/components/common/DataTable.vue'
import { Button } from '@/components/ui/button'
import { useMembersQuery } from '@/composables/members/useMembersQuery'
import { useMemberStore } from '@/stores/member'
import MemberFilter from '@/views/members/_components/MemberFilter.vue'
import MemberStats from '@/views/members/_components/MemberStats.vue'
import MemberTableEmptyState from '@/views/members/_components/MemberTableEmptyState.vue'
import MemberTablePagination from '@/views/members/_components/MemberTablePagination.vue'
import { useMemberColumns } from '@/views/members/_components/useMemberColumns'
import type { User } from '@/types/user'
import type { SortingState } from '@tanstack/vue-table'
import { getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { UserPlus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const memberStore = useMemberStore()
const { pagination } = storeToRefs(memberStore)
const { setPagination } = memberStore

const { data: members, meta, isLoading, isError, error } = useMembersQuery()

const sorting = ref<SortingState>([])

const filterQuery = computed({
  get: () => pagination.value.q ?? '',
  set: (value: string) => {
    setPagination({
      page: 1,
      pageSize: pagination.value.pageSize,
      q: value || null,
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

const table = useVueTable({
  data: members,
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

const filteredRows = computed(() => table.getRowModel().rows)
const pageCount = computed(() => meta.value?.totalPages ?? 1)
const currentPage = computed(() => pagination.value.page)
const totalFromMeta = computed(() => meta.value?.total ?? 0)

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
    <MemberFilter v-model="filterQuery" />

    <!-- Loading / Error -->
    <div v-if="isLoading" class="py-12 text-center text-sm text-gray-500">
      Đang tải danh sách thành viên...
    </div>
    <div v-else-if="isError" class="py-12 text-center text-sm text-red-600">
      {{ error?.message ?? 'Đã xảy ra lỗi khi tải danh sách thành viên' }}
    </div>

    <!-- Table -->
    <DataTable v-else :table="table">
      <template #emptyState>
        <MemberTableEmptyState :is-empty="filteredRows.length === 0" />
      </template>
      <template #pagination>
        <MemberTablePagination
          :page-count="pageCount"
          :current-page="currentPage"
          :total="totalFromMeta"
          @update:page="(page: number) => setPagination({ ...pagination, page })"
        />
      </template>
    </DataTable>
  </div>
</template>
