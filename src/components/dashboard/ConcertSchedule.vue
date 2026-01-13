<script setup lang="ts">
import FlexRender from "@/components/ui/FlexRender.vue";
import type { SortingState } from "@tanstack/vue-table";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { Calendar, ChevronRight, MapPin, Search } from "lucide-vue-next";
import { computed, h, ref } from "vue";

interface Concert {
  id: string;
  name: string;
  date: string;
  location: string;
  capacity: number;
  booked: number;
  status: "upcoming" | "ongoing" | "completed";
}

const concerts = ref<Concert[]>([
  {
    id: "1",
    name: "Rock Night 2024",
    date: "2024-02-15",
    location: "The Concert Hall",
    capacity: 500,
    booked: 420,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Jazz Festival",
    date: "2024-03-20",
    location: "Music Center",
    capacity: 800,
    booked: 650,
    status: "upcoming",
  },
  {
    id: "3",
    name: "Pop Stars Live",
    date: "2024-04-10",
    location: "Arena Stadium",
    capacity: 2000,
    booked: 1850,
    status: "upcoming",
  },
  {
    id: "4",
    name: "Classical Symphony",
    date: "2024-01-25",
    location: "Opera House",
    capacity: 600,
    booked: 580,
    status: "ongoing",
  },
  {
    id: "5",
    name: "Electronic Beats",
    date: "2024-01-20",
    location: "Club Night",
    capacity: 300,
    booked: 300,
    status: "completed",
  },
]);

const sorting = ref<SortingState>([]);
const globalFilter = ref("");

const columnHelper = createColumnHelper<Concert>();

const columns = [
  columnHelper.accessor("name", {
    header: () => h("span", { class: "font-semibold text-gray-900" }, "Tên sự kiện"),
    cell: (info) =>
      h("div", { class: "flex items-center gap-3" }, [
        h("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100" }, [
          h(Calendar, { class: "h-5 w-5 text-blue-600" }),
        ]),
        h("span", { class: "font-medium text-gray-900" }, info.getValue()),
      ]),
  }),
  columnHelper.accessor("date", {
    header: () => h("span", { class: "font-semibold text-gray-900" }, "Ngày diễn"),
    cell: (info) => {
      const date = new Date(info.getValue()).toLocaleDateString("vi-VN");
      return h("span", { class: "text-sm text-gray-600" }, date);
    },
  }),
  columnHelper.accessor("location", {
    header: () => h("span", { class: "font-semibold text-gray-900" }, "Địa điểm"),
    cell: (info) =>
      h("div", { class: "flex items-center gap-2 text-sm text-gray-600" }, [
        h(MapPin, { class: "h-4 w-4 text-gray-400" }),
        info.getValue(),
      ]),
  }),
  columnHelper.accessor("booked", {
    header: () => h("span", { class: "font-semibold text-gray-900" }, "Vé đã bán"),
    cell: (info) => {
      const concert = info.row.original;
      const percentage = Math.round((concert.booked / concert.capacity) * 100);
      return h("div", { class: "space-y-1" }, [
        h(
          "div",
          { class: "text-sm font-medium text-gray-900" },
          `${concert.booked}/${concert.capacity}`,
        ),
        h("div", { class: "h-2 w-24 rounded-full bg-gray-200" }, [
          h("div", {
            class: "h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600",
            style: { width: `${percentage}%` },
          }),
        ]),
      ]);
    },
  }),
  columnHelper.accessor("status", {
    header: () => h("span", { class: "font-semibold text-gray-900" }, "Trạng thái"),
    cell: (info) => {
      const status = info.getValue() as string;
      const statusConfig = {
        upcoming: { label: "Sắp tới", bg: "bg-yellow-100", text: "text-yellow-800" },
        ongoing: { label: "Đang diễn", bg: "bg-green-100", text: "text-green-800" },
        completed: { label: "Kết thúc", bg: "bg-gray-100", text: "text-gray-800" },
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      return h(
        "span",
        {
          class: `inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`,
        },
        config.label,
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => h("span"),
    cell: () =>
      h(
        "button",
        {
          class:
            "inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100",
        },
        [h(ChevronRight, { class: "h-5 w-5 text-gray-400" })],
      ),
  }),
];

const table = useVueTable({
  data: concerts.value,
  columns,
  state: {
    get sorting() {
      return sorting.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = typeof updater === "function" ? updater(globalFilter.value) : updater;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: (row, _columnId, filterValue) => {
    const name = row.original.name.toLowerCase();
    const location = row.original.location.toLowerCase();
    const filter = filterValue.toLowerCase();
    return name.includes(filter) || location.includes(filter);
  },
});

const filteredRows = computed(() => table.getRowModel().rows);
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Lịch diễn</h2>
      <p class="mt-1 text-sm text-gray-600">Quản lý và theo dõi tất cả các sự kiện diễn tập</p>
    </div>

    <!-- Search & Stats -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div class="relative md:col-span-2">
        <Search class="absolute top-3 left-3 h-5 w-5 text-gray-400" />
        <input
          v-model="globalFilter"
          type="text"
          placeholder="Tìm kiếm sự kiện hoặc địa điểm..."
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div class="rounded-lg bg-blue-50 p-4">
        <p class="text-xs text-gray-600">Sự kiện sắp tới</p>
        <p class="mt-1 text-2xl font-bold text-blue-600">
          {{ concerts.filter((c) => c.status === "upcoming").length }}
        </p>
      </div>

      <div class="rounded-lg bg-green-50 p-4">
        <p class="text-xs text-gray-600">Tổng vé bán</p>
        <p class="mt-1 text-2xl font-bold text-green-600">
          {{ concerts.reduce((sum, c) => sum + c.booked, 0) }}
        </p>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50">
            <th
              v-for="header in table.getHeaderGroups()[0]?.headers || []"
              :key="header.id"
              class="px-6 py-4 text-left"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="row in filteredRows" :key="row.id" class="transition-colors hover:bg-gray-50">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-6 py-4">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="filteredRows.length === 0"
        class="flex flex-col items-center justify-center px-6 py-12"
      >
        <Calendar class="mb-3 h-12 w-12 text-gray-300" />
        <p class="text-gray-500">Không tìm thấy sự kiện nào</p>
      </div>
    </div>

    <!-- Pagination Info -->
    <div
      class="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600"
    >
      <span>Hiển thị {{ filteredRows.length }} / {{ concerts.length }} sự kiện</span>
      <button class="inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700">
        Xem thêm
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
