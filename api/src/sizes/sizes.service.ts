import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Size } from './entities/sizes.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
  ) {}

  async create(dto: CreateSizeDto) {
    const size = this.sizeRepository.create({
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.sizeRepository.save(size);
  }

  async getAll(name?: string) {
    const where: any = {};
    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const data = await this.sizeRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });

    return data;
  }

  async getById(id: number) {
    return this.sizeRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateSizeDto) {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) {
      throw new NotFoundException('Size not found');
    }

    return this.sizeRepository.save({ ...size, ...dto });
  }

  async delete(id: number) {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) {
      throw new NotFoundException('Size not found');
    }

    await this.sizeRepository.delete(id);

    return { message: 'Size deleted' };
  }
}
