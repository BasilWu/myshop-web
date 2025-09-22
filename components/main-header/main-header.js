'use client';

import Link from 'next/link';
import NavLink from './nav-link';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import { useCart } from '@/store/cart'; // ← 引入 cart store

export default function MainHeader() {
  const { items } = useCart();
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
          </ul>
        </nav>
      </header>
    </>
  );
}
