export interface IColor {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface IColorPayload {
  name: string;
  value: string;
}
