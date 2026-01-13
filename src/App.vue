<script setup>
import { useRoute } from "vue-router";
import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import { computed } from "vue";
import { Toaster } from "vue-sonner";

const route = useRoute();
const layouts = { AppLayout, AuthLayout };
const LayoutComponent = computed(() => layouts[route.meta.layout] || AppLayout);
</script>

<template>
  <component :is="LayoutComponent">
    <router-view />
  </component>
  <Toaster />
</template>

<style scoped></style>
