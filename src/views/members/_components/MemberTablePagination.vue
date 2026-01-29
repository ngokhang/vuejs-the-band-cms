<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

interface Props {
  pageCount: number
  currentPage: number
  total: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const handlePageChange = (page: number) => {
  emit('update:page', page)
}
</script>

<template>
  <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
    <div class="space-y-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Pagination
          v-if="pageCount > 1"
          :total="total"
          :items-per-page="5"
          :sibling-count="1"
          :page="currentPage"
          @update:page="handlePageChange"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious>
              <ChevronLeftIcon />
              <span class="hidden sm:block">Trước</span>
            </PaginationPrevious>
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
            <PaginationNext>
              <span class="hidden sm:block">Sau</span>
              <ChevronRightIcon />
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>
