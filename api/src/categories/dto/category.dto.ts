import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { File } from '../../files/entities/files.entity';

export class CategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  pictureId: number;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  picture: File;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
