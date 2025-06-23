import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { File } from './entities/files.entity';
import { join, basename } from 'path';
import * as fs from 'fs';
import { IFileFilters } from './domain/files.types';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async saveMetadata({
    name,
    path,
    userId,
  }: {
    name: string;
    path: string;
    userId: number;
  }) {
    const file = this.fileRepository.create({
      name,
      path: `${process.env.STORAGE_PATH}/${path}`,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.fileRepository.save(file);
  }

  async getAll(params: IFileFilters) {
    const { page = 1, perPage = 10, search, userId } = params;
    const where: any = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    if (userId) {
      where.userId = userId;
    }
    const [data, total] = await this.fileRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      relations: ['user'],
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async getById(id: number) {
    return this.fileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async delete(id: number) {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this.fileRepository.delete(id);

    const filename = basename(new URL(file.path).pathname);

    const filePath = join(process.cwd(), 'storage', filename);
    console.log(filePath);

    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error('Failed to delete file from disk:', error);
    }

    return { message: 'File deleted' };
  }
}
