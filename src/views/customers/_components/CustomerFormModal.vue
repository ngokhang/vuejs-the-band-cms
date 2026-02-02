<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Customer } from '@/types/customer'

interface Props {
  open: boolean
  customer?: Customer | null
}

const props = withDefaults(defineProps<Props>(), {
  customer: null,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'submit', payload: { name: string; phone: string; email: string | null }): void
}>()

const isEdit = computed(() => !!props.customer?.id)

const name = ref('')
const phone = ref('')
const email = ref('')

watch(
  () => [props.open, props.customer] as const,
  ([open, customer]) => {
    if (open) {
      name.value = customer?.name ?? ''
      phone.value = customer?.phone ?? ''
      email.value = customer?.email ?? ''
    }
  },
  { immediate: true }
)

function close() {
  emit('update:open', false)
}

function handleSubmit() {
  const payload = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim() || null,
  }
  if (!payload.name || !payload.phone) return
  emit('submit', payload)
  close()
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent :show-close-button="true" class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng' }}</DialogTitle>
        <DialogDescription>
          {{ isEdit ? 'Cập nhật thông tin khách hàng.' : 'Điền thông tin để thêm khách hàng mới.' }}
        </DialogDescription>
      </DialogHeader>
      <form class="grid gap-4 py-4" @submit.prevent="handleSubmit">
        <div class="grid gap-2">
          <Label for="customer-name">Họ tên</Label>
          <Input id="customer-name" v-model="name" placeholder="Nguyễn Văn A" required />
        </div>
        <div class="grid gap-2">
          <Label for="customer-phone">Số điện thoại</Label>
          <Input id="customer-phone" v-model="phone" type="tel" placeholder="0901234567" required />
        </div>
        <div class="grid gap-2">
          <Label for="customer-email">Email (tùy chọn)</Label>
          <Input id="customer-email" v-model="email" type="email" placeholder="email@example.com" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="close">Hủy</Button>
          <Button type="submit">{{ isEdit ? 'Cập nhật' : 'Thêm' }}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
