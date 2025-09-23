import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: '1', name: '商品A', description: '描述A', price: 100, stock: 10, images: [] },
    { id: '2', name: '商品B', description: '描述B', price: 200, stock: 5, images: [] },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }
}