export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  if (
    !authStore.accessToken &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    return navigateTo("/login");
  }
});
