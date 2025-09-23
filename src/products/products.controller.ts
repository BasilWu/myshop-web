import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const p = this.svc.findOne(id);
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }
}
