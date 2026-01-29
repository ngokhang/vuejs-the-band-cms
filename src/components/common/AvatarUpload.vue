<script setup lang="ts">
import { Trash2, Upload } from 'lucide-vue-next'
import { onUnmounted, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  modelValue?: File | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const previewUrl = ref<string | null>(null)
const fileInputRef = ref<any>(null)

watch(
  () => props.modelValue,
  newFile => {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }

    if (newFile && newFile instanceof File) {
      previewUrl.value = URL.createObjectURL(newFile)
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
  if (input.files && input.files[0]) {
    const file = input.files[0]
    emit('update:modelValue', file)
  }
}

const clearAvatar = (event: Event) => {
  event.stopPropagation()

  emit('update:modelValue', null)

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }

  if (fileInputRef.value) {
    const el = fileInputRef.value.$el ?? fileInputRef.value
    if (el) {
      el.value = ''
    }
  }
}

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>

<template>
  <div class="flex justify-center">
    <div
      class="group hover:border-primary/50 relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100"
      @click="triggerFileInput"
    >
      <template v-if="previewUrl">
        <img :src="previewUrl" class="h-full w-full object-cover" alt="Avatar Preview" />

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
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
    </div>
  </div>
</template>
