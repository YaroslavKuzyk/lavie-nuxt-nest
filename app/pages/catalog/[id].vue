<template>
  <section class="px-6 max-w-7xl mx-auto mt-10">
    <Breadcrumbs class="mb-8" :breadcrumbs="breadcrumbs" />

    <div v-if="getProduct" class="flex gap-8">
      <ProductCarousel :images="getProduct.images" />
      <div>
        <h1 class="text-[24px] font-semibold mb-4">{{ getProduct.name }}</h1>
        <div class="flex items-center gap-8 mb-4">
          <span v-if="getProduct.discount" class="text-[24px] font-semibold"
            >{{ getProduct.discount }}грн</span
          >
          <span
            :class="{ 'line-through text-[#A6ADA5]': getProduct.discount }"
            class="text-[24px] font-semibold"
            >{{ getProduct.price }}грн</span
          >
        </div>

        <div class="max-w-[300px] mb-4">
          <div class="flex justify-between mb-1">
            <span class="text-[#585757]">Розмір</span>
            <NuxtLink class="text-[#585757] underline text-sm" to="/size"
              >Таблиця розмірів</NuxtLink
            >
          </div>
          <Select>
            <SelectTrigger
              class="cursor-pointer rounded-none max-w-[300px] w-full"
            >
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent class="rounded-none">
              <SelectItem class="rounded-none cursor-pointer" value="apple">
                Apple
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="max-w-[300px] mb-4">
          <div class="flex mb-1">
            <span class="text-[#585757]">Колір</span>
          </div>
          <Select>
            <SelectTrigger
              class="cursor-pointer rounded-none max-w-[300px] w-full"
            >
              <SelectValue placeholder="Select a fruit" />
              <div
                variant="outline"
                class="flex items-center gap-2 cursor-pointer rounded-sm"
              >
                <div class="w-6 h-6 border bg-[#fff] rounded-full"></div>
                Помаранчевий
              </div>
            </SelectTrigger>
            <SelectContent class="rounded-none">
              <SelectItem class="rounded-none cursor-pointer" value="apple">
                <div
                  variant="outline"
                  class="flex items-center gap-2 cursor-pointer rounded-sm"
                >
                  <div class="w-6 h-6 border bg-[#fff] rounded-full"></div>
                  Помаранчевий
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          class="max-w-[300px] w-full py-1.5 bg-[#A6ADA5] text-[#fff] cursor-pointer mb-8 hover:bg-[#A6ADA5]/80 transition-all duration-300"
        >
          Додати до кошика
        </button>

        <div v-html="getProduct.description" class="text-sm"></div>
      </div>
    </div>

    <div v-if="productsStore.products.length" class="mt-20">
      <Carousel>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-[20px]">Вам може сподобатися</h2>
          <div class="flex gap-2">
            <CarouselPrevious
              class="static translate-0 cursor-pointer rounded-none"
            />
            <CarouselNext
              class="static translate-0 cursor-pointer rounded-none"
            />
          </div>
        </div>
        <CarouselContent>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[0]" />
          </CarouselItem>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[1]" />
          </CarouselItem>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[2]" />
          </CarouselItem>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[3]" />
          </CarouselItem>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[0]" />
          </CarouselItem>
          <CarouselItem class="basis-1/4">
            <CatalogProduct :product="productsStore.products[1]" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from "@/stores/useProductsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Breadcrumbs from "~/components/common/Breadcrumbs.vue";
import ProductCarousel from "~/components/product/ProductCarousel.vue";

const productsStore = useProductsStore();

const breadcrumbs = [
  { label: "Головна", to: "/" },
  { label: "Магазин", to: "/catalog" },
  { label: "Мереживний комплект Aruba L2112 / L2114 (без пояса)", to: null },
];

const getProduct = computed(() => {
  return productsStore.product;
});

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>

<style scoped></style>
