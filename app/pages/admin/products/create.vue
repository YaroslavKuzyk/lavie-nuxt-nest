<template>
  <form @submit="onSubmit" class="flex flex-wrap gap-4 w-full">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="w-[calc(25%-12px)]">
        <FormControl>
          <Input type="text" placeholder="Назва" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="category">
      <FormItem class="w-[calc(25%-12px)]">
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="cursor-pointer w-full">
              <SelectValue placeholder="Категорія" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem class="cursor-pointer" value="t-shirt">
                T-shirt
              </SelectItem>
              <SelectItem class="cursor-pointer" value="hoodie">
                Hoodie
              </SelectItem>
              <SelectItem class="cursor-pointer" value="sweater">
                Sweater
              </SelectItem>
              <SelectItem class="cursor-pointer" value="jacket">
                Jacket
              </SelectItem>
              <SelectItem class="cursor-pointer" value="pants">
                Pants
              </SelectItem>
              <SelectItem class="cursor-pointer" value="shorts">
                Shorts
              </SelectItem>
              <SelectItem class="cursor-pointer" value="shoes">
                Shoes
              </SelectItem>
              <SelectItem class="cursor-pointer" value="accessories">
                Accessories
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
          <Input type="text" placeholder="Ціна" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="discount">
      <FormItem class="w-[calc(25%-12px)]">
        <FormControl>
          <Input type="text" placeholder="Знижка" v-bind="componentField" />
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

  <div class="w-full flex flex-col gap-4 justify-end">
    <CreateProductDialog @submit="addNewVariation" />

    <div class="w-full flex flex-col gap-4">
      <ProductVariationCard
        v-for="variation in variations"
        :key="variation.color"
        :variation="variation"
        @update-quantity="updateQuantity"
        @remove-variation="removeVariation"
        @remove-all-variations-by-color="removeAllVariationsByColor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/useProductsStore";
import { useAdminStore } from "~/stores/useAdminStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import CreateProductDialog from "~/components/admin/product/dialog/CreateProductDialog.vue";
import ProductVariationCard from "~/components/admin/product/ProductVariationCard.vue";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});

const productsStore = useProductsStore();
const adminStore = useAdminStore();
const variations = ref<
  { color: string; values: { size: string; quantity: string }[] }[]
>([]);

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nullable(),
    discount: z.number().nullable(),
    size: z.array(z.string()).min(1),
    color: z.array(z.string()).min(1),
    description: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: "",
    category: "",
    price: null,
    discount: null,
    description: "",
  },
});

const addNewVariation = (values: {
  color: string;
  size: string;
  quantity: string;
}) => {
  const existingVariation = variations.value.find(
    (variation) => variation.color === values.color
  );

  if (existingVariation) {
    existingVariation.values.push({
      size: values.size,
      quantity: values.quantity,
    });
  } else {
    variations.value.push({
      color: values.color,
      values: [{ size: values.size, quantity: values.quantity }],
    });
  }
};

const updateQuantity = (color: string, index: number, quantity: string) => {
  const variation = variations.value.find(
    (variation) => variation.color === color
  );
  if (variation) {
    variation.values[index].quantity = quantity;
  }
};

const removeVariation = (color: string, index: number) => {
  const variation = variations.value.find(
    (variation) => variation.color === color
  );
  if (variation) {
    variation.values.splice(index, 1);
  }
};

const removeAllVariationsByColor = (color: string) => {
  variations.value = variations.value.filter(
    (variation) => variation.color !== color
  );
};

onMounted(async () => {
  adminStore.setBreadcrumbs([
    { label: "Головна", url: "/admin" },
    { label: "Продукти", url: "/admin/products" },
    { label: "Додати продукт", url: "/admin/products/create" },
  ]);
  await productsStore.fetchProducts();
});
</script>

<style scoped></style>
