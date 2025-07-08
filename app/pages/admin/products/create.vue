<template>
  <div>
    <form @submit="onSubmit" class="flex flex-wrap gap-4 w-full">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="w-[calc(25%-12px)]">
          <FormControl>
            <Input type="text" placeholder="Назва" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem class="w-[calc(25%-12px)]">
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="cursor-pointer w-full">
                <SelectValue placeholder="Категорія" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="category in categoriesStore.categories"
                  :key="category.id"
                  class="cursor-pointer"
                  :value="category.id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem class="w-[calc(25%-12px)]">
          <FormControl>
            <Input type="number" placeholder="Ціна" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="discount">
        <FormItem class="w-[calc(25%-12px)]">
          <FormControl>
            <Input type="number" placeholder="Знижка" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem class="w-full">
          <FormControl>
            <Textarea
              placeholder="Опис"
              class="h-[100px]"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </form>

    <div class="w-full flex justify-between mt-8">
      <h2 class="text-2xl font-bold">Атрибути</h2>

      <Button class="cursor-pointer" @click.stop.prevent="onAddAttribute"
        >Додати атрибут</Button
      >
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Назва</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Значення</TableHead>
          <TableHead class="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="attributes.length">
          <TableRow v-for="(attribute, index) in attributes" :key="index">
            <TableCell>{{ attribute.name }}</TableCell>
            <TableCell>{{ getType(attribute.type) }}</TableCell>
            <TableCell>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(color, index) in attribute.options"
                  :key="color.id"
                >
                  {{ color.name }}
                  <span v-if="index < attribute.options.length - 1" class="mr-1"
                    >,</span
                  >
                </div>
              </div>
            </TableCell>
            <TableCell class="text-right">
              <Button
                variant="ghost"
                class="size-9 mr-2 cursor-pointer"
                @click.prevent="onEditAttribute(index)"
              >
                <Pencil />
              </Button>

              <Button
                variant="ghost"
                class="size-9 text-red-500 hover:text-red-500 cursor-pointer"
                @click.prevent="onDeleteAttribute(index)"
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="6" class="h-24 text-center">
              Немає результатів
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <AttributesModal
      :initialValues="selectedAttribute"
      @onSubmit="onSubmitAttributes"
      v-model="isOpenAttributesModal"
    />

    <div class="flex justify-end w-full mt-8">
      <Button class="cursor-pointer" @click.stop.prevent="onSubmit">
        Додати продукт
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "~/stores/useAdminStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Pencil, Trash2 } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useCategoriesStore } from "~/stores/useCategoriesStore";
import AttributesModal from "~/components/admin/product/modal/AttributesModal.vue";
import { type IColor } from "~/types/colors";
import { type ISize } from "~/types/sizes";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const categoriesStore = useCategoriesStore();

const { data: categories } = useAsyncData("categories", () => {
  return categoriesStore.fetchCategories();
});

const adminStore = useAdminStore();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Назва не може бути порожньою"),
    categoryId: z
      .number({ required_error: "Категорія не може бути порожньою" })
      .min(1, "Категорія має бути обрана"),

    price: z
      .number({ required_error: "Ціна не може бути порожньою" })
      .min(1, "Ціна має бути більшою за 0"),
    discount: z.number().min(0, "Знижка не може бути менше 0").nullable(),
    description: z.string().min(1, "Опис не може бути порожнім"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    categoryId: undefined,
    price: undefined,
    discount: null,
    description: "",
  },
});

const attributes = ref<
  {
    name: string;
    type: string;
    options: IColor[] | ISize[];
  }[]
>([]);

const onSubmitAttributes = (payload: {
  name: string;
  type: string;
  options: IColor[] | ISize[];
}) => {
  attributes.value.push(payload);
};

const getType = (type: string) => {
  switch (type) {
    case "color":
      return "Колір";
    case "size":
      return "Розмір";
    case "custom":
      return "Інше";
  }
};

const selectedAttribute = ref<{
  name: string;
  type: string;
  options: IColor[] | ISize[];
}>();

const isOpenAttributesModal = ref(false);

const onEditAttribute = (index: number) => {
  selectedAttribute.value = attributes.value[index];
  isOpenAttributesModal.value = true;
};

const onDeleteAttribute = (index: number) => {
  attributes.value.splice(index, 1);
};

const onAddAttribute = () => {
  selectedAttribute.value = {
    name: "",
    type: "",
    options: [],
  };
  isOpenAttributesModal.value = true;
};

const onSubmit = form.handleSubmit(async (values) => {
  const payload = {
    ...values,
    attributes: attributes.value.map((attribute) => ({
      name: attribute.name,
      type: attribute.type,
      options: attribute.options.map((option) => option.id),
    })),
  };

  console.log(JSON.stringify(payload));
});

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Продукти", url: "/admin/products" },
    { label: "Додати продукт", url: "/admin/products/create" },
  ]);
});
</script>

<style scoped></style>
