<script setup lang="ts">
import DataTableState from '@/components/common/DataTableState.vue'
import SkeletonDataTable from '@/components/common/SkeletonDataTable.vue'
import { Button } from '@/components/ui/button'
import { useCustomersQuery } from '@/composables/customers/useCustomersQuery'
import { useCustomerStore } from '@/stores/customer'
import type { Customer } from '@/types/customer'
import CustomerFilter from '@/views/customers/_components/CustomerFilter.vue'
import CustomerStats from '@/views/customers/_components/CustomerStats.vue'
import CustomersDataTable from '@/views/customers/_components/CustomersDataTable.vue'
import CustomerTablePagination from '@/views/customers/_components/CustomerTablePagination.vue'
import CustomerFormModal from '@/views/customers/_components/CustomerFormModal.vue'
import CustomerDetailModal from '@/views/customers/_components/CustomerDetailModal.vue'
import { useCustomerColumns } from '@/views/customers/_components/useCustomerColumns'
import { UserPlus } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

const customerStore = useCustomerStore()
const { pagination } = storeToRefs(customerStore)
const { setPagination, addCustomer, updateCustomer, removeCustomer } = customerStore

const {
  data: customers,
  meta,
  isLoading,
  isError,
  error,
  isFetching,
  dataUpdatedAt,
} = useCustomersQuery()

const filterQuery = computed({
  get: () => pagination.value.query ?? '',
  set: (value: string) => {
    setPagination({
      page: 1,
      pageSize: pagination.value.pageSize,
      query: value || null,
    })
  },
})

const formModalOpen = ref(false)
const detailModalOpen = ref(false)
const editingCustomer = ref<Customer | null>(null)
const viewingCustomer = ref<Customer | null>(null)

function openCreateModal() {
  editingCustomer.value = null
  formModalOpen.value = true
}

function openEditModal(customer: Customer) {
  editingCustomer.value = customer
  formModalOpen.value = true
}

function openDetailModal(customer: Customer) {
  viewingCustomer.value = customer
  detailModalOpen.value = true
}

function handleFormSubmit(payload: { name: string; phone: string; email: string | null }) {
  if (editingCustomer.value) {
    updateCustomer(editingCustomer.value.id, payload)
  } else {
    addCustomer(payload)
  }
  formModalOpen.value = false
  editingCustomer.value = null
}

function handleDelete(customer: Customer) {
  if (confirm(`Bạn có chắc muốn xóa khách hàng "${customer.name}"?`)) {
    removeCustomer(customer.id)
  }
}

const columns = useCustomerColumns({
  onView: openDetailModal,
  onEdit: openEditModal,
  onDelete: handleDelete,
})

const handleFilterChange = (value: string) => {
  const q = value ? value.trim() : ''
  setPagination({
    page: 1,
    pageSize: pagination.value.pageSize,
    query: q || null,
  })
}

const currentPage = computed(() => pagination.value.page)
const tableKey = computed(() => `${currentPage}-${dataUpdatedAt.value ?? 0}`)
const pageCount = computed(() => meta.value?.totalPages ?? 1)
const totalFromMeta = computed(() => meta.value?.totalItems ?? 0)
const totalCustomers = computed(() => totalFromMeta.value)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Quản lý khách hàng</h2>
        <p class="mt-1 text-sm text-gray-600">Danh sách và quản lý tất cả khách hàng</p>
      </div>
      <Button class="gap-2" @click="openCreateModal">
        <UserPlus class="h-4 w-4" />
        Thêm khách hàng
      </Button>
    </div>

    <!-- Stats -->
    <CustomerStats :total-customers="totalCustomers" />

    <!-- Filter -->
    <CustomerFilter v-model="filterQuery" @update:model-value="handleFilterChange" />

    <DataTableState
      v-if="isError"
      variant="error"
      :message="error?.message ?? 'Đã xảy ra lỗi khi tải danh sách khách hàng'"
    />

    <SkeletonDataTable v-else-if="isLoading || isFetching" :column-count="4" />

    <CustomersDataTable
      v-else
      :key="tableKey"
      :customers="customers"
      :columns="columns as ColumnDef<Customer, any>[]"
    >
      <template #pagination>
        <CustomerTablePagination
          :page-size="pagination.pageSize"
          :page-count="pageCount"
          :current-page="currentPage"
          :total="totalFromMeta"
          @update:page="(page: number) => setPagination({ ...pagination, page })"
        />
      </template>
    </CustomersDataTable>
  </div>

  <!-- Modals -->
  <CustomerFormModal
    :open="formModalOpen"
    :customer="editingCustomer"
    @update:open="formModalOpen = $event"
    @submit="handleFormSubmit"
  />
  <CustomerDetailModal
    :open="detailModalOpen"
    :customer="viewingCustomer"
    @update:open="detailModalOpen = $event"
  />
</template>
