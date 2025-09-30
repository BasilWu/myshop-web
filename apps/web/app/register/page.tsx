'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('userx@test.com');
  const [name, setName] = useState('User X');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Register failed');
      // 後端回傳 { token, user }
      login(data.user, data.token);
      router.push('/');
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">註冊</h1>
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
          placeholder="名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? '送出中…' : '註冊'}
        </button>
      </form>
      <p className="text-sm">
        已經有帳號？
        <Link className="underline" href="/login">
          去登入
        </Link>
      </p>
    </main>
  );
}
