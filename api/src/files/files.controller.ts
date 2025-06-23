import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UseGuards,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Request,
  Req,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File as MulterFile } from 'multer';
import { IFileFilters } from './domain/files.types';

@UseGuards(JwtAuthGuard)
@Controller('api/files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  getAllFiles(@Query() query: IFileFilters) {
    return this.filesService.getAll(query);
  }

  @Get(':id')
  getFileById(@Param('id') id: number) {
    return this.filesService.getById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: MulterFile, @Req() req) {
    return this.filesService.saveMetadata({
      name: file.filename,
      path: file.path,
      userId: req.user.sub,
    });
  }

  @Delete(':id')
  deleteFile(@Param('id') id: number) {
    return this.filesService.delete(id);
  }
}
