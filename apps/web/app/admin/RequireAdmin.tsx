'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useAuthHydrated } from '@/store/auth';

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return; // 等等 hydration 完成
    if (!user) {
      router.replace('/login'); // 未登入 → 去登入
      return;
    }
    if (user.role !== 'admin') {
      router.replace('/'); // 不是 admin → 回首頁
    }
  }, [hydrated, user, router]);

  if (!hydrated) return <main className="p-6">檢查登入中…</main>;
  if (!user || user.role !== 'admin') return null;

  return <>{children}</>;
}
