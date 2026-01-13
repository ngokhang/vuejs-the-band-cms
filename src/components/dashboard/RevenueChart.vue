<script setup lang="ts">
import { TrendingUp, Calendar } from "lucide-vue-next";

const revenueData = [
  { month: "T1", revenue: 4200 },
  { month: "T2", revenue: 3800 },
  { month: "T3", revenue: 5100 },
  { month: "T4", revenue: 4500 },
  { month: "T5", revenue: 6200 },
  { month: "T6", revenue: 5800 },
  { month: "T7", revenue: 6900 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
const avgRevenue = Math.round(totalRevenue / revenueData.length);
</script>

<template>
  <div class="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-bold text-gray-900">Doanh thu</h3>
        <p class="text-sm text-gray-500">Biểu đồ doanh thu 7 tháng gần nhất</p>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
        <TrendingUp class="h-4 w-4 text-blue-600" />
        <span class="text-sm font-semibold text-blue-600">↑ 12.5%</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="mb-6 grid grid-cols-2 gap-4">
      <div class="rounded-lg bg-gray-50 p-3">
        <p class="text-xs text-gray-500">Tổng doanh thu</p>
        <p class="mt-1 text-lg font-bold text-gray-900">${{ (totalRevenue / 1000).toFixed(1) }}K</p>
      </div>
      <div class="rounded-lg bg-gray-50 p-3">
        <p class="text-xs text-gray-500">Bình quân tháng</p>
        <p class="mt-1 text-lg font-bold text-gray-900">${{ (avgRevenue / 1000).toFixed(1) }}K</p>
      </div>
    </div>

    <!-- Chart -->
    <div class="flex h-48 items-end justify-between gap-3">
      <div
        v-for="item in revenueData"
        :key="item.month"
        class="flex flex-1 flex-col items-center gap-2"
      >
        <div
          class="relative h-40 w-full rounded-t-lg bg-gradient-to-t from-blue-400 to-blue-500 transition-all hover:shadow-lg"
          :style="{ height: `${(item.revenue / maxRevenue) * 160}px` }"
        />
        <span class="text-xs font-medium text-gray-700">{{ item.month }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 border-t border-gray-200 pt-4">
      <button
        class="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <Calendar class="h-4 w-4" />
        Xem chi tiết
      </button>
    </div>
  </div>
</template>
