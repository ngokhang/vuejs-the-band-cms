<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/vue-table'
import { Users, Mail, Phone, Search, UserPlus, MoreHorizontal, Edit, Trash2 } from 'lucide-vue-next'
import FlexRender from '@/components/ui/FlexRender.vue'
import type { SortingState } from '@tanstack/vue-table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

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
  columnHelper.accessor('joinDate', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Ngày tham gia'),
    cell: info => {
      const date = new Date(info.getValue()).toLocaleDateString('vi-VN')
      return h('span', { class: 'text-sm text-gray-600' }, date)
    },
  }),
  columnHelper.accessor('totalSpent', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Tổng chi tiêu'),
    cell: info =>
      h(
        'span',
        { class: 'text-sm font-semibold text-gray-900' },
        `$${info.getValue().toLocaleString()}`
      ),
  }),
  columnHelper.accessor('status', {
    header: () => h('span', { class: 'font-semibold text-gray-900' }, 'Trạng thái'),
    cell: info => {
      const status = info.getValue()
      return h('div', { class: 'flex items-center gap-2' }, [
        h('div', {
          class: `h-2 w-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`,
        }),
        h('span', { class: 'text-sm text-gray-600' }, status === 'active' ? 'Hoạt động' : 'Ngừng'),
      ])
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: () => h('span'),
    cell: () =>
      h(
        'button',
        {
          class:
            'inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100',
          title: 'Tùy chọn',
        },
        [h(MoreHorizontal, { class: 'h-5 w-5 text-gray-400' })]
      ),
  }),
]

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
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  },
  onGlobalFilterChange: updater => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
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
      <Button class="gap-2">
        <UserPlus class="h-4 w-4" />
        Thêm thành viên
      </Button>
    </div>

    <!-- Stats & Search -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div class="rounded-lg bg-blue-50 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
            <Users class="h-5 w-5 text-white" />
          </div>
          <div>
            <p class="text-xs text-gray-600">Tổng thành viên</p>
            <p class="text-2xl font-bold text-blue-600">{{ totalMembers }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-green-50 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
            <Users class="h-5 w-5 text-white" />
          </div>
          <div>
            <p class="text-xs text-gray-600">Đang hoạt động</p>
            <p class="text-2xl font-bold text-green-600">{{ activeMembers }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-yellow-50 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500">
            <Users class="h-5 w-5 text-white" />
          </div>
          <div>
            <p class="text-xs text-gray-600">Thành viên VIP</p>
            <p class="text-2xl font-bold text-yellow-600">{{ vipMembers }}</p>
          </div>
        </div>
      </div>

      <div class="relative">
        <Search class="absolute top-3.5 left-3 h-5 w-5 text-gray-400" />
        <input
          v-model="globalFilter"
          type="text"
          placeholder="Tìm kiếm theo tên, email, SĐT..."
          class="h-full w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th
                v-for="header in table.getHeaderGroups()[0]?.headers || []"
                :key="header.id"
                class="px-6 py-4 text-left"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="row in filteredRows"
              :key="row.id"
              class="transition-colors hover:bg-gray-50"
            >
              <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-6 py-4">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredRows.length === 0"
        class="flex flex-col items-center justify-center px-6 py-12"
      >
        <Users class="mb-3 h-12 w-12 text-gray-300" />
        <p class="text-gray-500">Không tìm thấy thành viên nào</p>
      </div>

      <!-- Pagination -->
      <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <div class="space-y-4">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <!-- <div class="text-sm whitespace-nowrap text-gray-600">
              Hiển thị {{ filteredRows.length > 0 ? (currentPage - 1) * 5 + 1 : 0 }} -
              {{ Math.min(currentPage * 5, table.getFilteredRowModel().rows.length) }}
              trên tổng số {{ table.getFilteredRowModel().rows.length }} thành viên
            </div> -->

            <Pagination
              v-if="pageCount > 1"
              :total="table.getFilteredRowModel().rows.length"
              :items-per-page="5"
              :sibling-count="1"
              :default-page="1"
              :page="currentPage"
            >
              <PaginationContent v-slot="{ items }">
                <PaginationPrevious />
                <template
                  v-for="(item, index) in items"
                  :key="index"
                  :data-pagination-value="item.value"
                >
                  <PaginationItem
                    v-if="item.type === 'page'"
                    :value="item.value"
                    :is-active="item.value === currentPage"
                  >
                    {{ item.value }}
                  </PaginationItem>
                </template>
                <!-- <PaginationEllipsis :index="4" /> -->
                <PaginationNext />
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
