<script setup>
import { useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import { computed } from 'vue'
import { Toaster } from '@/components/ui/sonner'
import ErrorLayout from './layouts/ErrorLayout.vue'

const route = useRoute()
const layouts = { AppLayout, AuthLayout, ErrorLayout }
const LayoutComponent = computed(() => layouts[route.meta.layout] || AppLayout)
</script>

<template>
  <component :is="LayoutComponent">
    <Toaster position="top-right" :rich-colors="true" /><router-view />
  </component>
</template>

<style scoped></style>
