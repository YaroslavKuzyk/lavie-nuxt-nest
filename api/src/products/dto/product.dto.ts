import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsBoolean()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  discount: number | null;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
