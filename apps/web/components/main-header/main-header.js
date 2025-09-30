'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';

export default function MainHeader() {
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();

  //（可選）避免 hydration 閃爍
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

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
            <li>
              <NavLink href="/cart">
                🛒 Cart {totalQty > 0 && `(${totalQty})`}
              </NavLink>
            </li>

            {ready && user?.role === 'admin' && (
              <li>
                <NavLink href="/admin/products">Admin</NavLink>
              </li>
            )}

            {ready &&
              (user ? (
                <li>
                  <button onClick={logout}>登出</button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink href="/login">登入</NavLink>
                  </li>
                  {/* <li><NavLink href="/register">註冊</NavLink></li> */}
                </>
              ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
