import { useHttp } from "~/composables/useHttp";
import type { ICategory, ICategoryPayload } from "~/types/categories";

export const useCategoriesApi = () => {
  const $api = useHttp();

  const useGetAllCategories = async (name?: string): Promise<ICategory[]> => {
    const response: ICategory[] = await $api("/categories", {
      method: "GET",
      params: { name },
    });
    return response;
  };

  const useGetCategoryById = async (id: number): Promise<ICategory> => {
    const response: ICategory = await $api(`/categories/${id}`, {
      method: "GET",
    });
    return response;
  };

  const useCreateCategory = async (
    category: ICategoryPayload
  ): Promise<ICategory> => {
    const response: ICategory = await $api("/categories", {
      method: "POST",
      body: category,
    });
    return response;
  };

  const useUpdateCategory = async (
    id: number,
    category: Partial<ICategoryPayload>
  ): Promise<ICategory> => {
    const response: ICategory = await $api(`/categories/${id}`, {
      method: "PATCH",
      body: category,
    });
    return response;
  };

  const useDeleteCategory = async (id: number): Promise<void> => {
    const response: void = await $api(`/categories/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  return {
    useGetAllCategories,
    useGetCategoryById,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
};
