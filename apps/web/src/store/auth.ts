'use client';

import { create } from 'zustand';

export type Role = 'user' | 'admin';
export type AuthUser = { id: string; email: string; role: Role; name: string };

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  restore: () => void;
};

const KEY = 'bshop_auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, JSON.stringify({ user, token }));
    }
    set({ user, token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KEY);
    }
    set({ user: null, token: null });
  },

  restore: () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.user && parsed?.token) {
        set({ user: parsed.user as AuthUser, token: parsed.token as string });
      }
    } catch {
      // ignore
    }
  },
}));
