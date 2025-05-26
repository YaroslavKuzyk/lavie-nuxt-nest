export default defineNuxtRouteMiddleware(async (to) => {
  const cookieRefreshToken = useCookie("refreshToken", { sameSite: "strict" });
  if (cookieRefreshToken.value) {
    const authStore = useAuthStore();
    await authStore.initialize();
  }
});
