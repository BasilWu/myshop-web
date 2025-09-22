'use client';
import { useCart } from '@/store/cart';

export default function AddToCartInline({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) {
  const add = useCart((s) => s.add);
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() => {
        add({ id, name, price, qty: 1 });
        alert('加入成功！');
      }}
    >
      加入購物車
    </button>
  );
}
