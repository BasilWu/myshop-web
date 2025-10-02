import { useAuthStore } from '@/store/auth';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function apiFetch<T = any>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    cache: 'no-store',
  });

  // 2xx
  if (res.ok) {
    // 如果內容是空的（204），直接回傳 undefined as any
    if (res.status === 204) return undefined as any;
    return (await res.json()) as T;
  }

  // 非 2xx
  let errMsg = `${res.status} ${res.statusText}`;
  try {
    const j = await res.json();
    errMsg = j?.message || errMsg;
  } catch {}
  throw new Error(errMsg);
}
export default { apiFetch };
