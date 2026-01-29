<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SortingState } from '@tanstack/vue-table'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { MoreHorizontal, Phone, UserPlus, Users } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import MemberFilter from '@/views/members/_components/MemberFilter.vue'
import MemberStats from '@/views/members/_components/MemberStats.vue'
import MemberTableEmptyState from '@/views/members/_components/MemberTableEmptyState.vue'
import MemberTablePagination from '@/views/members/_components/MemberTablePagination.vue'

const router = useRouter()

interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'member' | 'vip'
  joinDate: string
  status: 'active' | 'inactive'
  totalSpent: number
}

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

const columnHelper = createColumnHelper<Member>()

const columns = [
  columnHelper.accessor('name', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Thành viên'),
    cell: info => {
      const member = info.row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          {
            class:
              'flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold',
          },
          member.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
        ),
        h('div', {}, [
          h('div', { class: 'font-medium text-gray-900' }, info.getValue()),
          h('div', { class: 'text-xs text-gray-500' }, member.email),
        ]),
      ])
    },
  }),
  columnHelper.accessor('phone', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Số điện thoại'),
    cell: info =>
      h('div', { class: 'flex items-center gap-2 text-sm text-gray-600' }, [
        h(Phone, { class: 'h-4 w-4 text-gray-400' }),
        info.getValue(),
      ]),
  }),
  columnHelper.accessor('role', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Vai trò'),
    cell: info => {
      const role = info.getValue()
      const roleConfig = {
        admin: { label: 'Quản trị', bg: 'bg-purple-100', text: 'text-purple-800' },
        vip: { label: 'VIP', bg: 'bg-yellow-100', text: 'text-yellow-800' },
        member: { label: 'Thành viên', bg: 'bg-blue-100', text: 'text-blue-800' },
      }
      const config = roleConfig[role]
      return h(
        'span',
        {
          class: `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`,
        },
        config.label
      )
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => h('span', { class: 'sr-only' }, 'Thao tác'),
    cell: info => {
      const member = info.row.original
      return h(DropdownMenu, null, {
        default: () => [
          h(
            DropdownMenuTrigger,
            { asChild: true },
            {
              default: () =>
                h(
                  Button,
                  {
                    variant: 'ghost',
                    size: 'icon',
                    class:
                      'h-8 w-8 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500',
                  },
                  () => h(MoreHorizontal, { class: 'h-4 w-4 text-gray-500' })
                ),
            }
          ),
          h(
            DropdownMenuContent,
            { align: 'end' },
            {
              default: () => [
                h(
                  DropdownMenuItem,
                  {
                    onSelect: () => handleEdit(member),
                  },
                  { default: () => 'Chỉnh sửa' }
                ),
                h(
                  DropdownMenuItem,
                  {
                    class: 'text-red-600 focus:text-red-600',
                    onSelect: () => handleDelete(member),
                  },
                  { default: () => 'Xoá' }
                ),
              ],
            }
          ),
        ],
      })
    },
  }),
]

const handleEdit = (member: Member) => {
  console.log('Chỉnh sửa thành viên', member)
}

const handleDelete = (member: Member) => {
  console.log('Xoá thành viên', member)
}

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
