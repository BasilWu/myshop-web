import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { S3Service } from '../aws/s3.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.s3.uploadFile(file);
  }
}