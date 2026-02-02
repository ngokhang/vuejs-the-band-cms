<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import FlexRender from '@/components/ui/FlexRender.vue'
import { computed } from 'vue'

interface Props {
  table: Table<any>
}

const props = defineProps<Props>()

defineSlots<{
  emptyState?: () => any
  pagination?: () => any
}>()

const rows = computed(() => props.table.getRowModel().rows)
const headerCount = computed(
  () => props.table.getHeaderGroups()[0]?.headers?.length ?? 0
)
const isEmpty = computed(() => rows.value.length === 0)
</script>

<template>
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
          <template v-if="isEmpty">
            <tr>
              <td :colspan="headerCount" class="p-0 align-top">
                <slot name="emptyState" />
              </td>
            </tr>
          </template>
          <tr
            v-else
            v-for="row in rows"
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

    <!-- Pagination Slot -->
    <slot name="pagination" />
  </div>
</template>
