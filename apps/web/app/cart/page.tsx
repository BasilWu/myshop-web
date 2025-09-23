'use client';
import { useCart } from '@/store/cart';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, remove, clear } = useCart();

  return (
    <main className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">購物車</h1>
        <Link href="/products" className="text-sm underline">
          繼續逛逛
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="opacity-70">目前沒有商品</div>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between border rounded p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm opacity-70">× {i.qty}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>NT$ {i.price * i.qty}</div>
                  <button
                    onClick={() => remove(i.id)}
                    className="text-sm underline"
                  >
                    移除
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="font-medium">總計：NT$ {total()}</div>
            <div className="flex items-center gap-3">
              <button onClick={clear} className="px-3 py-2 border rounded">
                清空
              </button>
              <button className="px-3 py-2 border rounded bg-black text-white">
                前往結帳（之後接）
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
