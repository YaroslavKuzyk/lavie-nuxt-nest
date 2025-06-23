<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="cursor-pointer max-w-[150px] ml-auto">
        Додати варіацію
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Додати варіацію</DialogTitle>
      </DialogHeader>

      <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-4 my-4">
        <FormField v-slot="{ componentField }" name="color">
          <FormItem>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Виберіть колір" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Чорний">Чорний</SelectItem>
                  <SelectItem value="Червоний">Червоний</SelectItem>
                  <SelectItem value="Синій">Синій</SelectItem>
                  <SelectItem value="Білий">Білий</SelectItem>
                  <SelectItem value="Жовтий">Жовтий</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="size">
          <FormItem>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Виберіть розмір" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  <SelectItem value="XXL">XXL</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="quantity">
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Кількість"
                v-bind="componentField"
              />
              <FormMessage />
            </FormControl>
          </FormItem>
        </FormField>

        <Button type="submit" class="cursor-pointer">Додати</Button>
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    color: z.string().min(1, "Колір є обов'язковим"),
    size: z.string().min(1, "Розмір є обов'язковим"),
    quantity: z.string().min(1, "Кількість є обов'язковою"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    color: "",
    size: "",
    quantity: "",
  },
});

const isOpen = ref(false);
const emit = defineEmits(["submit"]);

const onSubmit = form.handleSubmit(async (values) => {
  emit("submit", values);
  isOpen.value = false;
});
</script>

<style scoped></style>
