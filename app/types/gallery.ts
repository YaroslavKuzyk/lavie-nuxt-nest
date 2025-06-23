export interface IGalleryImage {
  createdAt: string;
  id: number;
  name: string;
  path: string;
  updatedAt: string;
  userId: number;
}

export interface IGalleryParams {
  page: number;
  perPage: number;
  search: string | null;
  userId: number | null;
}
