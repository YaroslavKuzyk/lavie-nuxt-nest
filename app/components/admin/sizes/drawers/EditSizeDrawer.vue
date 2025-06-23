<template>
  <Drawer v-model:open="openValue">
    <DrawerContent>
      <DrawerHeader>
        <div class="max-w-[500px] w-full mx-auto">
          <DrawerTitle>Редагувати розмір</DrawerTitle>
          <DrawerDescription>
            <SizeForm
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
import { useSizesStore } from "~/stores/useSizesStore";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import SizeForm from "../SizeForm.vue";

const props = defineProps<{
  id: number;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const isLoading = ref(false);

const sizesStore = useSizesStore();
const openValue = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});
const initialValues = ref<{ name: string }>({
  name: "",
});

watch(
  () => openValue.value,
  () => {
    if (openValue.value) {
      fetchSize();
    }
  },
  { immediate: true }
);

const fetchSize = async () => {
  isLoading.value = true;
  const size = await sizesStore.getSizeById(props.id);
  if (size) {
    initialValues.value = {
      name: size.name,
    };
  }
  isLoading.value = false;
};

const onSubmit = async (values: { name: string }) => {
  try {
    await sizesStore.updateSize(props.id, values);
    openValue.value = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
