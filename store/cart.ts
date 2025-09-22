import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
        ),
      });
    } else {
      set({ items: [...items, item] });
    }
  },
  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
