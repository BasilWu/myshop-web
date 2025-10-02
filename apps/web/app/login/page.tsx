'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// 外層只負責提供 Suspense 邊界
export default function Page() {
  return (
    <Suspense fallback={<main className="p-6">載入中…</main>}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get('next') || '/';

  const { login, restore, user } = useAuthStore() as any;

  const [email, setEmail] = useState('user3@test.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (typeof restore === 'function') restore();
  }, [restore]);

  useEffect(() => {
    if (user) router.push(nextPath);
  }, [user, router, nextPath]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      // 後端回傳 { token, user }
      // 你的 store 現在 login 只吃 user；token 另外存在 localStorage，供後台頁取用
      if (data?.token) localStorage.setItem('token', data.token);
      login?.(data.user);

      router.push(nextPath);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">登入</h1>
      {err && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {err}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          type="password"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="w-full border rounded p-2 bg-black text-white disabled:opacity-60"
        >
          {loading ? '登入中…' : '登入'}
        </button>
      </form>
      <p className="text-sm">
        還沒有帳號？
        <Link className="underline" href="/register">
          去註冊
        </Link>
      </p>
    </main>
  );
}
