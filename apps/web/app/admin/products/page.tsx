'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

type Product = { id: string; name: string; price: number; stock: number };

export default function AdminProductsPage() {
  const token = useAuthStore((s) => s.token);

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    void loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch(`${API}/products`, { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (Array.isArray(data)) setProducts(data);
    else if (Array.isArray(data?.products)) setProducts(data.products);
    else setProducts([]);
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return setErr('未登入或無權限');
    try {
      setErr(null);
      setLoading(true);
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock || 0),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || '建立失敗');
      setName('');
      setPrice('');
      setStock('');
      await loadProducts();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeProduct(id: string) {
    if (!token) return setErr('未登入或無權限');
    if (!confirm('確定刪除？')) return;
    const res = await fetch(`${API}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.message || '刪除失敗');
      return;
    }
    await loadProducts();
  }

  async function updateProduct(p: Product, patch: Partial<Product>) {
    if (!token) return setErr('未登入或無權限');
    const res = await fetch(`${API}/products/${p.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.message || '更新失敗');
      return;
    }
    await loadProducts();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">產品管理</h1>

      {err && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {err}
        </div>
      )}

      <form
        onSubmit={createProduct}
        className="mt-6 grid grid-cols-4 gap-2 items-end"
      >
        <input
          className="border rounded p-2 col-span-2"
          placeholder="產品名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded p-2"
          type="number"
          min="0"
          placeholder="價格"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === '' ? '' : Number(e.target.value))
          }
          required
        />
        <input
          className="border rounded p-2"
          type="number"
          min="0"
          placeholder="庫存"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value === '' ? '' : Number(e.target.value))
          }
        />
        <button
          disabled={loading}
          className="col-span-4 border rounded p-2 bg-black text-white disabled:opacity-60"
        >
          {loading ? '建立中…' : '新增產品'}
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">
                ${p.price} ・ 庫存 {p.stock}
              </div>
            </div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  const v = prompt('新名稱', p.name);
                  if (v && v !== p.name) updateProduct(p, { name: v });
                }}
              >
                改名
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  const v = prompt('新價格', String(p.price));
                  if (v !== null && !Number.isNaN(Number(v)))
                    updateProduct(p, { price: Number(v) });
                }}
              >
                改價
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  const v = prompt('新庫存', String(p.stock));
                  if (v !== null && !Number.isNaN(Number(v)))
                    updateProduct(p, { stock: Number(v) });
                }}
              >
                改庫存
              </button>
              <button
                className="px-3 py-1 border rounded text-red-600"
                onClick={() => removeProduct(p.id)}
              >
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
