<script setup lang="ts">
import { Users } from 'lucide-vue-next'

interface Props {
  isEmpty: boolean
}

defineProps<Props>()
</script>

<template>
  <div v-if="isEmpty" class="flex flex-col items-center justify-center px-6 py-12">
    <Users class="mb-3 h-12 w-12 text-gray-300" />
    <p class="text-gray-500">Không tìm thấy thành viên nào</p>
  </div>
</template>
