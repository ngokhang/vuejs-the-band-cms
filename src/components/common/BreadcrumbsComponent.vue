<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { BREADCRUMB_ROUTES, type AppRouteName } from '@/types/constants'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const router = useRouter()

const currentRoute = computed(() => router.currentRoute.value)

const currentBreadcrumb = computed(() => {
  const name = currentRoute.value.name as AppRouteName | undefined
  if (!name || name === 'home') return null
  return BREADCRUMB_ROUTES[name] ?? null
})
</script>

<template>
  <Breadcrumb :class="props.class">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink :to="BREADCRUMB_ROUTES.home.path">
          <BreadcrumbPage class="font-semibold">
            {{ BREADCRUMB_ROUTES.home.label }}
          </BreadcrumbPage>
        </BreadcrumbLink>
        <BreadcrumbSeparator v-if="currentBreadcrumb" />
      </BreadcrumbItem>

      <BreadcrumbItem v-if="currentBreadcrumb">
        <BreadcrumbLink :to="currentBreadcrumb.path">
          <BreadcrumbPage class="font-semibold">
            {{ currentBreadcrumb.label }}
          </BreadcrumbPage>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
