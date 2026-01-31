<script setup lang="ts">
import { Spinner } from '@/components/ui/spinner'

withDefaults(
  defineProps<{
    label?: string
    class?: string
  }>(),
  {
    label: 'Đang tải...',
  }
)
</script>

<template>
  <div
    :class="[
      'text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm',
      $props.class,
    ]"
  >
    <Spinner class="size-5" />
    <span>{{ label }}</span>
  </div>
</template>
