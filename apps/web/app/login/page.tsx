'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, useAuthHydrated } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const hydrated = useAuthHydrated();

  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('admin@basil.com');
  const [password, setPassword] = useState('888888');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (!hydrated) return;
    if (user) router.replace(redirect);
  }, [hydrated, user, redirect, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      // 後端回傳 { token, user }
      login(data.user, data.token);
      router.replace(redirect);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!hydrated)
    return <main className="max-w-md mx-auto p-6">檢查登入中…</main>;
  if (user)
    return <main className="max-w-md mx-auto p-6">已登入，導向中…</main>;

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
        沒有帳號？
        <Link className="underline" href="/register">
          去註冊
        </Link>
      </p>
    </main>
  );
}
