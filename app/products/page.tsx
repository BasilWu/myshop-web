import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type Product = { id: string; name: string; price: number };

export default async function ProductsPage() {
  const res = await fetch(`${API}/products`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const items = (await res.json()) as Product[];

  return (
    <main className="p-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.id}`}
          className="rounded-xl border p-4 shadow hover:bg-gray-50 transition block"
        >
          <h2 className="font-semibold">{p.name}</h2>
          <p className="text-sm opacity-70">NT$ {p.price}</p>
        </Link>
      ))}
    </main>
  );
}
