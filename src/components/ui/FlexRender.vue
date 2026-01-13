<script setup lang="ts">
import { computed } from "vue";

interface Props {
  render: any;
  props: any;
}

const props = defineProps<Props>();

const content = computed(() => {
  const render = props.render;
  if (typeof render === "function") {
    return render(props.props);
  }
  return render;
});
</script>

<template>
  <component :is="content" />
</template>
