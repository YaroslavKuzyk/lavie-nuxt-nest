<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger @click.prevent as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[1042px]">
      <DialogHeader>
        <DialogTitle>
          Виберіть {{ props.maxChecked === 1 ? "картинку" : "картинки" }}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Виберіть {{ props.maxChecked === 1 ? "картинку" : "картинки" }}
      </DialogDescription>

      <GalleryList
        type="picker"
        :maxChecked="props.maxChecked"
        @onSelected="handleSelected"
      />

      <div class="flex justify-end">
        <Button class="cursor-pointer" @click="handleSubmit">Вибрати</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GalleryList from "~/components/admin/gallery/GalleryList.vue";
import { ref } from "vue";
import { type IGalleryImage } from "~/types/gallery";

interface IProps {
  maxChecked?: number;
}

interface IEmit {
  (e: "onSubmit", images: IGalleryImage[]): void;
}

const emit = defineEmits<IEmit>();

const props = defineProps<IProps>();

const isOpen = ref(false);

const selectedImages = ref<IGalleryImage[]>([]);

const open = () => {
  isOpen.value = true;
};

const handleSelected = (images: IGalleryImage[]) => {
  selectedImages.value = images;
};

const handleSubmit = () => {
  emit("onSubmit", selectedImages.value);
  isOpen.value = false;
};
</script>
