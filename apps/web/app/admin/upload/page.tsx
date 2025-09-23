'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';

type Uploaded = {
  url: string; // 後端回傳的完整 S3 URL
  key: string; // S3 物件 key
  name: string; // 原始檔名
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState<Uploaded[]>([]);

  const canUpload = useMemo(() => Boolean(API), []);

  const pushMsg = (m: string) =>
    setMessages((prev) => [m, ...prev].slice(0, 50));

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (!files.length) return;

      if (!API) {
        pushMsg('❌ 環境變數 NEXT_PUBLIC_API_BASE_URL 未設定');
        return;
      }

      setIsUploading(true);
      try {
        // 逐一或並行上傳：這裡用並行
        const results = await Promise.all(
          files.map(async (file) => {
            const form = new FormData();
            form.append('file', file);
            const res = await fetch(`${API}/upload`, {
              method: 'POST',
              body: form,
            });

            if (!res.ok) {
              const text = await res.text().catch(() => '');
              throw new Error(`上傳失敗：${file.name} (${res.status}) ${text}`);
            }

            const data = (await res.json()) as {
              url: string;
              key: string;
              bucket?: string;
            };
            return {
              url: data.url,
              key: data.key,
              name: file.name,
            } as Uploaded;
          }),
        );

        setUploaded((prev) => [...results, ...prev]);
        results.forEach((r) => pushMsg(`✅ ${r.name} 上傳成功`));
      } catch (err: any) {
        pushMsg(`❌ ${err?.message ?? '上傳失敗'}`);
      } finally {
        setIsUploading(false);
        // 允許重選同一檔案
        e.target.value = '';
      }
    },
    [],
  );

  return (
    <main className="min-h-screen px-6 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">多檔案上傳</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm opacity-80">
          選擇檔案（可多選）
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          disabled={!canUpload || isUploading}
          className="block cursor-pointer"
        />
        {!canUpload && (
          <p className="mt-2 text-red-400">
            請在 <code>.env.local</code> 設定{' '}
            <code>NEXT_PUBLIC_API_BASE_URL</code>（例：
            <code>http://localhost:3001</code>）
          </p>
        )}
      </div>

      <div className="mb-6">
        {isUploading ? (
          <p className="text-sm text-amber-300">⏳ 上傳中，請稍候…</p>
        ) : (
          <p className="text-sm text-green-300">✅ 就緒</p>
        )}
      </div>

      {/* 上傳訊息（最新在上） */}
      <ul className="mb-8 space-y-1 text-sm">
        {messages.map((m, i) => (
          <li
            key={i}
            className={m.startsWith('✅') ? 'text-emerald-300' : 'text-red-300'}
          >
            {m}
          </li>
        ))}
      </ul>

      {/* 圖片預覽 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">預覽</h2>
        {uploaded.length === 0 ? (
          <p className="opacity-70">尚無已上傳圖片。</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uploaded.map((u, i) => (
              <figure
                key={`${u.key}-${i}`}
                className="rounded-2xl overflow-hidden bg-neutral-900/60 ring-1 ring-white/10"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={u.url}
                    alt={u.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                    priority={i < 3} // 前三張優先載入
                  />
                </div>
                <figcaption className="p-3 text-xs truncate opacity-80">
                  {u.name}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
