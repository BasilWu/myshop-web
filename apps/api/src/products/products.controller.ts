import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  findAll() { return this.products.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.products.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateProductDto) { return this.products.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) { return this.products.remove(id); }
}