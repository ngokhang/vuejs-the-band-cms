<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div class="flex min-h-fit justify-center bg-slate-50 p-6">
    <Card class="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <Skeleton class="h-8 w-64" />
      </CardHeader>

      <CardContent>
        <div class="space-y-6">
          <!-- Account Info Section -->
          <div class="space-y-1">
            <Skeleton class="mb-4 h-6 w-48" />
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div class="space-y-2">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-10 w-full" />
              </div>
              <div class="space-y-2">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-10 w-full" />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div class="space-y-2">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-10 w-full" />
              </div>
              <div class="space-y-2">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="h-10 w-full" />
              </div>
            </div>
          </div>

          <Separator />

          <!-- Personal Info Section -->
          <div class="space-y-1">
            <Skeleton class="mb-4 h-6 w-48" />
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <!-- Avatar -->
              <div class="col-span-1 flex flex-col items-center gap-3">
                <Skeleton class="h-4 w-16" />
                <Skeleton class="h-32 w-32 rounded-full" />
              </div>
              <!-- Name fields -->
              <div class="col-span-1 grid grid-cols-1 gap-3 md:col-span-2">
                <div class="space-y-2">
                  <Skeleton class="h-4 w-32" />
                  <Skeleton class="h-10 w-full" />
                </div>
                <div class="space-y-2">
                  <Skeleton class="h-4 w-32" />
                  <Skeleton class="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <!-- Authorize Member Section -->
          <div class="space-y-1">
            <Skeleton class="mb-4 h-6 w-48" />
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <Skeleton class="h-4 w-40" />
                <Skeleton class="h-10 w-full" />
              </div>
              <div class="space-y-2">
                <Skeleton class="h-4 w-40" />
                <Skeleton class="h-10 w-full" />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <Skeleton class="h-11 w-40" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
