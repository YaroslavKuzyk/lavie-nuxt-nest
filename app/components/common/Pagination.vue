<template>
  <Pagination
    v-slot="{ page }"
    :items-per-page="perPage"
    :total="total"
    :default-page="defaultPage"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious class="cursor-pointer" @click="paginationValue--" />

      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === page"
          class="cursor-pointer"
          @click="paginationValue = item.value"
        >
          {{ item.value }}
        </PaginationItem>
      </template>

      <PaginationEllipsis :index="4" />

      <PaginationNext class="cursor-pointer" @click="paginationValue++" />
    </PaginationContent>
  </Pagination>
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
  total: number;
  page: number;
  perPage: number;
  defaultPage?: number;
  modelValue: number;
}

interface IEmit {
  (e: "update:modelValue", value: number): void;
}

const props = withDefaults(defineProps<IProps>(), {
  defaultPage: 1,
});

const emit = defineEmits<IEmit>();

const paginationValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
