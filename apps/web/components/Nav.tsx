'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function Nav() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <header className="border-b">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/products" className="font-semibold">
          MyShop
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:underline">
            商品
          </Link>
          <Link href="/cart" className="hover:underline">
            購物車 ({count})
          </Link>
        </div>
      </nav>
    </header>
  );
}
