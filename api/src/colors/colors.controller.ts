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
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ColorsService } from './colors.service';

@UseGuards(JwtAuthGuard)
@Controller('api/colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Get()
  getAllColors(@Query('name') name?: string) {
    return this.colorsService.getAll(name);
  }

  @Get(':id')
  getColorById(@Param('id') id: number) {
    return this.colorsService.getById(id);
  }

  @Post()
  createColor(@Body() dto: CreateColorDto) {
    return this.colorsService.create(dto);
  }

  @Patch(':id')
  updateColor(@Param('id') id: number, @Body() dto: UpdateColorDto) {
    return this.colorsService.update(id, dto);
  }

  @Delete(':id')
  deleteColor(@Param('id') id: number) {
    return this.colorsService.delete(id);
  }
}
