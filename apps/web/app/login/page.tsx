// apps/web/app/login/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// 外層只負責提供 Suspense 邊界，避免 Next.js build 時報錯
export default function LoginPage() {
  return (
    <Suspense fallback={<main className="max-w-md mx-auto p-6">載入中…</main>}>
      <LoginFormInner />
    </Suspense>
  );
}

function LoginFormInner() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/';

  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);

  const [email, setEmail] = useState('admin@basil.com'); // 方便測試
  const [password, setPassword] = useState('888888'); // 方便測試
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 已登入就直接導回
  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 你的 API 不需要 cookie，這行可省略；若未來要 same-site cookie 再加
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      // 後端回傳 { token, user }
      login(data.user, data.token);
      router.replace(next);
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
