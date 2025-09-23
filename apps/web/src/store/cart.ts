'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string | null;
};

type CartStore = {
  items: CartItem[];
  add: (p: {
    id: string;
    name: string;
    price: number;
    image?: string | null;
  }) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) =>
        set((s) => {
          const exists = s.items.find((i) => i.id === p.id);
          if (exists) {
            return {
              items: s.items.map((i) =>
                i.id === p.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...s.items, { ...p, qty: 1 }] };
        }),
      remove: (id) =>
        set((s) => ({
          items: s.items.filter((i) => i.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart-store' }, // ✅ localStorage 持久化
  ),
);

// （可選）為舊程式保留相容 API
export function useCart() {
  return useCartStore();
}
