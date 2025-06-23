<template>
  <form @submit="onSubmit" class="flex flex-wrap items-center mx-auto gap-4">
    <FormField v-slot="{ value, handleChange }" name="isActive">
      <FormItem class="w-full">
        <FormControl>
          <div class="flex items-center gap-2">
            <Switch
              :model-value="value"
              @update:model-value="handleChange"
              class="cursor-pointer"
            />
            <Label
              >Статус:
              {{ form.values.isActive ? "Активна" : "Неактивна" }}</Label
            >
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="w-full">
        <FormControl>
          <Input type="text" placeholder="Назва" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="pictureId">
      <FormItem class="w-full">
        <FormControl>
          <ImgPickerModal :maxChecked="1" @onSubmit="handleImageSelected">
            <ImgUploadThumb v-if="!picturePreview && !urlPreview" />
            <ImgThumb
              v-else
              :img="{ url: picturePreview || urlPreview }"
              type="default"
              class="cursor-pointer"
              @onDelete="handleImageDelete"
            />
          </ImgPickerModal>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="w-full flex justify-end">
      <Button type="submit" class="cursor-pointer">Зберегти</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ImgPickerModal from "~/components/common/modals/ImgPickerModal.vue";
import ImgUploadThumb from "~/components/common/ImgControls/ImgUploadThumb.vue";
import { type IGalleryImage } from "~/types/gallery";
import ImgThumb from "~/components/common/ImgControls/ImgThumb.vue";
import { Button } from "@/components/ui/button";
import type { ICategoryPayload } from "~/types/categories";

interface IProps {
  initialValues: ICategoryPayload;
  picturePreview?: string | null;
}

interface IEmit {
  (e: "submit", values: ICategoryPayload): void;
}
const props = defineProps<IProps>();

const emit = defineEmits<IEmit>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    pictureId: z.number().nullable(),
    isActive: z.boolean(),
  })
);

const urlPreview = ref<string | null>(null);

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
});

const handleImageSelected = (images: IGalleryImage[]) => {
  const imageId = images[0]?.id;
  if (imageId !== null) {
    form.setFieldValue("pictureId", imageId);
    urlPreview.value = images[0]?.path;
  }
};

const handleImageDelete = () => {
  form.setFieldValue("pictureId", null);
  urlPreview.value = null;
};

const onSubmit = form.handleSubmit(async (values) => {
  emit("submit", values as ICategoryPayload);
});
</script>
