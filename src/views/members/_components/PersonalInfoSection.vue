<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AvatarUpload from '@/components/common/AvatarUpload.vue'
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Thông tin cá nhân</h3>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="col-span-1 flex flex-col items-center gap-3">
        <FormField v-slot="{ value, handleChange }" name="avatar">
          <FormItem class="w-full">
            <FormLabel>Avatar</FormLabel>
            <FormControl>
              <AvatarUpload
                :model-value="value as File | null"
                @update:model-value="handleChange"
              />
            </FormControl>
            <FormMessage class="text-center" />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-1 grid grid-cols-1 gap-4 md:col-span-2">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>Họ (First Name) <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Nguyễn" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Tên (Last Name) <span class="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input placeholder="Văn A" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
  </div>
</template>
