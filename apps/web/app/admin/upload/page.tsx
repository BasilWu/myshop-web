'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function UploadPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setMessages([]);
    setImageUrls([]);

    const newMessages: string[] = [];
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('file', file);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
          {
            method: 'POST',
            body: form,
          },
        );
        if (!res.ok)
          throw new Error(`Upload failed: ${res.status} ${res.statusText}`);

        const data: { url: string } = await res.json();
        newMessages.push(`✅ ${file.name} 上傳成功`);
        newUrls.push(data.url);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        newMessages.push(`❌ ${file.name} 失敗: ${msg}`);
        // 同步也在 console 幫你看
        // eslint-disable-next-line no-console
        console.error('Upload failed:', err);
      }
    }

    setMessages(newMessages);
    setImageUrls(newUrls);
    setLoading(false);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">多檔案上傳</h1>
      <input type="file" multiple onChange={handleChange} disabled={loading} />
      {loading && <p>⏳ 上傳中...</p>}

      {messages.length > 0 && (
        <ul className="list-disc pl-5">
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}

      {imageUrls.length > 0 && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative w-64 h-40">
              <Image
                src={url}
                alt={`uploaded-${i}`}
                fill
                sizes="256px"
                className="object-contain rounded border"
                unoptimized
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
