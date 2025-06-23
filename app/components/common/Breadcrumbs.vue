<template>
  <div class="flex gap-2">
    <NuxtLink
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb.label"
      :to="breadcrumb.to"
      class="flex items-center gap-2"
      :class="{ 'text-[#A6ADA5] underline': breadcrumb.to }"
    >
      {{ breadcrumb.label }}
      <ChevronRight v-if="index !== breadcrumbs.length - 1" class="w-4 h-4" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<
      {
        label: string;
        to: string | null;
      }[]
    >,
    required: true,
  },
});
</script>

<style scoped></style>
