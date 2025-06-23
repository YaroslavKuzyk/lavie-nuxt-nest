<template>
  <div
    class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center cursor-pointer transition"
    @click="openFileDialog"
  >
    <Import class="w-8 h-8 text-gray-400 mb-1" />
    <span class="text-sm text-gray-500">Додати фото</span>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      multiple
      class="hidden"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Import } from "lucide-vue-next";

const emit = defineEmits<{
  (e: "filesSelected", files: File[]): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const openFileDialog = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const files = Array.from(input.files);
  emit("filesSelected", files);

  input.value = "";
};
</script>
