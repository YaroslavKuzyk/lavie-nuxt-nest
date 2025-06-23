import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Color } from './entities/colors.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
  ) {}

  async create(dto: CreateColorDto) {
    const color = this.colorRepository.create({
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.colorRepository.save(color);
  }

  async getAll(name?: string) {
    const where: any = {};
    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const data = await this.colorRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });

    return data;
  }

  async getById(id: number) {
    return this.colorRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateColorDto) {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return this.colorRepository.save({ ...color, ...dto });
  }

  async delete(id: number) {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new NotFoundException('Color not found');
    }

    await this.colorRepository.delete(id);

    return { message: 'Color deleted' };
  }
}
