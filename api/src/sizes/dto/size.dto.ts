import { IsNumber, IsString } from 'class-validator';

export class SizeDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
