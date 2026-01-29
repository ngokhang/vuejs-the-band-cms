<script setup lang="ts">
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[]
  modelValue: string[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Chọn...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const open = ref(false)
const searchQuery = ref('')

const selectedOptions = computed(() =>
  props.options.filter(opt => props.modelValue.includes(opt.value))
)

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  return props.options.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleOption = (value: string) => {
  const newValue = props.modelValue.includes(value)
    ? props.modelValue.filter(v => v !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', newValue)
}

const removeOption = (value: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter(v => v !== value)
  )
}

const clearAll = () => {
  emit('update:modelValue', [])
}
</script>

<template>
  <div class="relative">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <button
          type="button"
          role="combobox"
          :aria-expanded="open"
          class="flex min-h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm transition-colors hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div class="flex flex-1 flex-wrap gap-1.5">
            <!-- Selected items as badges inside input -->
            <template v-if="selectedOptions.length > 0">
              <Badge
                v-for="option in selectedOptions"
                :key="option.value"
                variant="secondary"
                class="gap-1 bg-slate-900 pr-1 font-medium text-white hover:bg-slate-800"
              >
                {{ option.label }}
                <button
                  @click.stop="removeOption(option.value)"
                  class="ml-1 rounded-sm p-0.5 transition-colors hover:bg-slate-700"
                  type="button"
                >
                  <X class="h-3 w-3" />
                </button>
              </Badge>
            </template>
            <!-- Placeholder when nothing selected -->
            <span v-else class="text-slate-500">
              {{ placeholder }}
            </span>
          </div>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent class="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput
            v-model="searchQuery"
            placeholder="Tìm kiếm..."
            class="border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="option in filteredOptions"
                :key="option.value"
                :value="option.value"
                @select="toggleOption(option.value)"
                class="cursor-pointer"
              >
                <div
                  :class="
                    cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-900',
                      modelValue.includes(option.value)
                        ? 'bg-slate-900 text-white'
                        : 'opacity-50 [&_svg]:invisible'
                    )
                  "
                >
                  <Check class="h-3 w-3" />
                </div>
                <span>{{ option.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <!-- Clear all button -->
          <div v-if="modelValue.length > 0" class="border-t p-2">
            <button
              type="button"
              @click="clearAll"
              class="w-full rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
            >
              Xóa tất cả
            </button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
