<script setup lang="ts">
import { Trash2, Upload } from 'lucide-vue-next'
import { onUnmounted, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateAvatarFile } from '@/lib/cloudinary'

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif'

const props = defineProps<{
  /** File khi chọn ảnh mới, string (URL) khi hiển thị avatar từ API (edit mode) */
  modelValue?: File | string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
  (e: 'validationError', message: string): void
}>()

const previewUrl = ref<string | null>(null)
const fileInputRef = ref<any>(null)
const validationError = ref<string | null>(null)

watch(
  () => props.modelValue,
  newVal => {
    if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = null
    validationError.value = null

    if (newVal) {
      if (newVal instanceof File) {
        previewUrl.value = URL.createObjectURL(newVal)
      } else if (typeof newVal === 'string') {
        previewUrl.value = newVal
      }
    }
  },
  { immediate: true }
)

const triggerFileInput = () => {
  const el = fileInputRef.value?.$el ?? fileInputRef.value
  el?.click?.()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  if (!file) return
  const result = validateAvatarFile(file)
  if (!result.valid) {
    validationError.value = result.message
    emit('validationError', result.message)
    emit('update:modelValue', null)
    return
  }
  validationError.value = null
  emit('update:modelValue', file)
}

const clearAvatar = (event: Event) => {
  event.stopPropagation()

  emit('update:modelValue', null)

  if (previewUrl.value && previewUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = null

  if (fileInputRef.value) {
    const el = fileInputRef.value.$el ?? fileInputRef.value
    if (el) {
      el.value = ''
    }
  }
}

onUnmounted(() => {
  if (previewUrl.value?.startsWith('blob:')) URL.revokeObjectURL(previewUrl.value)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="group hover:border-primary/50 relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100"
      @click="triggerFileInput"
    >
      <template v-if="previewUrl">
        <img :src="previewUrl" class="h-full w-full object-cover" alt="Avatar Preview" />

        <div
          class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          <span class="text-xs font-medium text-white drop-shadow-sm">Thay ảnh</span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          class="absolute top-1 right-1 h-6 w-6 rounded-full border-none bg-white text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
          @click.stop="clearAvatar"
        >
          <Trash2 class="h-3 w-3" />
        </Button>
      </template>

      <div
        v-else
        class="group-hover:text-primary flex flex-col items-center gap-2 text-slate-400 transition"
      >
        <Upload class="h-8 w-8" />
        <span class="text-xs font-medium">Chọn ảnh</span>
      </div>

      <Input
        ref="fileInputRef"
        type="file"
        :accept="ACCEPT"
        class="hidden"
        @change="handleFileChange"
      />
    </div>
    <p v-if="validationError" class="text-destructive mt-1 text-center text-xs">
      {{ validationError }}
    </p>
  </div>
</template>
