import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { ProductAttribute } from './entities/productAttributes.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../colors/entities/colors.entity';
import { Size } from '../sizes/entities/sizes.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  async create(createDto: CreateProductDto): Promise<Record<string, any>> {
    const { name, price, discount, description, categoryId, attributes } =
      createDto;

    const category = await this.categoryRepository.findOneByOrFail({
      id: categoryId,
    });

    const product = this.productRepository.create({
      name,
      price,
      discount: discount || undefined,
      description,
      category,
    });

    const attributeEntities: ProductAttribute[] = [];

    for (const attr of attributes) {
      const attribute = new ProductAttribute();
      attribute.name = attr.name;
      attribute.type = attr.type;
      attribute.product = product;

      if (attr.type === 'color') {
        attribute.colors = await this.colorRepository.findBy({
          id: In(attr.options),
        });
      } else if (attr.type === 'size') {
        attribute.sizes = await this.sizeRepository.findBy({
          id: In(attr.options),
        });
      }

      attributeEntities.push(attribute);
    }

    product.attributes = attributeEntities;

    const savedProduct = await this.productRepository.save(product);

    return instanceToPlain(savedProduct);
  }

  async getAll(params: { name?: string; page?: number; perPage?: number }) {
    const { name, page = 1, perPage = 10 } = params;

    const where: any = {};
    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const [data, total] = await this.productRepository.findAndCount({
      where,
      relations: {
        category: true,
        attributes: {
          colors: true,
          sizes: true,
        },
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      data: instanceToPlain(data),
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async getById(id: number) {
    const data = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        attributes: {
          colors: true,
          sizes: true,
        },
      },
    });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return instanceToPlain(data);
  }

  async update(
    id: number,
    dto: CreateProductDto,
  ): Promise<Record<string, any>> {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
      relations: {
        attributes: true, // потрібне для видалення
      },
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const category = await this.categoryRepository.findOneByOrFail({
      id: dto.categoryId,
    });

    // видаляємо старі атрибути (можна каскадно, але тут явно)
    if (existingProduct.attributes?.length) {
      await Promise.all(
        existingProduct.attributes.map((attr) =>
          this.productRepository.manager.remove(ProductAttribute, attr),
        ),
      );
    }

    // створюємо нові атрибути
    const newAttributes: ProductAttribute[] = [];

    for (const attr of dto.attributes) {
      const attribute = new ProductAttribute();
      attribute.name = attr.name;
      attribute.type = attr.type;
      attribute.product = existingProduct;

      if (attr.type === 'color') {
        attribute.colors = await this.colorRepository.findBy({
          id: In(attr.options),
        });
      } else if (attr.type === 'size') {
        attribute.sizes = await this.sizeRepository.findBy({
          id: In(attr.options),
        });
      }

      newAttributes.push(attribute);
    }

    // оновлюємо поля продукту
    existingProduct.name = dto.name;
    existingProduct.price = dto.price;
    existingProduct.discount = dto.discount || null;
    existingProduct.description = dto.description;
    existingProduct.category = category;
    existingProduct.attributes = newAttributes;

    const updatedProduct = await this.productRepository.save(existingProduct);

    return instanceToPlain(updatedProduct);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['attributes'], // потрібно, якщо не використовуєш `eager`
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product); // remove обробить cascade

    return { message: 'Product and attributes deleted' };
  }
}
