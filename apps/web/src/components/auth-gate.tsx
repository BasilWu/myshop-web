'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore, useAuthHydrated } from '@/store/auth';

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAuthHydrated();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return; // 等待狀態還原完畢
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (user.role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [hydrated, user, router, pathname]);

  if (!hydrated) return <main className="p-6">檢查登入中…</main>;
  if (!user) return null; // 正在 redirect
  if (user.role !== 'admin') return null;

  return <>{children}</>;
}
