<template>
  <section class="px-6 max-w-7xl mx-auto mt-10">
    <Breadcrumbs class="mb-8" :breadcrumbs="breadcrumbs" />

    <div class="flex justify-end mb-4">
      <Select>
        <SelectTrigger class="cursor-pointer rounded-none max-w-[200px] w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent class="rounded-none">
          <SelectItem class="rounded-none cursor-pointer" value="apple">
            Apple
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="flex gap-20 mb-8">
      <CatalogFilter class="max-w-[255px] w-full" />
      <div class="grid grid-cols-3 gap-x-5 gap-y-10 w-full">
        <CatalogProduct
          v-for="product in productsStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <Pagination class="w-full" />
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/useProductsStore";
import CatalogFilter from "~/components/catalog/CatalogFilter.vue";
import CatalogProduct from "~/components/catalog/CatalogProduct.vue";
import Pagination from "~/components/common/Pagination.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Breadcrumbs from "~/components/common/Breadcrumbs.vue";

const productsStore = useProductsStore();

const breadcrumbs = [
  { label: "Головна", to: "/" },
  { label: "Магазин", to: null },
];

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>

<style scoped></style>
