<template>
  <Drawer v-model:open="openValue">
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Редагувати колір</DrawerTitle>
          <DrawerDescription>
            <ColorForm
              v-if="!isLoading"
              :initial-values="initialValues"
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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import ColorForm from "../ColorForm.vue";

const props = defineProps<{
  id: number;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const isLoading = ref(false);

const colorsStore = useColorsStore();
const openValue = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});
const initialValues = ref<{ name: string; value: string }>({
  name: "",
  value: "",
});

watch(
  () => openValue.value,
  () => {
    if (openValue.value) {
      fetchColor();
    }
  },
  { immediate: true }
);

const fetchColor = async () => {
  isLoading.value = true;
  const color = await colorsStore.getColorById(props.id);
  if (color) {
    initialValues.value = {
      name: color.name,
      value: color.value,
    };
  }
  isLoading.value = false;
};

const onSubmit = async (values: { name: string; value: string }) => {
  try {
    await colorsStore.updateColor(props.id, values);
    openValue.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
