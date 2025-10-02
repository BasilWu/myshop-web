'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';

/**
 * 在使用 zustand persist 時，hydration 會在 client 端自動進行，
 * 這個元件只負責在掛載時「碰一下」 store，確保模組被載入即可。
 * 不需要也不應該再呼叫 restore()
 */
export default function AuthHydrator() {
  useEffect(() => {
    // 觸發載入（若已載入則無事發生）
    // 注意：這裡是 store 的靜態方法，不是 React hook
    useAuthStore.getState();
  }, []);

  return null;
}
