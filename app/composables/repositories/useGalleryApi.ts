import { useHttp } from "~/composables/useHttp";
import type { IGalleryImage, IGalleryParams } from "~/types/gallery";
import type { IApiResponse } from "~/types/api";

export const useGalleryApi = () => {
  const $api = useHttp();

  const useUploadImages = async (file: File): Promise<IGalleryImage> => {
    const formData = new FormData();
    formData.append("file", file);
    const response: IGalleryImage = await $api("/files", {
      method: "POST",
      body: formData,
    });
    return response;
  };

  const useGetAllImages = async (
    params: IGalleryParams
  ): Promise<IApiResponse<IGalleryImage[]>> => {
    const response: IApiResponse<IGalleryImage[]> = await $api("/files", {
      method: "GET",
      params,
    });

    return response;
  };

  const useDeleteImage = async (id: number): Promise<void> => {
    const response: void = await $api(`/files/${id}`, {
      method: "DELETE",
    });
    return response;
  };

  const useGetImageById = async (id: number): Promise<IGalleryImage> => {
    const response: IGalleryImage = await $api(`/files/${id}`, {
      method: "GET",
    });
    return response;
  };

  return { useUploadImages, useGetAllImages, useDeleteImage, useGetImageById };
};
