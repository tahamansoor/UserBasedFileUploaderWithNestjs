import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  const config = new DocumentBuilder()
    .setTitle('Practice')
    .setDescription('nothing')
    .setVersion('1.0')
    .addTag('none')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
      )
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    // app.use('/upload', express.static(join(__dirname, '..', 'upload'))); // <-
    app.useStaticAssets(join(__dirname, '..', '/upload'));


  await app.listen(3000);
}
bootstrap();
