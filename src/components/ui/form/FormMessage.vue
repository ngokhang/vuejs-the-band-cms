<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <p
    :id="formMessageId"
    data-slot="form-message"
    :class="cn('min-h-[1.25rem] text-sm', props.class)"
  >
    <ErrorMessage as="span" :name="toValue(name)" class="text-destructive" />
  </p>
</template>
