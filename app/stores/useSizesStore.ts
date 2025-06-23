import { defineStore } from "pinia";
import { useSizesApi } from "~/composables/repositories/useSizesApi";
import type { ISize, ISizePayload } from "~/types/sizes";

export const useSizesStore = defineStore("sizes-store", () => {
  const {
    useGetAllSizes,
    useCreateSize,
    useUpdateSize,
    useDeleteSize,
    useGetSizeById,
  } = useSizesApi();
  const sizes = ref<ISize[]>([]);

  const fetchSizes = async (name?: string) => {
    try {
      const response = await useGetAllSizes(name);
      sizes.value = response;
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createSize = async (size: ISizePayload) => {
    try {
      await useCreateSize(size);
      await fetchSizes();
    } catch (error) {
      console.error(error);
    }
  };

  const updateSize = async (id: number, size: Partial<ISizePayload>) => {
    try {
      await useUpdateSize(id, size);
      await fetchSizes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSize = async (id: number) => {
    try {
      await useDeleteSize(id);
      await fetchSizes();
    } catch (error) {
      console.error(error);
    }
  };

  const getSizeById = async (id: number) => {
    try {
      const response = await useGetSizeById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    sizes,
    fetchSizes,
    createSize,
    updateSize,
    deleteSize,
    getSizeById,
  };
});
