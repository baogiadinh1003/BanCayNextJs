'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="card group h-full flex flex-col animate-fade-in hover:shadow-glow-lg">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`${ROUTES.PRODUCTS}/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold gradient-text">
            {product.price.toLocaleString('vi-VN')} ₫
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            isAdded
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'btn-primary'
          }`}
        >
          {isAdded ? '✓ Đã thêm vào giỏ' : '🛒 Thêm vào giỏ'}
        </button>
      </div>
    </div>
  );
}
