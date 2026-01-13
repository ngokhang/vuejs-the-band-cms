<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  change?: number
  icon: any
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
}

withDefaults(defineProps<Props>(), {
  color: 'blue',
})

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  purple: 'bg-purple-100 text-purple-600',
}
</script>

<template>
  <div class="rounded-lg border bg-white p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="mt-2 text-2xl font-bold text-gray-900">{{ value }}</p>
        <p v-if="change !== undefined" class="mt-2 text-sm" :class="change > 0 ? 'text-green-600' : 'text-red-600'">
          <span class="font-semibold">{{ change > 0 ? '+' : '' }}{{ change }}%</span> so với tuần trước
        </p>
      </div>
      <div :class="[colorClasses[color], 'rounded-lg p-3']">
        <component :is="icon" class="h-6 w-6" />
      </div>
    </div>
  </div>
</template>
