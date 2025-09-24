'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // 讀取商品
  async function loadProducts() {
    const res = await fetch('http://localhost:3001/products');
    const data = await res.json();

    // 確保一定是陣列
    if (Array.isArray(data)) {
      setProducts(data);
    } else if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else {
      console.error('Unexpected API response:', data);
      setProducts([]); // 避免 map 出錯
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // 新增商品
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return alert('請先登入');
    const res = await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });
    if (res.ok) {
      setForm({ name: '', price: '', stock: '' });
      loadProducts();
    } else {
      alert('新增失敗');
    }
  }

  // 刪除商品
  async function handleDelete(id: string) {
    if (!token) return alert('請先登入');
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      loadProducts();
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">商品管理</h1>

      <form onSubmit={handleAdd} className="mt-4 space-x-2">
        <input
          placeholder="名稱"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="價格"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="庫存"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          新增
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {products.map((p) => (
          <li key={p.id} className="flex justify-between border p-2">
            <span>
              {p.name} - ${p.price} (庫存: {p.stock})
            </span>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white px-3"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
