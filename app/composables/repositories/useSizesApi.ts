import { useHttp } from "~/composables/useHttp";
import type { ISize, ISizePayload } from "~/types/sizes";

export const useSizesApi = () => {
  const $api = useHttp();

  const useGetAllSizes = async (name?: string): Promise<ISize[]> => {
    const response: ISize[] = await $api("/sizes", {
      method: "GET",
      params: { name },
    });
    return response;
  };

  const useGetSizeById = async (id: number): Promise<ISize> => {
    const response: ISize = await $api(`/sizes/${id}`, {
      method: "GET",
    });
    return response;
  };

  const useCreateSize = async (size: ISizePayload): Promise<ISize> => {
    const response: ISize = await $api("/sizes", {
      method: "POST",
      body: size,
    });
    return response;
  };

  const useUpdateSize = async (
    id: number,
    size: Partial<ISizePayload>
  ): Promise<ISize> => {
    const response: ISize = await $api(`/sizes/${id}`, {
      method: "PATCH",
      body: size,
    });
    return response;
  };

  const useDeleteSize = async (id: number): Promise<void> => {
    const response: void = await $api(`/sizes/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  return {
    useGetAllSizes,
    useGetSizeById,
    useCreateSize,
    useUpdateSize,
    useDeleteSize,
  };
};
