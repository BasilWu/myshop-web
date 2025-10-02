'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { apiFetch } from '@/lib/api';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsAdminPage() {
  const router = useRouter();
  const { user, restore } = useAuthStore();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 權限保護：非 admin 直接導回首頁
  useEffect(() => {
    restore();
  }, [restore]);

  const isAdmin = useMemo(() => user?.role === 'admin', [user?.role]);

  useEffect(() => {
    if (user === null) return; // 還在 restore
    if (!isAdmin) {
      router.replace('/'); // 非 admin 不允許
    }
  }, [user, isAdmin, router]);

  // 載入清單
  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await apiFetch<{ products: Product[] }>('/products');
        setItems(Array.isArray(data?.products) ? data.products : []);
      } catch (e: any) {
        setErr(e.message || '載入失敗');
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [isAdmin]);

  async function onCreate(formData: FormData) {
    setCreating(true);
    setErr(null);
    try {
      const body = {
        name: String(formData.get('name') || ''),
        price: Number(formData.get('price') || 0),
        stock: Number(formData.get('stock') || 0),
      };
      const p = await apiFetch<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setItems((prev) => [p, ...prev]);
      (document.getElementById('create-form') as HTMLFormElement)?.reset();
    } catch (e: any) {
      setErr(e.message || '新增失敗');
    } finally {
      setCreating(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm('確定刪除？')) return;
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e.message || '刪除失敗');
    }
  }

  async function onUpdate(p: Product, patch: Partial<Product>) {
    try {
      const updated = await apiFetch<Product>(`/products/${p.id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
      setItems((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
    } catch (e: any) {
      alert(e.message || '更新失敗');
    }
  }

  if (!isAdmin) return null; // 正在 redirect 或不是 admin

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">後台：商品管理</h1>

      {err && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {err}
        </div>
      )}

      <section className="mt-6">
        <h2 className="font-medium mb-2">新增商品</h2>
        <form
          id="create-form"
          className="grid grid-cols-4 gap-2 items-center"
          action={async (fd) => onCreate(fd)}
        >
          <input
            name="name"
            placeholder="名稱"
            className="border rounded p-2 col-span-2"
            required
          />
          <input
            name="price"
            type="number"
            min={0}
            placeholder="價格"
            className="border rounded p-2"
            required
          />
          <input
            name="stock"
            type="number"
            min={0}
            placeholder="庫存"
            className="border rounded p-2"
            required
          />
          <button
            disabled={creating}
            className="col-span-4 mt-2 border rounded p-2 bg-black text-white disabled:opacity-60"
          >
            {creating ? '新增中…' : '新增'}
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="font-medium mb-2">商品列表</h2>
        {loading ? (
          <p>載入中…</p>
        ) : items.length === 0 ? (
          <p>目前沒有商品</p>
        ) : (
          <ul className="space-y-2">
            {items.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 border p-2 rounded"
              >
                <span className="flex-1">
                  <b>{p.name}</b> — ${p.price}（庫存：{p.stock}）
                </span>
                {/* 簡易 inline 更新：各欄位分別送 PATCH */}
                <input
                  className="w-28 border rounded p-1"
                  defaultValue={p.name}
                  onBlur={(e) => {
                    const v = e.currentTarget.value.trim();
                    if (v && v !== p.name) onUpdate(p, { name: v });
                  }}
                />
                <input
                  className="w-24 border rounded p-1"
                  type="number"
                  defaultValue={p.price}
                  onBlur={(e) => {
                    const v = Number(e.currentTarget.value);
                    if (!Number.isNaN(v) && v !== p.price)
                      onUpdate(p, { price: v });
                  }}
                />
                <input
                  className="w-20 border rounded p-1"
                  type="number"
                  defaultValue={p.stock}
                  onBlur={(e) => {
                    const v = Number(e.currentTarget.value);
                    if (!Number.isNaN(v) && v !== p.stock)
                      onUpdate(p, { stock: v });
                  }}
                />
                <button
                  onClick={() => onDelete(p.id)}
                  className="px-3 py-1 rounded border hover:bg-red-50"
                >
                  刪除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
