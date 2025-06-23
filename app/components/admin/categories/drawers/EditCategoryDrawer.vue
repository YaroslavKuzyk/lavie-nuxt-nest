<template>
  <Drawer v-model:open="openValue">
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Редагувати категорію</DrawerTitle>
          <DrawerDescription>
            <CategoryForm
              class="mt-4"
              v-if="!isLoading"
              :initial-values="initialValues"
              :picture-preview="picturePreview"
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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import CategoryForm from "../CategoryForm.vue";
import type { ICategoryPayload } from "~/types/categories";

const props = defineProps<{
  id: number;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const isLoading = ref(false);

const categoriesStore = useCategoriesStore();
const openValue = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});
const initialValues = ref<ICategoryPayload>({
  name: "",
  pictureId: null,
  isActive: true,
});

const picturePreview = ref<string | null>(null);

watch(
  () => openValue.value,
  () => {
    if (openValue.value) {
      fetchCategory();
    }
  },
  { immediate: true }
);

const fetchCategory = async () => {
  isLoading.value = true;
  const category = await categoriesStore.getCategoryById(props.id);
  if (category) {
    initialValues.value = {
      name: category.name,
      pictureId: category.pictureId,
      isActive: category.isActive,
    };
    picturePreview.value = category.picture.path;
  }
  isLoading.value = false;
};

const onSubmit = async (values: ICategoryPayload) => {
  try {
    await categoriesStore.updateCategory(props.id, values);
    openValue.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
