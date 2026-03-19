import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-16">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌿</span>
              <h3 className="text-2xl font-bold gradient-text">BanCay</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Cửa hàng bán cây cảnh, cây ăn quả, cây xanh online chất lượng cao với dịch vụ tuyệt vời.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in [animation-delay:0.1s]">
            <h4 className="text-lg font-bold mb-6 gradient-text">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li><Link href={ROUTES.HOME} className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Trang chủ</Link></li>
              <li><Link href={ROUTES.PRODUCTS} className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Sản phẩm</Link></li>
              <li><Link href={ROUTES.ABOUT} className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Về chúng tôi</Link></li>
              <li><Link href={ROUTES.CONTACT} className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Liên hệ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in [animation-delay:0.2s]">
            <h4 className="text-lg font-bold mb-6 gradient-text">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Câu hỏi thường gặp</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Điều khoản sử dụng</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-emerald-400 hover:translate-x-1 font-semibold transition-all duration-300">→ Chính sách hoàn trả</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in [animation-delay:0.3s]">
            <h4 className="text-lg font-bold mb-6 gradient-text">Liên hệ</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <span>📍</span> TP.HCM, Việt Nam
              </li>
              <li className="flex items-center gap-2 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <span>📞</span> (028) 1234-5678
              </li>
              <li className="flex items-center gap-2 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <span>✉️</span> info@bancay.com
              </li>
              <li className="flex items-center gap-2 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <span>⏰</span> 8:00 - 18:00 hàng ngày
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Social & Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-4 mb-6 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-primary transition-all hover:scale-110 text-2xl">f</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-all hover:scale-110 text-2xl">📷</a>
            <a href="#" className="text-gray-400 hover:text-primary transition-all hover:scale-110 text-2xl">🐦</a>
          </div>
          <p className="text-gray-500 text-center">&copy; 2026 BanCay. Tất cả các quyền được bảo lưu. Phát triển với ❤️</p>
        </div>
      </div>
    </footer>
  );
}
