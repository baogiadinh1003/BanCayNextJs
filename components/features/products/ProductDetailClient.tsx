'use client';

import Link from 'next/link';
import { useState, type FC } from 'react';
import { ROUTES } from '@/constants/routes';
import { useCart } from '@/lib/store';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: FC<ProductDetailClientProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const stock = product.stock ?? 1;
  const rating = product.rating ?? 0;
  const reviews = product.reviews ?? 0;
  const details = product.details ?? [];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-sm text-gray-600">
        <Link href={ROUTES.HOME} className="hover:text-primary">Trang chu</Link>
        <span className="mx-2">/</span>
        <Link href={ROUTES.PRODUCTS} className="hover:text-primary">San pham</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">{'*'.repeat(Math.floor(rating))}</div>
              <span className="text-gray-600">{rating} ({reviews} danh gia)</span>
            </div>
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-4xl font-bold text-primary">{product.price.toLocaleString('vi-VN')} đ</p>
            <p className="text-sm text-gray-600 mt-2">
              Tinh trang: <span className="text-green-600 font-semibold">Con hang ({stock} san pham)</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">So luong</label>
              <div className="flex items-center border rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                <span className="px-6 py-2">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="px-4 py-2 hover:bg-gray-100">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              {added ? 'Da them vao gio' : 'Them vao gio'}
            </button>

            <Link href={ROUTES.CART} className="block text-center border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition">
              Xem gio hang
            </Link>
          </div>

          {details.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <h3 className="font-bold text-lg mb-3">Dac diem noi bat</h3>
              {details.map((detail) => (
                <div key={detail} className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">v</span>
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
