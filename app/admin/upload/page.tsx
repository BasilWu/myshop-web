'use client';

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

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        newMessages.push(`✅ ${file.name} 上傳成功`);
        newUrls.push(data.url);
      } catch (err: any) {
        console.error('Upload failed:', err);
        newMessages.push(`❌ ${file.name} 失敗: ${err.message}`);
      }
    }

    setMessages(newMessages);
    setImageUrls(newUrls);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>多檔案上傳</h1>

      <input type="file" multiple onChange={handleChange} disabled={loading} />

      {loading && <p>⏳ 上傳中...</p>}

      {messages.length > 0 && (
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      {imageUrls.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>預覽：</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Uploaded ${i}`}
                style={{ maxWidth: '200px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
