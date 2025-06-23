<template>
  <nuxt-link class="relative z-1" :to="`/catalog/${product.id}`">
    <Toggle
      @click.prevent
      aria-label="Toggle italic"
      variant="outline"
      class="cursor-pointer rounded-full bg-[#E9E4E1] text-[#A6ADA5] data-[state=on]:bg-red-400 data-[state=on]:text-[#E9E4E1] hover:bg-[#E9E4E1] hover:text-[#A6ADA5] absolute top-2 right-2 z-10"
    >
      <HeartPlus />
    </Toggle>

    <div class="absolute-border">
      <img
        :src="product.images[0].url"
        :alt="product.name"
        class="w-full h-[370px] object-cover"
      />
    </div>

    <div class="text-sm font-regular text-[#585757] mt-2">LA VIE</div>
    <p class="text-md font-regular">{{ product.name }}</p>
    <div class="flex items-center gap-2">
      <span v-if="product.discount" class="text-md font-regular"
        >{{ product.discount }}грн</span
      >
      <span
        :class="{ 'line-through text-[#A6ADA5]': product.discount }"
        class="text-md font-regular"
        >{{ product.price }}грн</span
      >
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import { HeartPlus } from "lucide-vue-next";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
