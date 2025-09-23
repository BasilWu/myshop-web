export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}
