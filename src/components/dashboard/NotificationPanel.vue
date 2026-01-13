<script setup lang="ts">
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
  Bell,
  Zap,
  Clock,
} from "lucide-vue-next";
import { ref } from "vue";

interface Notification {
  id: number;
  type: "critical" | "warning" | "info";
  priority: "high" | "medium" | "low";
  title: string;
  message: string;
  time: string;
  action?: {
    label: string;
    href?: string;
  };
}

const notifications = ref<Notification[]>([
  {
    id: 1,
    type: "critical",
    priority: "high",
    title: "⚠️ Vé concert sắp hết",
    message: 'Sản phẩm "Vé concert" chỉ còn 5 vé. Cần bổ sung kho ngay',
    time: "5 phút trước",
    action: { label: "Bổ sung kho", href: "#" },
  },
  {
    id: 2,
    type: "critical",
    priority: "high",
    title: "🔴 Lỗi thanh toán",
    message: "Không thể kết nối với cổng thanh toán. 3 đơn hàng đang chờ",
    time: "10 phút trước",
    action: { label: "Xem chi tiết", href: "#" },
  },
  {
    id: 3,
    type: "warning",
    priority: "medium",
    title: "⚡ Doanh thu cao bất thường",
    message: "Doanh thu hôm nay tăng 150% so với ngày thường",
    time: "45 phút trước",
  },
  {
    id: 4,
    type: "info",
    priority: "low",
    title: "ℹ️ Cập nhật hệ thống",
    message: "Bảo trì hệ thống dự kiến vào 23:00 hôm nay",
    time: "1 giờ trước",
  },
]);

const dismissedNotifications = ref<number[]>([]);

const typeConfig = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertCircle,
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
    label: "Khẩn cấp",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: AlertTriangle,
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
    label: "Cảnh báo",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: Info,
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800",
    label: "Thông tin",
  },
};

const dismissNotification = (id: number) => {
  dismissedNotifications.value.push(id);
};

const filteredNotifications = () => {
  return notifications.value.filter((n) => !dismissedNotifications.value.includes(n.id));
};

const criticalCount = () => {
  return notifications.value.filter(
    (n) => n.type === "critical" && !dismissedNotifications.value.includes(n.id),
  ).length;
};
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <!-- Header -->
    <div class="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Bell class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Thông báo quan trọng</h3>
            <p class="text-xs text-gray-300">
              {{ filteredNotifications().length }} thông báo hoạt động
            </p>
          </div>
        </div>
        <div
          v-if="criticalCount() > 0"
          class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
        >
          {{ criticalCount() }}
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div v-if="filteredNotifications().length > 0" class="max-h-96 space-y-2 overflow-y-auto p-4">
      <div
        v-for="notification in filteredNotifications()"
        :key="notification.id"
        :class="[
          typeConfig[notification.type].bg,
          typeConfig[notification.type].border,
          'group relative rounded-lg border-l-4 p-4 transition-all duration-200 hover:shadow-md',
        ]"
      >
        <!-- Badge -->
        <div class="absolute top-4 right-4">
          <span
            :class="[
              typeConfig[notification.type].badge,
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            ]"
          >
            {{ typeConfig[notification.type].label }}
          </span>
        </div>

        <!-- Close Button -->
        <button
          @click="dismissNotification(notification.id)"
          class="absolute top-14 right-4 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200/30"
          :title="`Đóng thông báo ${notification.id}`"
        >
          <X class="h-4 w-4 text-gray-500" />
        </button>

        <!-- Content -->
        <div class="pr-16">
          <div class="flex items-start gap-3">
            <div class="mt-1 flex-shrink-0">
              <component
                :is="typeConfig[notification.type].icon"
                :class="['h-5 w-5', typeConfig[notification.type].text]"
              />
            </div>
            <div class="flex-1">
              <p :class="['font-semibold', typeConfig[notification.type].text]">
                {{ notification.title }}
              </p>
              <p class="mt-1 text-sm text-gray-700">{{ notification.message }}</p>

              <!-- Action Button -->
              <div class="mt-3 flex items-center justify-between">
                <div v-if="notification.action" class="flex gap-2">
                  <a
                    :href="notification.action.href"
                    :class="[
                      typeConfig[notification.type].text,
                      'inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/50',
                    ]"
                  >
                    {{ notification.action.label }}
                    <span class="ml-1">→</span>
                  </a>
                </div>
                <span class="flex items-center gap-1 text-xs text-gray-500">
                  <Clock class="h-3 w-3" />
                  {{ notification.time }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center px-6 py-12">
      <div class="mb-3 rounded-full bg-gray-100 p-3">
        <CheckCircle class="h-6 w-6 text-green-600" />
      </div>
      <p class="text-sm font-medium text-gray-900">Không có thông báo mới</p>
      <p class="text-xs text-gray-500">Mọi thứ đang hoạt động bình thường</p>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <button
        class="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
      >
        <span>Xem tất cả thông báo</span>
        <span class="ml-2">→</span>
      </button>
    </div>
  </div>
</template>
