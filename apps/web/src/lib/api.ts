// apps/web/src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers = new Headers(init.headers as any);
  if (!headers.has('Content-Type'))
    headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    /* 可能沒有 body */
  }

  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}
