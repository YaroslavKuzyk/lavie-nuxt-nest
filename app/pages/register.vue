<template>
  <div class="min-h-screen flex">
    <div class="w-[50%] bg-zinc-900 p-6">
      <h1 class="text-2xl text-white">Lavie</h1>
    </div>
    <div class="w-[50%] relative">
      <div class="flex justify-end p-6 absolute top-0 right-0">
        <Button as-child>
          <NuxtLink to="/login">Sign In</NuxtLink>
        </Button>
      </div>
      <div class="p-6 h-full flex flex-col justify-center items-center">
        <h1 class="text-2xl text-zinc-900 font-semibold">Create an Account</h1>

        <p class="text-zinc-500 mb-5">Create an account to get started</p>

        <form class="max-w-[330px] w-full space-y-3" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full rounded-sm cursor-pointer">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await authStore.register({
      email: values.email,
      password: values.password,
    });
    navigateTo("/dashboard");
  } catch (e) {
    console.error(e);
  }
});
</script>
