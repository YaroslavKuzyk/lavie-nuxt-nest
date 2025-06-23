<template>
  <Drawer v-model:open="isOpen">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Додати розмір</DrawerTitle>
          <DrawerDescription>
            <SizeForm :initial-values="{ name: '' }" @submit="onSubmit" />
          </DrawerDescription>
        </div>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { useSizesStore } from "~/stores/useSizesStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SizeForm from "../SizeForm.vue";

const sizesStore = useSizesStore();

const isOpen = ref(false);

const onSubmit = async (values: { name: string }) => {
  try {
    await sizesStore.createSize(values);
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
