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
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(
    @Query() query: { name?: string; page?: number; perPage?: number },
  ) {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getById(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() dto: CreateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
