<template>
  <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-4 my-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Назва" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="value">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Значення" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" class="cursor-pointer">Додати</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IProps {
  initialValues: { name: string; value: string };
}

interface IEmit {
  (e: "submit", values: { name: string; value: string }): void;
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmit>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Назва є обов'язковою"),
    value: z.string().min(1, "Значення є обов'язковим"),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
});

const onSubmit = form.handleSubmit(async (values) => {
  emit("submit", values);
});
</script>

<style scoped></style>
