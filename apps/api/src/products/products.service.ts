import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';

export type ProductEntity = {
  id: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  stock?: number;
};

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [
    { id: '1', name: 'iPhone 15', price: 29900, stock: 5, images: [] },
    { id: '2', name: 'iPad Air', price: 19900, stock: 8, images: [] },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const p = this.products.find((x) => x.id === id);
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  create(input: Omit<ProductEntity, 'id'>) {
    const id = (this.products.length + 1).toString();
    const entity: ProductEntity = { id, ...input, stock: input.stock ?? 0 };
    this.products.push(entity);
    return entity;
  }
  
  update(id: string, dto: UpdateProductDto) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found');
    this.products[idx] = { ...this.products[idx], ...dto };
    return this.products[idx];
  }

  remove(id: string) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Product not found');
    const [deleted] = this.products.splice(idx, 1);
    return deleted;
  }
}