<script setup lang="ts">
import { SidebarTrigger } from '../ui/sidebar'
</script>

<template>
  <header class="flex h-14 items-center gap-2 border-b px-4">
    <SidebarTrigger />
    <div class="flex flex-1 items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground text-sm"> Trang quản trị </span>
      </div>
      <!-- Chỗ này có thể thêm avatar user / nút actions sau -->
    </div>
  </header>
</template>
