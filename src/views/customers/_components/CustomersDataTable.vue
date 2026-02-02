<script setup lang="ts">
import DataTable from '@/components/common/DataTable.vue'
import DataTableState from '@/components/common/DataTableState.vue'
import type { Customer } from '@/types/customer'
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import { getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { ref } from 'vue'

interface Props {
  customers: Customer[]
  columns: ColumnDef<Customer, any>[]
}

const props = defineProps<Props>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  data: ref([...props.customers]),
  columns: props.columns,
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
</script>

<template>
  <DataTable :table="table">
    <template #emptyState>
      <DataTableState variant="empty" message="Không tìm thấy khách hàng nào" />
    </template>
    <template #pagination>
      <slot name="pagination" />
    </template>
  </DataTable>
</template>
