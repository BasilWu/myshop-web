'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

export default function MainHeader() {
  const { items } = useCartStore();
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  const { user, restore, logout } = useAuthStore();

  // 第一次掛載時從 localStorage 還原登入狀態
  useEffect(() => {
    restore();
  }, [restore]);

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          B-Shop
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/products">Browse Products</NavLink>
            </li>
            <li>
              <NavLink href="/community">Shopping Community</NavLink>
            </li>

            {/* admin 才顯示後台 */}
            {user?.role === 'admin' && (
              <li>
                <NavLink href="/admin/products">後台</NavLink>
              </li>
            )}

            <li>
              <NavLink href="/cart">
                🛒 Cart {totalQty > 0 && `(${totalQty})`}
              </NavLink>
            </li>

            {/* 右側帳號區 */}
            {!user ? (
              <>
                <li>
                  <NavLink href="/login">登入</NavLink>
                </li>
                <li>{/* <NavLink href="/register">註冊</NavLink> */}</li>
              </>
            ) : (
              <>
                <li className="text-sm opacity-80 px-2">
                  Hi, {user.name} ({user.role})
                </li>
                <li>
                  {/* 簡單的登出按鈕 */}
                  <button
                    onClick={logout}
                    className="px-3 py-1 rounded border hover:bg-gray-50"
                  >
                    登出
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
