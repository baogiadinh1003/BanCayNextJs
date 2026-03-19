import { ProductsCatalog } from '@/components/features/products';
import { getAllProducts } from '@/services/products';

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Sản phẩm</h1>
        <p className="text-gray-600">Khám phá bộ sưu tập cây cảnh đa dạng của chúng tôi</p>
      </div>

      <ProductsCatalog products={products} />
    </div>
  );
}
