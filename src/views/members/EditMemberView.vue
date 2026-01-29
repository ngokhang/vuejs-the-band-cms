<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'

import LoadingBlock from '@/components/common/LoadingBlock.vue'
import CreateMemberForm from '@/views/members/_components/CreateMemberForm.vue'
import { useMemberStore } from '@/stores/member'

const route = useRoute()
const memberStore = useMemberStore()
const { fetching, currentUser } = storeToRefs(memberStore)

const userId = computed(() => String(route.params.id || ''))

onMounted(async () => {
  try {
    await memberStore.fetchMemberById(userId.value)
  } catch (e: any) {
    toast.error(e?.message || 'Không thể tải thông tin thành viên')
  }
})
</script>

<template>
  <LoadingBlock v-if="fetching" label="Đang tải thông tin thành viên..." />

  <CreateMemberForm
    v-else-if="currentUser"
    mode="edit"
    :user-id="userId"
    :initial-values="{
      username: currentUser.username,
      // Không prefill password
      email: currentUser.email,
      phoneNumber: currentUser.phoneNumber,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      bandRoles: currentUser.bandRoles,
      userRoles: currentUser.systemRoles,
    }"
  />

  <div v-else class="text-muted-foreground py-10 text-center text-sm">
    Không tìm thấy thành viên.
  </div>
</template>
