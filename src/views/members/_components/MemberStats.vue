<script setup lang="ts">
import { Users } from 'lucide-vue-next'

interface Props {
  totalMembers: number
  activeMembers: number
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
  </div>
</template>
