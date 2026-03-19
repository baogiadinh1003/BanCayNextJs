'use client';

import { useMemo, useState, type FC } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCT_CATEGORIES } from '@/constants/products';
import type { Product, ProductCategory } from '@/types';

interface ProductsCatalogProps {
  products: Product[];
}

export const ProductsCatalog: FC<ProductsCatalogProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Danh muc</h3>
        <div className="flex flex-wrap gap-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedCategory === category.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Khong tim thay san pham</p>
        </div>
      )}
    </div>
  );
};
