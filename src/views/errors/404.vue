<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Home, SearchIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

const router = useRouter()
const route = useRoute()

const q = ref('')

const goHome = () => router.push('/')
const goBack = () => router.back()

const onSearch = () => {
  const target = q.value.trim()
  if (!target) return
  router.push(target.startsWith('/') ? target : `/${target}`)
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
    <Empty class="w-full max-w-2xl">
      <EmptyHeader>
        <EmptyTitle class="text-4xl">404 - Not Found</EmptyTitle>
        <EmptyDescription> Trang bạn tìm không tồn tại hoặc đã bị di chuyển. </EmptyDescription>

        <div class="text-muted-foreground mt-3 text-sm">
          Đường dẫn:
          <Kbd class="ml-2">{{ route.fullPath }}</Kbd>
        </div>
      </EmptyHeader>

      <EmptyContent class="space-y-5">
        <div class="flex flex-col gap-2 sm:flex-row">
          <Button @click="goHome">
            <Home class="mr-2 h-4 w-4" />
            Về trang chủ
          </Button>

          <Button variant="outline" @click="goBack">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </div>

        <div>
          <InputGroup class="sm:w-3/4">
            <InputGroupInput
              v-model="q"
              placeholder="Thử nhập đường dẫn khác (ví dụ: /posts)"
              @keyup.enter="onSearch"
            />
            <InputGroupAddon class="cursor-pointer" @click="onSearch">
              <SearchIcon class="h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>

          <EmptyDescription class="mt-2">
            Gợi ý: kiểm tra chính tả hoặc dùng menu để điều hướng.
          </EmptyDescription>
        </div>
      </EmptyContent>
    </Empty>
  </div>
</template>
