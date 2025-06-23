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
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizesService } from './sizes.service';

@UseGuards(JwtAuthGuard)
@Controller('api/sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @Get()
  getAllSizes(@Query('name') name?: string) {
    return this.sizesService.getAll(name);
  }

  @Get(':id')
  getSizeById(@Param('id') id: number) {
    return this.sizesService.getById(id);
  }

  @Post()
  createSize(@Body() dto: CreateSizeDto) {
    return this.sizesService.create(dto);
  }

  @Patch(':id')
  updateSize(@Param('id') id: number, @Body() dto: UpdateSizeDto) {
    return this.sizesService.update(id, dto);
  }

  @Delete(':id')
  deleteSize(@Param('id') id: number) {
    return this.sizesService.delete(id);
  }
}
