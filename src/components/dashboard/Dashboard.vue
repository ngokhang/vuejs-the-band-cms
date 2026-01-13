<script setup lang="ts">
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-vue-next";
import StatisticsCard from "./StatisticsCard.vue";
import RevenueChart from "./RevenueChart.vue";
import NotificationPanel from "./NotificationPanel.vue";
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">
        Chào mừng trở lại! Dưới đây là tổng quan về hoạt động của bạn
      </p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatisticsCard
        title="Tổng doanh thu"
        value="$12,500"
        :change="12.5"
        :icon="DollarSign"
        color="blue"
      />
      <StatisticsCard
        title="Thu nhập hôm nay"
        value="$2,150"
        :change="8.2"
        :icon="TrendingUp"
        color="green"
      />
      <StatisticsCard
        title="Tổng thành viên"
        value="1,234"
        :change="5.4"
        :icon="Users"
        color="purple"
      />
      <StatisticsCard
        title="Sự kiện sắp tới"
        value="8"
        :change="-2.1"
        :icon="Calendar"
        color="yellow"
      />
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2">
        <RevenueChart />
      </div>

      <!-- Notifications -->
      <div>
        <NotificationPanel />
      </div>
    </div>

    <!-- Additional Stats -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="rounded-lg border bg-white p-6">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Thu nhập theo loại</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Vé concert</span>
            <span class="text-sm font-semibold text-gray-900">$5,200</span>
          </div>
          <div class="h-2 rounded-full bg-gray-200">
            <div class="h-2 w-3/5 rounded-full bg-blue-500" />
          </div>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-gray-600">Đặc biệt VIP</span>
            <span class="text-sm font-semibold text-gray-900">$4,800</span>
          </div>
          <div class="h-2 rounded-full bg-gray-200">
            <div class="h-2 w-1/2 rounded-full bg-green-500" />
          </div>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-sm text-gray-600">Sponsorship</span>
            <span class="text-sm font-semibold text-gray-900">$2,500</span>
          </div>
          <div class="h-2 rounded-full bg-gray-200">
            <div class="h-2 w-1/4 rounded-full bg-purple-500" />
          </div>
        </div>
      </div>

      <div class="rounded-lg border bg-white p-6">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
        <div class="space-y-4">
          <div class="border-l-2 border-blue-500 pl-4">
            <p class="text-sm font-medium text-gray-900">Đơn hàng mới #2024001</p>
            <p class="text-xs text-gray-500">10 phút trước</p>
          </div>
          <div class="border-l-2 border-green-500 pl-4">
            <p class="text-sm font-medium text-gray-900">Thành viên mới đăng ký</p>
            <p class="text-xs text-gray-500">1 giờ trước</p>
          </div>
          <div class="border-l-2 border-purple-500 pl-4">
            <p class="text-sm font-medium text-gray-900">Cập nhật hồ sơ</p>
            <p class="text-xs text-gray-500">2 giờ trước</p>
          </div>
          <div class="border-l-2 border-yellow-500 pl-4">
            <p class="text-sm font-medium text-gray-900">Khách hàng đánh giá mới</p>
            <p class="text-xs text-gray-500">3 giờ trước</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
