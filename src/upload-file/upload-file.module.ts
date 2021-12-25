import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
// import multer from 'multer';
import { UploadFileController } from './upload-file.controller';
import { FileRepository } from './upload-file.repository';
import { UploadFileService } from './upload-file.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService,],
  imports:[
    MulterModule.register({ dest: './upload' }),
    TypeOrmModule.forFeature([
      FileRepository
    ])

  ]  
})
export class UploadFileModule {}
