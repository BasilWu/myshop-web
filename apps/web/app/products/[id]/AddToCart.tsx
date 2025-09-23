'use client';

import type { Product } from '@/types/product';
import { useCartStore } from '@/store/cart';

export default function AddToCart({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.add);

  return (
    <button
      onClick={() => addToCart(product)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      加入購物車
    </button>
  );
}
