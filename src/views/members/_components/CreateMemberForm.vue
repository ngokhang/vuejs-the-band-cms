<script setup lang="ts">
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { watch, computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AccountInfoSection from './AccountInfoSection.vue'
import AuthorizeMemberSection from './AuthorizeMemberSection.vue'
import PersonalInfoSection from './PersonalInfoSection.vue'
import { createMemberSchema, editMemberSchema } from '@/schema/createMemberSchema'
import { useMemberStore } from '@/stores/member'

type MemberFormValues = {
  username?: string
  password?: string
  email?: string
  phoneNumber?: string
  firstName?: string
  lastName?: string
  avatar?: File | string | null
  systemRoles?: string[]
  bandRoles?: string[]
}

const props = withDefaults(
  defineProps<{
    mode?: 'create' | 'edit'
    userId?: string
    initialValues?: MemberFormValues
  }>(),
  {
    mode: 'create',
  }
)

const validationSchema = computed(() =>
  props.mode === 'edit' ? editMemberSchema : createMemberSchema
)

const form = useForm({
  validationSchema,
  initialValues: {
    systemRoles: [],
    bandRoles: [],
  },
})

const memberStore = useMemberStore()
const { creating, updating } = storeToRefs(memberStore)
const router = useRouter()

watch(
  () => [props.mode, props.userId] as const,
  () => {
    if (props.initialValues && props.mode === 'edit') {
      form.resetForm({
        values: {
          systemRoles: [],
          bandRoles: [],
          ...props.initialValues,
        } as any,
      })
    }
  },
  { immediate: true }
)

const onSubmit = form.handleSubmit(async values => {
  try {
    const basePayload = {
      username: values.username!,
      email: values.email!,
      phoneNumber: values.phoneNumber!,
      firstName: values.firstName!,
      lastName: values.lastName!,
      avatar: values.avatar,
      systemRoles: values.systemRoles!,
      bandRoles: values.bandRoles!,
      ...(values.avatar instanceof File && { uploadAvatar: true }),
    }

    const response =
      props.mode === 'edit' && props.userId
        ? await memberStore.updateMember(props.userId, basePayload)
        : await memberStore.createMember({
            ...basePayload,
            password: values.password!,
          })

    if (response?.success !== false) {
      toast.success(
        props.mode === 'edit' ? 'Cập nhật thành viên thành công!' : 'Tạo thành viên thành công!'
      )
      await router.push({ name: 'members-list' })
    } else {
      toast.error(
        response?.message ||
          (props.mode === 'edit'
            ? 'Cập nhật thành viên không thành công!'
            : 'Tạo thành viên không thành công!')
      )
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Đã xảy ra lỗi khi tạo thành viên'
    toast.error(errorMessage)
  }
})
</script>

<template>
  <div class="flex min-h-fit justify-center bg-slate-50 p-6">
    <Card class="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle class="text-primary text-2xl font-bold">
          {{ props.mode === 'edit' ? 'Chỉnh sửa thành viên' : 'Tạo thành viên mới' }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form @submit="onSubmit">
          <fieldset :disabled="creating || updating" class="space-y-6 disabled:opacity-60">
            <AccountInfoSection :password-disabled="props.mode === 'edit'" />

            <Separator />

            <PersonalInfoSection />

            <Separator />

            <AuthorizeMemberSection />

            <div class="flex justify-end pt-4">
              <Button type="submit" size="lg" :disabled="creating || updating">
                <span v-if="creating || updating">Đang xử lý...</span>
                <span v-else>{{ props.mode === 'edit' ? 'Lưu thay đổi' : 'Tạo thành viên' }}</span>
              </Button>
            </div>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
