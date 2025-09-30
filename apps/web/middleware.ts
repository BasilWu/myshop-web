import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    if (payload?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// 只攔截 /admin/*
export const config = { matcher: ['/admin/:path*'] };
