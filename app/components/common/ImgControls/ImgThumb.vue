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
      v-if="type === 'default'"
      variant="outline"
      size="icon"
      @click.prevent="onDelete(img)"
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
    <div
      v-if="type === 'picker'"
      class="absolute top-1 right-1 z-10 w-7 h-7 flex items-center justify-center bg-white shadow-md rounded-md"
    >
      <Checkbox
        v-model="isChecked"
        class="cursor-pointer"
        :checked="isChecked"
        :disabled="disabledCheck"
        @update:model-value="isChecked ? onCheck(img.url) : onUncheck(img.url)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { ref } from "vue";

interface IProps {
  img: { file?: File; url: string };
  cursor?: string;
  type: "default" | "picker";
  disabledCheck?: boolean;
}

interface IEmit {
  (e: "onDelete", img: { file?: File; url: string }): void;
  (e: "onCheck", url: string): void;
  (e: "onUncheck", url: string): void;
}

const emit = defineEmits<IEmit>();

defineProps<IProps>();

const isChecked = ref(false);

const onDelete = (img: { file?: File; url: string }) => {
  emit("onDelete", img);
};

const onCheck = (url: string) => {
  emit("onCheck", url);
};

const onUncheck = (url: string) => {
  emit("onUncheck", url);
};
</script>

<style scoped></style>
