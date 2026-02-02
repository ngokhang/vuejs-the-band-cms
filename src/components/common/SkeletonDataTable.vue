<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  columnCount?: number
  rowCount?: number
  showHeader?: boolean
}

withDefaults(
  defineProps<Props>(),
  {
    columnCount: 5,
    rowCount: 8,
    showHeader: true,
  }
)
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead v-if="showHeader">
          <tr class="border-b border-gray-200 bg-gray-50">
            <th
              v-for="col in columnCount"
              :key="col"
              class="px-6 py-4 text-left"
            >
              <Skeleton class="h-4 w-full max-w-[120px]" />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="row in rowCount"
            :key="row"
            class="transition-colors hover:bg-gray-50"
          >
            <td
              v-for="col in columnCount"
              :key="col"
              class="px-6 py-4"
            >
              <Skeleton
                :class="[
                  'h-4',
                  col === 1 ? 'max-w-[180px]' : col === columnCount ? 'max-w-[80px]' : 'max-w-[140px]',
                ]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
