'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Liên hệ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl mb-3">📍</div>
          <h3 className="font-bold text-lg mb-2">Địa chỉ</h3>
          <p className="text-gray-600">123 Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl mb-3">📞</div>
          <h3 className="font-bold text-lg mb-2">Điện thoại</h3>
          <p className="text-gray-600">(028) 1234-5678</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl mb-3">✉️</div>
          <h3 className="font-bold text-lg mb-2">Email</h3>
          <p className="text-gray-600">info@bancay.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
          {submitted && (
            <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
              Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Họ và tên</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded px-4 py-2"
                placeholder="Nhập email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tin nhắn</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border rounded px-4 py-2"
                rows={6}
                placeholder="Nhập tin nhắn"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Gửi tin nhắn
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="font-bold text-lg mb-4">Giờ làm việc</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
              <li>Thứ Bảy: 8:00 - 17:00</li>
              <li>Chủ Nhật: 9:00 - 16:00</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="font-bold text-lg mb-4">Mạng xã hội</h3>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-primary">f</a>
              <a href="#" className="text-2xl hover:text-primary">📷</a>
              <a href="#" className="text-2xl hover:text-primary">🐦</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
