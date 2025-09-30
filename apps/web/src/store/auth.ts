'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Role = 'user' | 'admin';
type User = { id: string; email: string; role: Role; name: string };

type AuthState = {
  token: string | null;
  user: User | null;
  login: (p: { token: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth', // localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
