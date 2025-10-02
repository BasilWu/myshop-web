'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

export default function AuthHydrator() {
  const restore = useAuthStore((s) => s.restore);
  useEffect(() => {
    // 第一次進站或刷新時，先把 user/token 從 localStorage 拉回來
    restore();
  }, [restore]);

  return null;
}
