'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useAuthHydrated } from '@/store/auth';

type Props = {
  children: React.ReactNode;
  /** 需要 admin 身份才可通過 */
  adminOnly?: boolean;
  /** 檢查中時要顯示的內容（可自訂） */
  fallback?: React.ReactNode;
};

export default function AuthGate({
  children,
  adminOnly = false,
  fallback = <main className="p-6">檢查登入中…</main>,
}: Props) {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return; // 等持久化還原完成再判斷
    if (!user) {
      router.replace('/login');
      return;
    }
    if (adminOnly && user.role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [hydrated, user, adminOnly, router]);

  if (!hydrated) return <>{fallback}</>;
  if (!user) return null; // 已導到 /login
  if (adminOnly && user.role !== 'admin') return null; // 已導到首頁

  return <>{children}</>;
}
