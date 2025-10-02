import { apiFetch } from '@/lib/api';
import type { Product } from '@/types/product';
import AddToCartInline from '../AddToCartInline';
import Image from 'next/image';

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  // ✅ 這裡 await params
  const { id } = await props.params;

  const product = await apiFetch<Product>(`/products/${id}`);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Image
        src={product.images?.[0] ?? '/placeholder.png'}
        alt={product.name}
        width={1200}
        height={400}
        className="w-full h-96 object-cover rounded mb-4 bg-gray-100"
        priority
      />

      <div className="mb-4 text-gray-600">{product.description}</div>
      <div className="mb-2">價格：${product.price}</div>
      <div className="mb-6">庫存：{product.stock}</div>

      <AddToCartInline
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.images?.[0] ?? null}
      />
    </main>
  );
}
