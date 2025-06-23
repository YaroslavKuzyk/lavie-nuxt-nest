import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/colors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorsController],
  providers: [ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
