import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.categoryRepository.save(category);
  }

  async getAll(name?: string) {
    const where: any = {};
    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const data = await this.categoryRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['picture'],
    });

    return data;
  }

  async getById(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['picture'],
    });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.save({ ...category, ...dto });
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete(id);

    return { message: 'Category deleted' };
  }
}
