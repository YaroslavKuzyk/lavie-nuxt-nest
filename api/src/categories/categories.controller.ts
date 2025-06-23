import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UseGuards,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';

@UseGuards(JwtAuthGuard)
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(@Query('name') name?: string) {
    return this.categoriesService.getAll(name);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getById(id);
  }

  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
