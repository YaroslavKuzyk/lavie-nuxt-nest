import type { IGalleryImage } from "./gallery";

export interface ICategory {
  id: number;
  name: string;
  pictureId: number;
  picture: IGalleryImage;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryPayload {
  name: string;
  pictureId: number;
  isActive: boolean;
}
