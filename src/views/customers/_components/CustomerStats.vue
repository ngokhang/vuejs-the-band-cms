<script setup lang="ts">
import { UserCircle2 } from 'lucide-vue-next'

interface Props {
  totalCustomers: number
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="rounded-lg bg-emerald-50 p-4">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
          <UserCircle2 class="h-5 w-5 text-white" />
        </div>
        <div>
          <p class="text-xs text-gray-600">Tổng khách hàng</p>
          <p class="text-2xl font-bold text-emerald-600">{{ totalCustomers }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
