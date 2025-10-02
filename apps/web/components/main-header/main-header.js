'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

export default function MainHeader() {
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
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

            {!user && (
              <li>
                <NavLink href="/login">登入</NavLink>
              </li>
            )}

            {user && (
              <>
                {user.role === 'admin' && (
                  <li>
                    <NavLink href="/admin/products">後台</NavLink>
                  </li>
                )}
                <li className="text-sm opacity-80">
                  {user.name || user.email}
                </li>
                <li>
                  <button onClick={logout} className="underline">
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
