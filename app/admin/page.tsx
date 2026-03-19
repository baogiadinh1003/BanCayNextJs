'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ProductCreateInput } from '@/types';

type AdminTab = 'products' | 'orders' | 'users' | 'stats';

interface AdminProduct extends ProductCreateInput {
  id: number;
}

interface NewProductFormValues {
  name: string;
  price: string;
  stock: string;
}

interface AdminTabOption {
  id: AdminTab;
  label: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<AdminProduct[]>([
    { id: 1, name: 'Cây Hoa Hồng', price: 150000, stock: 45 },
    { id: 2, name: 'Cây Xương Rồng', price: 80000, stock: 30 },
  ]);

  const [newProduct, setNewProduct] = useState<NewProductFormValues>({ name: '', price: '', stock: '' });

  const adminTabs: AdminTabOption[] = [
    { id: 'products', label: 'Quản lý sản phẩm' },
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'users', label: 'Khách hàng' },
    { id: 'stats', label: 'Thống kê' },
  ];

  const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedPrice = Number(newProduct.price);
    const parsedStock = Number(newProduct.stock);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parsedPrice,
      stock: parsedStock,
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Trang quản trị</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {adminTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Tên sản phẩm</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Giá</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Nhập giá"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Số lượng</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full border rounded px-4 py-2"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-green-700">
                Thêm sản phẩm
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Tên sản phẩm</th>
                  <th className="px-6 py-3 text-left font-semibold">Giá</th>
                  <th className="px-6 py-3 text-left font-semibold">Số lượng</th>
                  <th className="px-6 py-3 text-left font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{product.id}</td>
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">{product.price.toLocaleString('vi-VN')} ₫</td>
                    <td className="px-6 py-3">{product.stock}</td>
                    <td className="px-6 py-3">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">Sửa</button>
                      <button className="text-red-600 hover:text-red-800">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Other Tabs */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold">Đơn hàng</h2>
          <p className="text-gray-600 mt-4">Danh sách đơn hàng sẽ được hiển thị tại đây</p>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold">Khách hàng</h2>
          <p className="text-gray-600 mt-4">Danh sách khách hàng sẽ được hiển thị tại đây</p>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Tổng doanh thu', value: '45.2M ₫' },
            { label: 'Đơn hàng', value: '1,245' },
            { label: 'Khách hàng', value: '890' },
            { label: 'Sản phẩm', value: '234' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
