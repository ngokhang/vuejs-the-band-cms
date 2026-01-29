<script setup lang="ts">
import DataTable from '@/components/common/DataTable.vue'
import { Button } from '@/components/ui/button'
import MemberFilter from '@/views/members/_components/MemberFilter.vue'
import MemberStats from '@/views/members/_components/MemberStats.vue'
import MemberTableEmptyState from '@/views/members/_components/MemberTableEmptyState.vue'
import MemberTablePagination from '@/views/members/_components/MemberTablePagination.vue'
import { useMemberColumns, type Member } from '@/views/members/_components/useMemberColumns'
import type { SortingState } from '@tanstack/vue-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { UserPlus } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const members = ref<Member[]>([
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0912345678',
    role: 'vip',
    joinDate: '2023-01-15',
    status: 'active',
    totalSpent: 15000,
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'tranthibinh@email.com',
    phone: '0923456789',
    role: 'member',
    joinDate: '2023-03-20',
    status: 'active',
    totalSpent: 5000,
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    email: 'lehoangcuong@email.com',
    phone: '0934567890',
    role: 'admin',
    joinDate: '2022-12-10',
    status: 'active',
    totalSpent: 25000,
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    email: 'phamminhduc@email.com',
    phone: '0945678901',
    role: 'member',
    joinDate: '2023-05-05',
    status: 'active',
    totalSpent: 3000,
  },
  {
    id: '5',
    name: 'Hoàng Thị Em',
    email: 'hoangthiem@email.com',
    phone: '0956789012',
    role: 'vip',
    joinDate: '2023-02-28',
    status: 'active',
    totalSpent: 18000,
  },
  {
    id: '6',
    name: 'Vũ Đức Phong',
    email: 'vuducphong@email.com',
    phone: '0967890123',
    role: 'member',
    joinDate: '2023-06-15',
    status: 'inactive',
    totalSpent: 1000,
  },
  {
    id: '7',
    name: 'Đỗ Thị Giang',
    email: 'dothigiang@email.com',
    phone: '0978901234',
    role: 'member',
    joinDate: '2023-04-10',
    status: 'active',
    totalSpent: 4500,
  },
  {
    id: '8',
    name: 'Bùi Văn Hải',
    email: 'buivanhai@email.com',
    phone: '0989012345',
    role: 'vip',
    joinDate: '2023-01-20',
    status: 'active',
    totalSpent: 22000,
  },
  {
    id: '9',
    name: 'Ngô Thị Lan',
    email: 'ngothilan@email.com',
    phone: '0990123456',
    role: 'member',
    joinDate: '2023-07-08',
    status: 'active',
    totalSpent: 6000,
  },
  {
    id: '10',
    name: 'Trịnh Văn Khoa',
    email: 'trinhvankhoa@email.com',
    phone: '0901234567',
    role: 'member',
    joinDate: '2023-08-12',
    status: 'inactive',
    totalSpent: 500,
  },
])

const sorting = ref<SortingState>([])
const globalFilter = ref('')
const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
})

const handleEdit = (member: Member) => {
  router.push({ name: 'members-edit', params: { id: member.id } })
}

const handleDelete = (member: Member) => {
  console.log('Xoá thành viên', member)
}

const columns = useMemberColumns({
  onEdit: handleEdit,
  onDelete: handleDelete,
})

const table = useVueTable({
  data: members.value,
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get pagination() {
      return pagination.value
    },
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  onGlobalFilterChange: updater => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  onPaginationChange: updater => {
    pagination.value = typeof updater === 'function' ? updater(pagination.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: {
      pageSize: 5,
    },
  },
  globalFilterFn: (row, _columnId, filterValue) => {
    const name = row.original.name.toLowerCase()
    const email = row.original.email.toLowerCase()
    const phone = row.original.phone
    const filter = filterValue.toLowerCase()
    return name.includes(filter) || email.includes(filter) || phone.includes(filter)
  },
})

const filteredRows = computed(() => table.getRowModel().rows)
const pageCount = computed(() => table.getPageCount())
const currentPage = computed(() => table.getState().pagination.pageIndex + 1)

const totalMembers = computed(() => members.value.length)
const activeMembers = computed(() => members.value.filter(m => m.status === 'active').length)
const vipMembers = computed(() => members.value.filter(m => m.role === 'vip').length)
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
    <MemberFilter v-model="globalFilter" />

    <!-- Table -->
    <DataTable :table="table">
      <template #emptyState>
        <MemberTableEmptyState :is-empty="filteredRows.length === 0" />
      </template>
      <template #pagination>
        <MemberTablePagination
          :page-count="pageCount"
          :current-page="currentPage"
          :total="table.getFilteredRowModel().rows.length"
          @update:page="(page: number) => table.setPageIndex(page - 1)"
        />
      </template>
    </DataTable>
  </div>
</template>
