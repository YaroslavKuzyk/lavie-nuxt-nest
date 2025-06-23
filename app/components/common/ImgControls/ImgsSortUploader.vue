<template>
  <div class="inline-flex flex-wrap gap-4 border rounded-md p-4">
    <ImgThumb
      v-for="(img, index) in internalImages"
      :key="img.url"
      :img="img"
      @on-delete="removeImage(index)"
      draggable="true"
      @dragstart="onDragStart(index)"
      @dragover.prevent
      @drop="onDrop(index)"
      cursor="move"
    />

    <ImgUploadThumb
      v-if="internalImages.length < maxFiles"
      @filesSelected="handleFiles"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from "vue";
import ImgUploadThumb from "@/components/common/ImgControls/ImgUploadThumb.vue";
import ImgThumb from "@/components/common/ImgControls/ImgThumb.vue";

/**
 * Props:
 * - modelValue: масив File-об’єктів (завантажені фото)
 * - maxFiles: необов’язковий ліміт кількості фото
 */
const props = defineProps<{
  modelValue: File[];
  maxFiles?: number;
}>();

/**
 * Emit для v-model
 */
const emit = defineEmits<{
  (e: "update:modelValue", value: File[]): void;
}>();

/**
 * Внутрішній масив із { file: File; url: string }
 * Для відображення preview через URL.createObjectURL
 */
const internalImages = ref<{ file: File; url: string }[]>([]);

/**
 * Індекс елемента, що перетягується
 */
const dragIndex = ref<number | null>(null);

/**
 * Обчислюємо, скільки максимально файлів можна завантажити
 */
const maxFiles = computed(() => props.maxFiles ?? Infinity);

/**
 * Ініціалізуємо internalImages з початкового modelValue
 */
function initializeImages() {
  internalImages.value.forEach((img) => URL.revokeObjectURL(img.url));
  internalImages.value = props.modelValue.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));
}

initializeImages();

watch(
  () => props.modelValue,
  () => {
    initializeImages();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  internalImages.value.forEach((img) => {
    URL.revokeObjectURL(img.url);
  });
});

/**
 * Обробка файлів, отриманих з дочірнього компонента
 */
function handleFiles(selectedFiles: File[]) {
  const currentCount = internalImages.value.length;
  const slotsLeft = Math.max(0, maxFiles.value - currentCount);
  const filesToAdd = selectedFiles.slice(0, slotsLeft);

  filesToAdd.forEach((file) => {
    const url = URL.createObjectURL(file);
    internalImages.value.push({ file, url });
  });

  emit(
    "update:modelValue",
    internalImages.value.map((img) => img.file)
  );
}

/**
 * Видаляємо зображення за індексом
 */
function removeImage(index: number) {
  const [removed] = internalImages.value.splice(index, 1);
  URL.revokeObjectURL(removed.url);

  emit(
    "update:modelValue",
    internalImages.value.map((img) => img.file)
  );
}

/**
 * Обробник dragstart: фіксуємо, який індекс перетягується
 */
function onDragStart(index: number) {
  dragIndex.value = index;
}

/**
 * Обробник drop: переміщуємо елемент
 */
function onDrop(dropIndex: number) {
  const from = dragIndex.value;
  const to = dropIndex;
  if (from === null || from === to) return;

  const movedItem = internalImages.value.splice(from, 1)[0];
  internalImages.value.splice(to, 0, movedItem);
  dragIndex.value = null;

  emit(
    "update:modelValue",
    internalImages.value.map((img) => img.file)
  );
}
</script>
