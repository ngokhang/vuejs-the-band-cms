<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

import CreateMemberFormSkeleton from '@/components/common/CreateMemberFormSkeleton.vue'
import CreateMemberForm from '@/views/members/_components/CreateMemberForm.vue'
import { useMemberQuery } from '@/composables/members/useMemberQuery'

const route = useRoute()
const userId = computed(() => String(route.params.id || ''))

const { data: currentUser, isLoading, isError, error } = useMemberQuery(userId)

watch(isError, failed => {
  if (failed && error.value) {
    const msg =
      error.value instanceof Error ? error.value.message : 'Không thể tải thông tin thành viên'
    toast.error(msg)
  }
})
</script>

<template>
  <CreateMemberFormSkeleton v-if="isLoading" />

  <CreateMemberForm
    v-else-if="currentUser"
    mode="edit"
    :user-id="userId"
    :initial-values="{
      username: currentUser.username,
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      avatar: currentUser.avatar ?? null,
      systemRoles: currentUser.systemRoles,
      bandRoles: currentUser.bandRoles ?? [],
    }"
  />

  <div v-else class="text-muted-foreground py-10 text-center text-sm">
    Không tìm thấy thành viên.
  </div>
</template>
