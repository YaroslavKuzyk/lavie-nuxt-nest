import { UserType } from "~/types/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  if (authStore.user?.type !== UserType.ADMIN) {
    return navigateTo("/");
  }
});
