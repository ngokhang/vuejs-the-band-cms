<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Customer } from '@/types/customer'

interface Props {
  open: boolean
  customer: Customer | null
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent :show-close-button="true" class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Thông tin khách hàng</DialogTitle>
        <DialogDescription> Chi tiết thông tin khách hàng. </DialogDescription>
      </DialogHeader>
      <div v-if="customer" class="grid gap-4 py-4">
        <div class="grid gap-2">
          <p class="text-sm font-medium text-gray-500">Họ tên</p>
          <p class="text-base text-gray-900">{{ customer.name }}</p>
        </div>
        <div class="grid gap-2">
          <p class="text-sm font-medium text-gray-500">Số điện thoại</p>
          <p class="text-base text-gray-900">{{ customer.phone }}</p>
        </div>
        <div class="grid gap-2">
          <p class="text-sm font-medium text-gray-500">Email</p>
          <p class="text-base text-gray-900">{{ customer.email ?? '—' }}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
