<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AccountInfoSection from './AccountInfoSection.vue'
import AuthorizeMemberSection from './AuthorizeMemberSection.vue'
import PersonalInfoSection from './PersonalInfoSection.vue'
import { createMemberSchema } from '@/schema/createMemberSchema'

const form = useForm({
  validationSchema: createMemberSchema,
  initialValues: {
    systemRoles: [],
    bandRoles: [],
  },
})

const isSubmitting = ref(false)

const onSubmit = form.handleSubmit(async values => {
  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  const payload = {
    username: values.username,
    password: values.password,
    email: values.email,
    phoneNumber: values.phoneNumber,
    firstName: values.firstName,
    lastName: values.lastName,
    avatar: values.avatar,
    systemRoles: values.systemRoles,
    bandRoles: values.bandRoles,
  }

  console.log('🚀 SUBMIT PAYLOAD:', payload)
  alert('Tạo thành viên thành công! (Kiểm tra console log)')

  isSubmitting.value = false
})
</script>

<template>
  <div class="flex min-h-screen justify-center bg-slate-50 p-6">
    <Card class="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle class="text-primary text-2xl font-bold">Tạo thành viên mới</CardTitle>
      </CardHeader>

      <CardContent>
        <form @submit="onSubmit" class="space-y-6">
          <AccountInfoSection />

          <Separator />

          <PersonalInfoSection />

          <Separator />

          <AuthorizeMemberSection />

          <div class="flex justify-end pt-4">
            <Button type="submit" size="lg" :disabled="isSubmitting">
              <span v-if="isSubmitting">Đang xử lý...</span>
              <span v-else>Tạo thành viên</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
