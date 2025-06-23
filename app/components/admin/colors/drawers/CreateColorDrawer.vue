<template>
  <Drawer v-model:open="isOpen">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Додати колір</DrawerTitle>
          <DrawerDescription>
            <ColorForm
              :initial-values="{ name: '', value: '' }"
              @submit="onSubmit"
            />
          </DrawerDescription>
        </div>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { useColorsStore } from "~/stores/useColorsStore";
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
import ColorForm from "../ColorForm.vue";

const colorsStore = useColorsStore();

const isOpen = ref(false);

const onSubmit = async (values: { name: string; value: string }) => {
  try {
    await colorsStore.createColor(values);
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
