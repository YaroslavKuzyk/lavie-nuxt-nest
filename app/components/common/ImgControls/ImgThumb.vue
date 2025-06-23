<template>
  <div
    class="w-32 h-32 border-2 border border-gray-300 rounded-lg overflow-hidden relative"
  >
    <img
      :src="img.url"
      alt="preview"
      class="object-cover w-full h-full"
      :class="cursor"
    />

    <Button
      variant="outline"
      size="icon"
      @click="onDelete(img)"
      class="absolute top-1 right-1 z-10 w-7 h-7 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  img: { file?: File; url: string };
  cursor?: string;
}

interface IEmit {
  (e: "onDelete", img: { file?: File; url: string }): void;
}

const emit = defineEmits<IEmit>();

defineProps<IProps>();

const onDelete = (img: { file?: File; url: string }) => {
  emit("onDelete", img);
};
</script>

<style scoped></style>
