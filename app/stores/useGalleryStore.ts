import { defineStore } from "pinia";
import { useGalleryApi } from "~/composables/repositories/useGalleryApi";
import type { IGalleryImage, IGalleryParams } from "~/types/gallery";
import type { IApiResponse } from "~/types/api";

export const useGalleryStore = defineStore("gallery-store", () => {
  const { useGetAllImages, useUploadImages, useDeleteImage, useGetImageById } =
    useGalleryApi();
  const galleryImagesMeta = ref<IApiResponse<IGalleryImage[]>>({
    data: [],
    meta: {
      total: 0,
      page: 1,
      perPage: 10,
      totalPages: 0,
    },
  });

  const galleryParams = ref<IGalleryParams>({
    page: 1,
    perPage: 50,
    search: null,
    userId: null,
  });

  const fetchGalleryImages = async () => {
    const response = await useGetAllImages(galleryParams.value);
    galleryImagesMeta.value = response;
    return response;
  };

  const uploadImage = async (file: File) => {
    await useUploadImages(file);
    await fetchGalleryImages();
  };

  const deleteImage = async (id: number) => {
    await useDeleteImage(id);
    await fetchGalleryImages();
  };

  const getImageById = async (id: number) => {
    const response = await useGetImageById(id);
    return response;
  };

  return {
    galleryImagesMeta,
    fetchGalleryImages,
    uploadImage,
    deleteImage,
    getImageById,
    galleryParams,
  };
});
