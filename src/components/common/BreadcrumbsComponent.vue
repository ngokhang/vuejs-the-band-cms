<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { computed } from 'vue'

interface Props {
  class?: string
}

const PATH_NAME_MAP: Record<string, string> = {
  '/': 'Trang chủ',
  '/settings': 'Cài đặt',
  '/members': 'Thành viên',
  '/schedule': 'Lịch trình',
}

const props = defineProps<Props>()
const router = useRouter()
const path = computed(() => router.currentRoute.value.path)
const segments = computed(() => path.value.split('/').filter(Boolean))
</script>

<template>
  <Breadcrumb :class="props.class">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink to="/">
          <BreadcrumbPage class="font-semibold">Trang chủ</BreadcrumbPage>
        </BreadcrumbLink>
        <BreadcrumbSeparator v-show="path !== '/'" />
      </BreadcrumbItem>

      <BreadcrumbItem v-if="path !== '/'">
        <BreadcrumbLink :to="path">
          <BreadcrumbPage class="font-semibold">
            {{ PATH_NAME_MAP[path] || 'Không xác định' }}
          </BreadcrumbPage>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem v-else-if="segments.length >= 2" v-for="segment in segments" :key="segment">
        <BreadcrumbLink :to="`/${segment}`">
          <BreadcrumbPage class="font-semibold">
            {{ PATH_NAME_MAP[`/${segment}`] || 'Không xác định' }}
          </BreadcrumbPage>
        </BreadcrumbLink>
        <BreadcrumbSeparator v-if="segment !== segments[segments.length - 1]" />
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
