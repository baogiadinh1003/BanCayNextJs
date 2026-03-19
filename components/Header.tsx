'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';

export function Header() {
  const { getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItemsCount = getTotalItems();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
          <span className="text-3xl group-hover:animate-bounce">🌿</span>
          <span className="font-bold text-2xl gradient-text">BanCay</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href={ROUTES.PRODUCTS} className="text-gray-700 font-semibold hover:text-primary relative group">
            Sản phẩm
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href={ROUTES.ABOUT} className="text-gray-700 font-semibold hover:text-primary relative group">
            Về chúng tôi
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href={ROUTES.CONTACT} className="text-gray-700 font-semibold hover:text-primary relative group">
            Liên hệ
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href={ROUTES.ADMIN} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-primary hover:text-white transition-all duration-300">
            Admin
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center gap-4">
          <Link href={ROUTES.CART} className="relative group">
            <button className="text-2xl group-hover:scale-110 transition-transform duration-300">
              🛒
            </button>
            {cartItemsCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl font-bold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="container py-4 space-y-3">
            <Link href={ROUTES.PRODUCTS} className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-semibold transition-all">
              Sản phẩm
            </Link>
            <Link href={ROUTES.ABOUT} className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-semibold transition-all">
              Về chúng tôi
            </Link>
            <Link href={ROUTES.CONTACT} className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-semibold transition-all">
              Liên hệ
            </Link>
            <Link href={ROUTES.ADMIN} className="block px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
