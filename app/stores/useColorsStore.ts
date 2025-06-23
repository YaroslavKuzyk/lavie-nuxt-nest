import { defineStore } from "pinia";
import { useColorsApi } from "~/composables/repositories/useColorsApi";
import type { IColor, IColorPayload } from "~/types/colors";

export const useColorsStore = defineStore("colors-store", () => {
  const {
    useGetAllColors,
    useCreateColor,
    useUpdateColor,
    useDeleteColor,
    useGetColorById,
  } = useColorsApi();
  const colors = ref<IColor[]>([]);

  const fetchColors = async (name?: string) => {
    try {
      const response = await useGetAllColors(name);
      colors.value = response;
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createColor = async (color: IColorPayload) => {
    try {
      await useCreateColor(color);
      await fetchColors();
    } catch (error) {
      console.error(error);
    }
  };

  const updateColor = async (id: number, color: Partial<IColorPayload>) => {
    try {
      await useUpdateColor(id, color);
      await fetchColors();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteColor = async (id: number) => {
    try {
      await useDeleteColor(id);
      await fetchColors();
    } catch (error) {
      console.error(error);
    }
  };

  const getColorById = async (id: number) => {
    try {
      const response = await useGetColorById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    colors,
    fetchColors,
    createColor,
    updateColor,
    deleteColor,
    getColorById,
  };
});
