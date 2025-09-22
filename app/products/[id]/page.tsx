const API = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type Product = { id: string; name: string; price: number };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params; // ✅ 必須 await

  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return <p className="p-6 text-red-500">Failed to load product.</p>;
  }

  const p = (await res.json()) as Product;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
      <p className="text-lg">NT$ {p.price}</p>
      <p className="mt-4 text-sm text-gray-500">商品 ID: {p.id}</p>
    </main>
  );
}