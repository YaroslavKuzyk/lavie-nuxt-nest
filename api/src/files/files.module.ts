import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/files.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([File, User])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
