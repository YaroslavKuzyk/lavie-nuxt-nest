export interface IProduct {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  discount: number;
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  colors: {
    name: string;
    value: string;
  }[];
  attributes: {
    name: string;
    options: string[];
  }[];
}
