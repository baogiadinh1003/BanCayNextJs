import Link from 'next/link';
import { ProductDetailClient } from '@/components/features/products';
import { ROUTES } from '@/constants/routes';
import { getProductById } from '@/services/products';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-3xl font-bold">San pham khong hop le</h1>
        <Link href={ROUTES.PRODUCTS} className="btn-primary inline-block">
          Quay ve danh sach san pham
        </Link>
      </div>
    );
  }

  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-3xl font-bold">Khong tim thay san pham</h1>
        <Link href={ROUTES.PRODUCTS} className="btn-primary inline-block">
          Quay ve danh sach san pham
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailClient product={product} />
  );
}
