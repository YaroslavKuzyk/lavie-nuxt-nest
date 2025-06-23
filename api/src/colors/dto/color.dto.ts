import { IsNumber, IsString } from 'class-validator';

export class ColorDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
