<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Thông tin tài khoản</h3>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input placeholder="user123" v-bind="componentField" />
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

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Mật khẩu <span class="text-red-500">*</span></FormLabel>
          <FormControl>
            <Input type="password" placeholder="********" v-bind="componentField" />
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
