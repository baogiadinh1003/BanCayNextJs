'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = getTotalPrice();

  if (items.length === 0 && !isCheckout) {
    return (
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Giỏ hàng trống</h1>
        <p className="text-gray-600 text-xl mb-8">Giỏ hàng của bạn hiện chưa có sản phẩm</p>
        <div className="text-5xl mb-8">🛒</div>
        <Link href={ROUTES.PRODUCTS} className="btn-primary inline-block text-lg">
          Tiếp tục mua sắm →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-bold gradient-text mb-8">🛒 Giỏ hàng</h1>

      {!isCheckout ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="card cursor-default">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                <h2 className="text-2xl font-bold">Sản phẩm ({items.length})</h2>
              </div>
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.name}</h3>
                      <p className="gradient-text font-bold text-xl">
                        {item.price.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border-2 border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 font-bold"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-bold hover:scale-110 transition"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="card cursor-default p-8 sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 gradient-text">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between pb-4 border-b">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-bold text-lg">
                    {totalPrice.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                <div className="flex justify-between pb-4 border-b">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-bold text-lg text-emerald-600">Miễn phí</span>
                </div>
                <div className="flex justify-between pt-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                  <span className="text-lg font-bold">Tổng cộng:</span>
                  <span className="text-2xl font-bold gradient-text">
                    {totalPrice.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckout(true)}
                className="btn-primary w-full py-4 text-lg mb-3 font-bold"
              >
                💳 Tiến hành thanh toán
              </button>

              <Link href={ROUTES.PRODUCTS} className="block text-center px-4 py-3 border-2 border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 font-semibold transition">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card cursor-default p-8">
              <h2 className="text-3xl font-bold mb-8 gradient-text">📋 Thông tin giao hàng</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Họ và tên</label>
                    <input type="text" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none transition" placeholder="Nhập họ và tên" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Số điện thoại</label>
                    <input type="tel" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none transition" placeholder="Nhập số điện thoại" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <input type="email" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none transition" placeholder="Nhập email" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Địa chỉ giao hàng</label>
                  <textarea className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-emerald-500 outline-none transition" rows={4} placeholder="Nhập địa chỉ giao hàng chi tiết"></textarea>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-6">💳 Phương thức thanh toán</h3>
                  <div className="space-y-4">
                    <label className="flex items-center cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="radio" name="payment" className="w-5 h-5" defaultChecked />
                      <span className="ml-4 font-semibold">💵 Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="radio" name="payment" className="w-5 h-5" />
                      <span className="ml-4 font-semibold">🏦 Chuyển khoản ngân hàng</span>
                    </label>
                    <label className="flex items-center cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="radio" name="payment" className="w-5 h-5" />
                      <span className="ml-4 font-semibold">📱 Ví điện tử</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="card cursor-default p-8 sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 gradient-text">📦 Tóm tắt đơn</h2>
              
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm p-3 hover:bg-gray-50 rounded border-b">
                    <span className="font-semibold">{item.name} <span className="text-gray-600">x{item.quantity}</span></span>
                    <span className="font-bold gradient-text">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 pt-4 mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
                <div className="flex justify-between mb-3 font-bold">
                  <span>Tạm tính:</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-2xl font-bold gradient-text">
                  <span>Tổng:</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại BanCay 🎉');
                  clearCart();
                  setIsCheckout(false);
                  window.location.href = ROUTES.HOME;
                }}
                className="btn-primary w-full py-4 font-bold mb-3"
              >
                ✓ Xác nhận đặt hàng
              </button>

              <button
                onClick={() => setIsCheckout(false)}
                className="w-full border-2 border-emerald-500 text-emerald-600 py-3 rounded-lg font-bold hover:bg-emerald-50 transition"
              >
                ← Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
