<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle> Додати атрибут </DialogTitle>
      </DialogHeader>
      <DialogDescription> Додайте атрибут до продукту </DialogDescription>

      <form @submit="onSubmit" class="flex flex-wrap gap-4 w-full">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="w-full">
            <FormControl>
              <Input type="text" placeholder="Назва" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="type">
          <FormItem class="w-full">
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="cursor-pointer w-full">
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem class="cursor-pointer" value="color">
                    Колір
                  </SelectItem>
                  <SelectItem class="cursor-pointer" value="size">
                    Розмір
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-if="form.values.type === 'color'"
          v-slot="{ componentField }"
          name="options"
        >
          <FormItem class="w-full">
            <FormControl>
              <Multiselect
                placeholder="Кольори"
                v-bind="componentField"
                :options="colorsStore.colors"
                item-title="name"
                item-value="id"
                return-object
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-if="form.values.type === 'size'"
          v-slot="{ componentField }"
          name="options"
        >
          <FormItem class="w-full">
            <FormControl>
              <Multiselect
                placeholder="Розміри"
                v-bind="componentField"
                :options="sizesStore.sizes"
                item-title="name"
                item-value="id"
                return-object
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end w-full">
          <Button class="cursor-pointer" type="submit">Додати</Button>
        </div>
      </form>
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
import Multiselect from "@/components/ui/multiselect/Multiselect.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useColorsStore } from "~/stores/useColorsStore";
import { useSizesStore } from "~/stores/useSizesStore";
import { type IColor } from "~/types/colors";
import { type ISize } from "~/types/sizes";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    type: z.string().min(1, "Тип є обов'язковим"),
    options: z.optional(
      z.array(z.object({ id: z.number(), name: z.string() }))
    ),
  })
);

interface IProps {
  modelValue: boolean;
  initialValues: {
    name: string;
    type: string;
    options: IColor[] | ISize[];
  };
}

interface IEmit {
  (
    e: "onSubmit",
    payload: {
      name: string;
      type: string;
      options: IColor[] | ISize[];
    }
  ): void;
  (e: "update:modelValue", value: boolean): void;
}

const props = defineProps<IProps>();

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
});

watch(form.values.type, () => {
  form.setFieldValue("options", []);
});

const colorsStore = useColorsStore();
const sizesStore = useSizesStore();

const { data: colors } = useAsyncData("colors", () => {
  return colorsStore.fetchColors();
});

const { data: sizes } = useAsyncData("sizes", async () => {
  return await sizesStore.fetchSizes();
});

const emit = defineEmits<IEmit>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(
  () => props.initialValues,
  () => {
    form.setValues(props.initialValues);
  },
  { deep: true }
);

const onSubmit = form.handleSubmit(async (values) => {
  emit("onSubmit", values);
  isOpen.value = false;
});
</script>
