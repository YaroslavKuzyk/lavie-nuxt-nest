<template>
  <div class="flex gap-4">
    <Carousel
      class="relative w-full max-w-[80px] max-h-[450px] overflow-y-auto"
      orientation="vertical"
      @init-api="(val) => (emblaThumbnailApi = val)"
    >
      <CarouselContent class="">
        <CarouselItem
          v-for="(item, index) in images"
          :key="index"
          class="pl-0 basis-1/4 cursor-pointer w-[80px] h-[80px] rounded-sm"
          @click="onThumbClick(index)"
        >
          <div :class="index === selectedIndex ? '' : 'opacity-70'">
            <div>
              <div class="aspect-square w-full">
                <img
                  :src="item.url"
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Carousel
      class="relative w-full max-w-[450px]"
      @init-api="(val) => (emblaMainApi = val)"
    >
      <CarouselContent>
        <CarouselItem v-for="(item, index) in images" :key="index">
          <div>
            <div>
              <div class="aspect-square flex justify-center items-center">
                <img :src="item.url" alt="" class="h-full" />
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { watchOnce } from "@vueuse/core";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

const props = defineProps({
  images: {
    type: Array as PropType<
      {
        id: number;
        url: string;
      }[]
    >,
    required: true,
  },
});

const emblaMainApi = ref();
const emblaThumbnailApi = ref();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>

<style scoped></style>
