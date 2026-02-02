<script setup lang="ts">
import { AlertCircle, Inbox } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  /** 'empty' = không có dữ liệu, 'error' = có lỗi xảy ra */
  variant: 'empty' | 'error'
  /** Nội dung hiển thị (mặc định theo variant nếu không truyền) */
  message?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    message: undefined,
  }
)

const displayMessage = computed(() => {
  if (props.message) return props.message
  return props.variant === 'empty' ? 'Không có dữ liệu' : 'Đã xảy ra lỗi'
})

const isError = computed(() => props.variant === 'error')
</script>

<template>
  <div
    class="flex flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white px-6 py-12 shadow-sm"
  >
    <component
      :is="isError ? AlertCircle : Inbox"
      :class="[
        'mb-3 h-12 w-12',
        isError ? 'text-red-400' : 'text-gray-300',
      ]"
    />
    <p
      :class="[
        'text-center text-sm',
        isError ? 'text-red-600' : 'text-gray-500',
      ]"
    >
      {{ displayMessage }}
    </p>
    <slot />
  </div>
</template>
