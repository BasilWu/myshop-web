// apps/web/src/store/auth.ts
'use client';

import { create } from 'zustand';

export type Role = 'user' | 'admin';
export type User = { id: string; email: string; role: Role; name: string };

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void; // <<< 兩個參數
  logout: () => void;
  restore: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    // 持久化
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', token);
    }
    set({ user, token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
    set({ user: null, token: null });
  },

  restore: () => {
    if (typeof window === 'undefined') return;
    const u = localStorage.getItem('auth_user');
    const t = localStorage.getItem('auth_token');
    if (u && t) {
      try {
        const parsed = JSON.parse(u) as User;
        set({ user: parsed, token: t });
      } catch {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    }
  },
}));
