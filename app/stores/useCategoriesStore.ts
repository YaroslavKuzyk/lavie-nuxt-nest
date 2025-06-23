import { defineStore } from "pinia";
import { useCategoriesApi } from "~/composables/repositories/useCategories";
import type { ICategory, ICategoryPayload } from "~/types/categories";

export const useCategoriesStore = defineStore("categories-store", () => {
  const {
    useGetAllCategories,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
    useGetCategoryById,
  } = useCategoriesApi();
  const categories = ref<ICategory[]>([]);

  const fetchCategories = async (name?: string) => {
    try {
      const response = await useGetAllCategories(name);
      categories.value = response;
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createCategory = async (category: ICategoryPayload) => {
    try {
      await useCreateCategory(category);
      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async (
    id: number,
    category: Partial<ICategoryPayload>
  ) => {
    try {
      await useUpdateCategory(id, category);
      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await useDeleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryById = async (id: number) => {
    try {
      const response = await useGetCategoryById(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
});
