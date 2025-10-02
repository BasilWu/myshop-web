'use client';

import AuthGate from '@/components/auth-gate';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate adminOnly>{children}</AuthGate>;
}
