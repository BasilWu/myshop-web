import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // 先別開 forbidNonWhitelisted（避免你現在卡 400），等 DTO 都好再打開
    // forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();