import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="mb-6">Your one-stop shop for all your needs!</p>
        <Link
          href="/products"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Products
        </Link>
      </main>
    </>
  );
}
