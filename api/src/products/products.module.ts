import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../colors/entities/colors.entity';
import { Size } from '../sizes/entities/sizes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, Color, Size])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
