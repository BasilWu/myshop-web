const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
    }
    return res.json() as Promise<T>;
  } catch (err: any) {
    // 這裡保留詳細錯誤，方便你看到是哪個 URL 連不上
    console.error('[api] fetch failed:', {
      url: `${API}${path}`,
      message: err?.message,
    });
    throw err;
  } finally {
    clearTimeout(id);
  }
}
