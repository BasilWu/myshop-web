import './globals.css';
import MainHeader from '../components/main-header/main-header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
