'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import { useCartStore } from '@/store/cart';
import { useAuthStore, useAuthHydrated } from '@/store/auth';

export default function MainHeader() {
  const { items } = useCartStore();
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  const hydrated = useAuthHydrated();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          B-Shop
        </Link>
        <nav className={classes.nav}>
          <ul>
            {/* 顯示目前登入者 */}
            <li>Hello, {user ? user.name : '訪客'}</li>
            <li>
              <NavLink href="/products">Browse Products</NavLink>
            </li>
            <li>
              <NavLink href="/community">Shopping Community</NavLink>
            </li>
            <li>
              <NavLink href="/cart">
                🛒 Cart {totalQty > 0 && `(${totalQty})`}
              </NavLink>
            </li>

            {!hydrated ? (
              <li className="opacity-70">檢查登入中…</li>
            ) : user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <NavLink href="/admin/products">後台</NavLink>
                  </li>
                )}
                <li>
                  <button onClick={logout} className="underline">
                    登出
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink href="/login">登入</NavLink>
                </li>
                {/* <li><NavLink href="/register">註冊</NavLink></li> */}
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
