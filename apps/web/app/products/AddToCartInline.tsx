'use client';

import { useCartStore } from '@/store/cart';
import { useState } from 'react';

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
};

export default function AddToCartInline({ id, name, price, image }: Props) {
  const add = useCartStore((s) => s.add);
  const [msg, setMsg] = useState<string | null>(null);

  const handleAdd = () => {
    add({ id, name, price, image });
    setMsg(`已將「${name}」加入購物車`);
    // 幾秒後自動消失
    setTimeout(() => setMsg(null), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        加入購物車
      </button>

      {msg && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-green-600 text-white text-sm px-3 py-2 rounded shadow animate-fade-in">
          {msg}
        </div>
      )}
    </div>
  );
}
