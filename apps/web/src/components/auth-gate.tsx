'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

export default function AuthGate({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  const router = useRouter();
  const { user, hasHydrated } = useAuthStore();

  // 等 rehydrate 完成
  if (!hasHydrated) return <main className="p-6">檢查登入中…</main>;

  // 未登入 → 導到登入頁
  if (!user) {
    if (typeof window !== 'undefined') router.replace('/login');
    return null;
  }

  // 需 admin 權限
  if (adminOnly && user.role !== 'admin') {
    if (typeof window !== 'undefined') router.replace('/');
    return null;
  }

  return <>{children}</>;
}
