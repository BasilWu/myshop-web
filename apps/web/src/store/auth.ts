'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type User = { id: string; email: string; role: 'user' | 'admin'; name: string };

type AuthState = {
  user: User | null;
  token: string | null;
  login: (u: User, t: string) => void;
  logout: () => void;
};

// ✅ 用 persist 包起來；若未來某次改動移除 persist，下面的 hook 也能容錯
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => {
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      // version 改了會觸發 migrate；避免「State loaded from storage couldn't be migrated」
      version: 1,
      migrate: (persisted: any, currentVersion) => {
        // 這裡可以做型別轉換；先原樣回傳，至少不報錯
        return persisted;
      },
      // 重要：避免 hydration mismatch（先不要在 SSR 用到 store 值）
      skipHydration: false,
      partialize: (s) => ({ user: s.user, token: s.token }),
    },
  ),
);

/**
 * ✅ 安全的「hydrated」偵測：
 * - 有 persist 時：用 onFinishHydration/hasHydrated
 * - 沒 persist 或被 HMR 破壞時：直接在第一次 effect 設為 true
 */
export function useAuthHydrated() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const anyStore = useAuthStore as any;
    const api = anyStore.persist;

    if (api?.hasHydrated?.()) {
      setReady(true);
      return;
    }

    const unsub = api?.onFinishHydration?.(() => setReady(true));
    // 如果沒有 persist（api 為 undefined），直接視為 ready，避免報錯
    if (!api) setReady(true);

    return () => unsub?.();
  }, []);

  return ready;
}
