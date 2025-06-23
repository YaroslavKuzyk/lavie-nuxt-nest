import { useHttp } from "~/composables/useHttp";
import { type IAuthTokens, type IUser } from "@/types/auth";

export const useAuthApi = () => {
  const $api = useHttp();

  const useLogin = async (dto: { email: string; password: string }) => {
    const { accessToken: a, refreshToken: r } = await $api<IAuthTokens>(
      "/auth/login",
      { method: "POST", body: dto }
    );

    return { accessToken: a, refreshToken: r };
  };

  const useRegister = async (dto: { email: string; password: string }) => {
    const { accessToken: a, refreshToken: r } = await $api<IAuthTokens>(
      "/auth/register",
      { method: "POST", body: dto }
    );

    return { accessToken: a, refreshToken: r };
  };

  const useRefreshTokens = async (refreshToken: string) => {
    const { accessToken: a, refreshToken: r } = await $api<IAuthTokens>(
      "/auth/refresh",
      { method: "POST", body: { refreshToken } }
    );

    return { accessToken: a, refreshToken: r };
  };

  const useFetchMe = async () => {
    const user = await $api<IUser>("/auth/me", { method: "GET" });
    return user;
  };

  const useLogout = async () => {
    await $api("/auth/logout", { method: "POST" });
  };

  return { useLogin, useRegister, useRefreshTokens, useFetchMe, useLogout };
};
