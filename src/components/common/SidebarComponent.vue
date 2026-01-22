<script setup lang="ts">
import { LayoutDashboard, Users, CalendarDays, Image, Settings, LogOut } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

const mainMenuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: { path: '/' },
  },
  {
    label: 'Thành viên',
    icon: Users,
    to: { path: '/members' },
  },
  {
    label: 'Lịch diễn',
    icon: CalendarDays,
    to: { path: '/schedule' },
  },
  {
    label: 'Quản lý nội dung website',
    icon: Image,
    to: { path: '/media' },
  },
  {
    label: 'Cài đặt',
    icon: Settings,
    to: { path: '/settings' },
  },
]
</script>

<template>
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
              <SidebarMenuButton
                :as="RouterLink"
                :to="item.to.path"
                :tooltip="item.label"
                class="cursor-pointer"
              >
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
        class="group/data-[collapsible=icon] focus:ring-red -500 flex w-full max-w-[240px] cursor-pointer justify-center bg-gray-600 p-0 group-data-[collapsible=icon]:w-12! group-data-[collapsible=icon]:px-3! hover:bg-red-700"
      >
        <LogOut class="text-white" />
        <span class="text-white group-data-[collapsible=icon]:hidden">Đăng xuất</span>
      </SidebarMenuButton>
    </SidebarFooter>
  </Sidebar>
</template>
