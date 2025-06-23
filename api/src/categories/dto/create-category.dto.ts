import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  pictureId: number;

  @IsBoolean()
  isActive: boolean;
}
