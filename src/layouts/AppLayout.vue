<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <SidebarComponent />

    <SidebarInset>
      <AppHeader />

      <main class="flex-1 p-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
