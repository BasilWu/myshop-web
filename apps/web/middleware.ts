import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 只攔 /admin/* 路徑
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();

  const token = req.cookies.get('myshop_token')?.value;
  const role = req.cookies.get('myshop_role')?.value;

  // 沒 token → 去登入（帶 next 回跳）
  if (!token) {
    const next = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    const url = new URL(`/login?next=${next}`, req.url);
    return NextResponse.redirect(url);
  }

  // 有登入但不是 admin → 擋回首頁
  if (role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
