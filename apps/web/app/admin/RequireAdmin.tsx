'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!user) {
      router.replace('/login?next=/admin/products'); // 未登入才去 login（保留 next）
      return;
    }
    // 已登入但不是 admin：不跳轉，渲染「無權限」訊息由子頁面處理
  }, [hasHydrated, user, router]);

  if (!hasHydrated) return <main className="p-6">檢查登入中…</main>;
  if (!user) return <main className="p-6">前往登入中…</main>;
  if (user.role !== 'admin') return <main className="p-6">無權限</main>;

  return <>{children}</>;
}
