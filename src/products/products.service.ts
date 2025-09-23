import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly items = [
    { id: 'p1', name: 'T-shirt', price: 590 },
    { id: 'p2', name: 'Cap',    price: 390 },
    { id: 'p3', name: 'Shoes',  price: 2590 },
  ];
  findAll() { return this.items; }
  findOne(id: string) { return this.items.find(i => i.id === id); }
}
