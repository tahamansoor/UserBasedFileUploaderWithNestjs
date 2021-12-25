import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileModule } from './upload-file/upload-file.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), 
     AuthModule,
      UploadFileModule,
      MulterModule.register({ dest: './upload',}),
      // MulterModule.registerAsync({
      //   useFactory: () => ({
      //     dest: 'upload',
      //   }),
      // })
    
    ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
console.log()