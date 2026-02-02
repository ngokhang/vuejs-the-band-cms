<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    localValue.value = newValue
  }
)

const debouncedEmit = useDebounceFn((value: string) => {
  emit('update:modelValue', value)
}, 500)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  localValue.value = target.value
  debouncedEmit(target.value)
}
</script>

<template>
  <div class="relative">
    <Search class="absolute top-1.5 left-3 h-5 w-5 text-gray-400" />
    <Input
      v-model="localValue"
      type="text"
      placeholder="Tìm kiếm theo tên, SĐT, email..."
      class="h-full w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-emerald-500 focus:outline-none"
      @input="handleInput"
    />
  </div>
</template>
