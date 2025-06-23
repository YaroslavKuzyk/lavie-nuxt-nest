<template>
  <Card>
    <CardContent>
      <div class="w-full flex gap-4">
        <div class="w-[200px]flex flex-col">
          <CardTitle class="mb-4">{{ variation.color }}</CardTitle>

          <div
            v-for="(values, index) in variation.values"
            :key="index"
            class="w-full flex gap-4"
          >
            <Input :model-value="values.size" disabled class="max-w-[100px]" />
            <Input
              v-model="values.quantity"
              type="number"
              class="max-w-[100px]"
              @change="updateQuantity(index, values.quantity)"
            />

            <Button
              variant="outline"
              size="icon"
              class="cursor-pointer text-red-500 hover:text-red-600"
              @click="removeVariation(index)"
            >
              <Trash2 />
            </Button>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <ImgsUploader v-model="images" :maxFiles="10" />
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button
        variant="outline"
        size="icon"
        class="cursor-pointer text-red-500 hover:text-red-600"
        @click="removeAllVariations"
      >
        <Trash2 />
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-vue-next";
import ImgsUploader from "~/components/common/ImgControls/ImgsSortUploader.vue";

const props = defineProps({
  variation: {
    type: Object as PropType<{
      color: string;
      values: { size: string; quantity: string }[];
    }>,
    required: true,
  },
});

const images = ref<File[]>([]);

const emit = defineEmits([
  "updateQuantity",
  "removeVariation",
  "removeAllVariationsByColor",
]);

watch(
  () => props.variation.values,
  (newValues) => {
    if (newValues.length === 0) {
      removeAllVariations();
    }
  },
  { deep: true }
);

const updateQuantity = (index: number, quantity: string) => {
  emit("updateQuantity", props.variation.color, index, quantity);
};

const removeVariation = (index: number) => {
  emit("removeVariation", props.variation.color, index);
};

const removeAllVariations = () => {
  emit("removeAllVariationsByColor", props.variation.color);
};
</script>

<style scoped></style>
