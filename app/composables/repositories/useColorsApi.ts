import { useHttp } from "~/composables/useHttp";
import type { IColor, IColorPayload } from "~/types/colors";

export const useColorsApi = () => {
  const $api = useHttp();

  const useGetAllColors = async (name?: string): Promise<IColor[]> => {
    const response: IColor[] = await $api("/colors", {
      method: "GET",
      params: { name },
    });
    return response;
  };

  const useGetColorById = async (id: number): Promise<IColor> => {
    const response: IColor = await $api(`/colors/${id}`, {
      method: "GET",
    });
    return response;
  };

  const useCreateColor = async (color: IColorPayload): Promise<IColor> => {
    const response: IColor = await $api("/colors", {
      method: "POST",
      body: color,
    });
    return response;
  };

  const useUpdateColor = async (
    id: number,
    color: Partial<IColorPayload>
  ): Promise<IColor> => {
    const response: IColor = await $api(`/colors/${id}`, {
      method: "PATCH",
      body: color,
    });
    return response;
  };

  const useDeleteColor = async (id: number): Promise<void> => {
    const response: void = await $api(`/colors/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  return {
    useGetAllColors,
    useGetColorById,
    useCreateColor,
    useUpdateColor,
    useDeleteColor,
  };
};
