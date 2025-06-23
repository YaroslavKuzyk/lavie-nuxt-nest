<template>
  <header
    class="flex items-center justify-between gap-4 px-6 pt-3 max-w-7xl mx-auto"
  >
    <div class="max-w-45 w-full">
      <img
        src="@/assets/img/common/logo-vertiacl-black-transparent.webp"
        class="w-16"
        alt="logo"
      />
    </div>
    <nav>
      <ul class="flex items-center gap-8">
        <li>
          <NuxtLink to="/catalog">Магазин</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Про нас</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Оплата та доставка</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Таблиця розмірів</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="max-w-45 w-full flex items-center justify-end">
      <div>
        <Button variant="ghost" class="size-9 mr-2">
          <NuxtLink to="/">
            <HeartPlus />
          </NuxtLink>
        </Button>
      </div>

      <div v-if="authStore.isAuth">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Avatar
              class="h-10 w-10 rounded-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <AvatarFallback class="rounded-full"> AM </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="end"
            :side-offset="4"
          >
            <DropdownMenuLabel class="p-0 font-normal">
              <div
                class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
              >
                <Avatar class="h-8 w-8 rounded-full">
                  <AvatarFallback class="rounded-full text-xs">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold capitalize">{{
                    user?.type ?? "User"
                  }}</span>
                  <span class="truncate text-xs">{{ user?.email }}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem class="cursor-pointer" as-child>
                <NuxtLink to="/dashboard">
                  <CircleUser />
                  Профіль
                </NuxtLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer" @click="authStore.logout">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div v-else class="flex items-center gap-2">
        <Button as-child variant="outline">
          <NuxtLink to="/login">Вхід</NuxtLink>
        </Button>

        <Button as-child>
          <NuxtLink to="/register">Реєстрація</NuxtLink>
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { HeartPlus, CircleUser, LogOut } from "lucide-vue-next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const authStore = useAuthStore();

const user = computed(() => {
  if (!authStore.user) return null;

  const { email } = authStore.user;
  return {
    email,
  };
});
</script>

<style scoped></style>
