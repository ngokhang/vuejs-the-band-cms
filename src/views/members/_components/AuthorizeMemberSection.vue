<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import MultiSelect from '@/components/common/MultiSelect.vue'
import { bandRolesList, systemRolesList } from '@/types/constants'
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Phân quyền & Vai trò</h3>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <FormField v-slot="{ value, handleChange }" name="systemRoles">
        <FormItem class="flex flex-col">
          <FormLabel>Vai trò hệ thống <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <MultiSelect
              :options="systemRolesList"
              :model-value="(value as string[]) || []"
              @update:model-value="handleChange"
              placeholder="Chọn vai trò hệ thống..."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, handleChange }" name="bandRoles">
        <FormItem class="flex flex-col">
          <FormLabel>Vai trò trong ban nhạc <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <MultiSelect
              :options="bandRolesList"
              :model-value="(value as string[]) || []"
              @update:model-value="handleChange"
              placeholder="Chọn vị trí chơi nhạc..."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </div>
</template>
