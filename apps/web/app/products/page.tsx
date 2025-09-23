import Link from 'next/link';
import { api } from '@/lib/api';
import type { Product } from '@/types/product';

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await api<Product[]>('/products');

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">商品</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border rounded-lg p-4 hover:shadow cursor-pointer">
              <div className="w-full aspect-square bg-gray-100 rounded mb-3 overflow-hidden">
                {p.images?.[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500 line-clamp-2">
                {p.description}
              </div>
              <div className="mt-1">
                價格：${p.price}　庫存：{p.stock}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
