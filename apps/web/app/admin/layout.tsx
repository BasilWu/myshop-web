import AuthGate from '@/components/AuthGate';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate adminOnly>{children}</AuthGate>;
}
