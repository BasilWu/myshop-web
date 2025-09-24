import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: [`.env.local`, `.env`] 
    }),
    ProductsModule,
    UploadModule,
    AuthModule,
  ],
})
export class AppModule {}