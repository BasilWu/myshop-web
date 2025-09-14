import { create } from "zustand";

type Item = { id: string; name: string; price: number; qty: number };
type State = {
  items: Item[];
  add: (it: Item) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<State>((set, get) => ({
  items: [],
  add: (it) =>
    set((s) => {
      const ex = s.items.find((x) => x.id === it.id);
      if (ex) {
        return { items: s.items.map((x) => (x.id === it.id ? { ...x, qty: x.qty + it.qty } : x)) };
      }
      return { items: [...s.items, it] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, x) => sum + x.price * x.qty, 0),
}));
