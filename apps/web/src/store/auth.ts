'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'user' | 'admin';
export type AuthUser = { id: string; email: string; name?: string; role: Role };

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth',
      skipHydration: true,
      partialize: (s) => ({ user: s.user, token: s.token }), // 只存必要欄位
      onRehydrateStorage: () => (state, error) => {
        // 無論成功失敗都把 hasHydrated 打開，避免永遠 false
        queueMicrotask(() => state?.setHasHydrated(true));
      },
    },
  ),
);
