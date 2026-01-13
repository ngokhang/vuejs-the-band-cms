<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, CalendarDays, Image, Settings, LogOut } from "lucide-vue-next";

const mainMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: { name: "home" },
  },
  {
    label: "Thành viên",
    icon: Users,
    to: { path: "/members" },
  },
  {
    label: "Lịch diễn",
    icon: CalendarDays,
    to: { path: "/schedule" },
  },
  {
    label: "Media",
    icon: Image,
    to: { path: "/media" },
  },
  {
    label: "Setting",
    icon: Settings,
    to: { path: "/settings" },
  },
];
</script>

<template>
  <SidebarProvider>
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div class="flex items-center gap-2 px-2">
          <span
            class="bg-primary text-primary-foreground inline-flex size-8 items-center justify-center rounded-lg text-xs font-bold"
          >
            TM
          </span>
          <span
            class="leading-tight font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden"
          >
            CMS The Band
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel as="div"> Điều hướng </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in mainMenuItems"
                :key="item.label"
                class="flex justify-center"
              >
                <SidebarMenuButton as="RouterLink" :to="item.to" :tooltip="item.label">
                  <component :is="item.icon" class="text-sidebar-foreground/80" />
                  <span class="group-data-[collapsible=icon]:hidden">
                    {{ item.label }}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter class="flex w-full justify-center">
        <SidebarMenuButton
          as="button"
          variant="outline"
          size="lg"
          tooltip="Đăng xuất"
          class="group/data-[collapsible=icon] flex w-full max-w-[240px] cursor-pointer justify-center bg-red-600 p-0 group-data-[collapsible=icon]:w-12! group-data-[collapsible=icon]:px-3! hover:bg-red-700 focus:ring-red-500"
        >
          <LogOut class="text-white" />
          <span class="text-white group-data-[collapsible=icon]:hidden">Đăng xuất</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>

    <SidebarInset>
      <header class="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div class="flex flex-1 items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground text-sm"> Trang quản trị </span>
          </div>
          <!-- Chỗ này có thể thêm avatar user / nút actions sau -->
        </div>
      </header>

      <main class="flex-1 p-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
