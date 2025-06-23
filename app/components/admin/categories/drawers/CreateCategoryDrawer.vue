<template>
  <Drawer v-model:open="isOpen">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Додати категорію</DrawerTitle>
          <DrawerDescription>
            <CategoryForm
              class="mt-4"
              :initial-values="{ name: '', pictureId: null, isActive: true }"
              @submit="onSubmit"
            />
          </DrawerDescription>
        </div>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { useCategoriesStore } from "~/stores/useCategoriesStore";
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
import CategoryForm from "../CategoryForm.vue";
import type { ICategoryPayload } from "~/types/categories";

const categoriesStore = useCategoriesStore();

const isOpen = ref(false);

const onSubmit = async (values: ICategoryPayload) => {
  try {
    await categoriesStore.createCategory(values);
    isOpen.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
