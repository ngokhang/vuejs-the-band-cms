<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

withDefaults(
  defineProps<{
    /** Ở chế độ edit: password disabled, không required */
    passwordDisabled?: boolean
  }>(),
  { passwordDisabled: false }
)
</script>

<template>
  <div class="space-y-1">
    <h3 class="text-lg font-medium">Thông tin tài khoản</h3>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Tên đăng nhập <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder="Nhập tên đăng nhập" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input type="email" placeholder="example@band.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>
            Mật khẩu
            <span v-if="!passwordDisabled" class="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder="********"
              :disabled="passwordDisabled"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem>
          <FormLabel>Số điện thoại <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder="+84 901 234 567" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </div>
</template>
