import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ROUTES } from '@/constants/routes';
import { getFeaturedProducts } from '@/services/products';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl p-16 md:p-24 shadow-2xl">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Chào mừng đến BanCay 🌿
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Cửa hàng bán cây cảnh, cây ăn quả, cây xanh online chất lượng cao
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href={ROUTES.PRODUCTS} className="btn-primary">
              Khám phá sản phẩm
            </Link>
            <Link href={ROUTES.ABOUT} className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 transition">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="section-title">✨ Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h2 className="section-title">🎯 Lợi ích khi mua tại BanCay</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-3 gradient-text">Giao hàng nhanh</h3>
            <p className="text-gray-600">Giao hàng trong vòng 24h tại TP.HCM</p>
          </div>
          <div className="card p-8 text-center hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-3 gradient-text">Chất lượng đảm bảo</h3>
            <p className="text-gray-600">Tất cả sản phẩm được kiểm định kỹ lưỡng</p>
          </div>
          <div className="card p-8 text-center hover:scale-105 hover:shadow-2xl">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-3 gradient-text">Hỗ trợ 24/7</h3>
            <p className="text-gray-600">Đội tư vấn sẵn sàng giúp bạn</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-16 text-center border border-emerald-200">
        <h2 className="text-4xl font-bold mb-4 gradient-text">Bạn chưa tìm thấy sản phẩm yêu thích?</h2>
        <p className="text-xl text-gray-600 mb-8">Khám phá toàn bộ bộ sưu tập cây cảnh đa dạng của chúng tôi</p>
        <Link href={ROUTES.PRODUCTS} className="btn-primary inline-block text-lg">
          Xem tất cả sản phẩm
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center py-12">
        <div className="p-6">
          <div className="text-5xl font-bold gradient-text mb-2">2000+</div>
          <p className="text-gray-600 font-semibold">Loại cây</p>
        </div>
        <div className="p-6">
          <div className="text-5xl font-bold gradient-text mb-2">5000+</div>
          <p className="text-gray-600 font-semibold">Khách hàng</p>
        </div>
        <div className="p-6">
          <div className="text-5xl font-bold gradient-text mb-2">10+</div>
          <p className="text-gray-600 font-semibold">Năm kinh nghiệm</p>
        </div>
        <div className="p-6">
          <div className="text-5xl font-bold gradient-text mb-2">100%</div>
          <p className="text-gray-600 font-semibold">Chất lượng</p>
        </div>
      </section>
    </div>
  );
}