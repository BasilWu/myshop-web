'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (u: User, t: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // 過往你手刻 restore() 版本不相容，這裡補上 migrate，避免
      // "State loaded from storage couldn't be migrated..." 警告
      migrate: (state: any, version) => {
        // 舊版若有 hydrated/restore 等欄位，直接忽略
        const next: Partial<AuthState> = {};
        if (state?.user !== undefined) next.user = state.user;
        if (state?.token !== undefined) next.token = state.token;
        return { user: next.user ?? null, token: next.token ?? null };
      },
      // serialize / deserialize 可省略，讓默認 JSON 即可
    },
  ),
);

// ✅ 小工具：判斷是否已從 storage 還原
export function useAuthHydrated(): boolean {
  // 注意：persist 擴展會在 hook 上注入 persist 屬性
  // 直接用任何 selector 都會觸發訂閱，這裡取 user 只是為了讓 component 刷新。
  useAuthStore((s) => s.user);
  // @ts-ignore
  return useAuthStore.persist?.hasHydrated?.() === true;
}
