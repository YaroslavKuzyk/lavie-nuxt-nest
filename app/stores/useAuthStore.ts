import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookie, navigateTo } from "#app";
import { useHttp } from "~/composables/useHttp";
import { type IAuthTokens, type IUser } from "@/types/auth";

export const useAuthStore = defineStore("auth-store", () => {
  const accessToken = ref<string | null>(null);
  const isReady = ref(false);
  const cookieRefreshToken = useCookie("refreshToken", { sameSite: "strict" });
  const user = ref<IUser | null>(null);

  const api = useHttp();

  async function login(dto: { email: string; password: string }) {
    const { accessToken: a, refreshToken: r } = await api<IAuthTokens>(
      "/auth/login",
      { method: "POST", body: dto }
    );
    accessToken.value = a;
    cookieRefreshToken.value = r;
    await fetchMe();
  }

  async function register(dto: { email: string; password: string }) {
    const { accessToken: a, refreshToken: r } = await api<IAuthTokens>(
      "/auth/register",
      { method: "POST", body: dto }
    );
    accessToken.value = a;
    cookieRefreshToken.value = r;
    await fetchMe();
  }

  async function refreshTokens() {
    if (!cookieRefreshToken.value) return false;
    try {
      const { accessToken: a, refreshToken: r } = await api<IAuthTokens>(
        "/auth/refresh",
        { method: "POST", body: { refreshToken: cookieRefreshToken.value } }
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
      user.value = await api<IUser>("/auth/me", { method: "GET" });
      return user.value;
    } catch {
      user.value = null;
      return null;
    }
  }

  function logout() {
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
  };
});
