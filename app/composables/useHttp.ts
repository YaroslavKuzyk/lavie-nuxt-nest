import { useRuntimeConfig } from "#app";
import { useAuthStore } from "~/stores/useAuthStore";

export const useHttp = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    async onRequest({ options }) {
      if (authStore.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.accessToken}`,
        };
      }
    },
    async onResponseError({ request, response }) {
      if (response?.status === 401) {
        const newToken = await authStore.refreshTokens();
        if (newToken) {
          request.options.headers = {
            ...request.options.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return $fetch(request);
        }
      }
      throw response;
    },
  });

  return api;
};
