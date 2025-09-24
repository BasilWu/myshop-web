// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 啟用全域驗證管線
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自動過濾 DTO 以外的欄位
      forbidNonWhitelisted: true, // 如果傳入未定義欄位就報錯
      transform: true, // 自動轉型 payload
    }),
  );

  // 啟用 CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();