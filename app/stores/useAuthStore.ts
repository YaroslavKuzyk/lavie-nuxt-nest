import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie, navigateTo } from "#app";
import { type IUser } from "@/types/auth";
import { UserType } from "@/types/auth";
import { useAuthApi } from "~/composables/repositories/useAuthApi";

export const useAuthStore = defineStore("auth-store", () => {
  const accessToken = ref<string | null>(null);
  const isReady = ref(false);
  const cookieRefreshToken = useCookie("refreshToken", { sameSite: "strict" });
  const user = ref<IUser | null>(null);
  const isAuth = computed(() => !!accessToken.value);
  const isAdmin = computed(() => user.value?.type === UserType.ADMIN);
  const { useLogin, useRegister, useRefreshTokens, useFetchMe, useLogout } =
    useAuthApi();

  async function login(dto: { email: string; password: string }) {
    const { accessToken: a, refreshToken: r } = await useLogin(dto);
    accessToken.value = a;
    cookieRefreshToken.value = r;
    await fetchMe();
  }

  async function register(dto: { email: string; password: string }) {
    const { accessToken: a, refreshToken: r } = await useRegister(dto);
    accessToken.value = a;
    cookieRefreshToken.value = r;
    await fetchMe();
  }

  async function refreshTokens() {
    if (!cookieRefreshToken.value) return false;
    try {
      const { accessToken: a, refreshToken: r } = await useRefreshTokens(
        cookieRefreshToken.value
      );
      accessToken.value = a;
      cookieRefreshToken.value = r;
      return true;
    } catch {
      logout();
      return false;
    }
  }

  async function fetchMe() {
    try {
      user.value = await useFetchMe();
      return user.value;
    } catch {
      user.value = null;
      return null;
    }
  }

  async function logout() {
    await useLogout();
    cookieRefreshToken.value = null;
    accessToken.value = null;
    user.value = null;
    navigateTo("/login");
  }

  async function initialize() {
    if (!isReady.value) {
      const ok = await refreshTokens();
      if (ok) {
        await fetchMe();
      }
      isReady.value = true;
    }
  }

  return {
    accessToken,
    user,
    isReady,
    login,
    register,
    refreshTokens,
    fetchMe,
    initialize,
    logout,
    isAuth,
    isAdmin,
  };
});
