# BanCay - Cửa hàng bán cây cảnh online

Một website e-commerce bán cây cảnh, cây ăn quả, cây xanh được xây dựng với Next.js, TypeScript, Tailwind CSS và Zustand.

## Tính năng

- 🏠 **Trang chủ** - Giới thiệu sản phẩm nổi bật
- 🌿 **Danh sách sản phẩm** - Xem và lọc sản phẩm
- 🛍️ **Chi tiết sản phẩm** - Xem thông tin chi tiết sản phẩm
- 🛒 **Giỏ hàng** - Thêm, xóa, cập nhật sản phẩm trong giỏ
- 💳 **Checkout** - Quy trình thanh toán đơn giản
- 👨‍💼 **Trang Admin** - Quản lý sản phẩm, đơn hàng, thống kê
- 📱 **Responsive Design** - Hoạt động trên tất cả các thiết bị
- 🌐 **Tối ưu SEO** - Metadata động, cấu trúc URL thân thiện

## Công nghệ sử dụng

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Style**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios

## Cài đặt

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Hướng dẫn

1. Clone repository hoặc vào thư mục dự án
```bash
cd d:\BanCayProject\WebNextJS
```

2. Cài đặt dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Mở trình duyệt và truy cập
```
http://localhost:3000
```

## Cấu trúc dự án

```
WebNextJS/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Trang chủ
│   ├── products/            # Trang danh sách sản phẩm
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx     # Chi tiết sản phẩm
│   ├── cart/
│   │   └── page.tsx         # Giỏ hàng
│   ├── admin/
│   │   └── page.tsx         # Trang quản trị
│   ├── about/
│   │   └── page.tsx         # Về chúng tôi
│   ├── contact/
│   │   └── page.tsx         # Liên hệ
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
│
├── lib/                     # Utilities
│   └── store.ts            # Zustand store
│
├── types/                  # TypeScript types
│   └── index.ts
│
├── public/                 # Static files
│
├── next.config.js         # Next.js config
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
└── package.json
```

## Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm start` - Chạy production server
- `npm run lint` - Kiểm tra linting

## Các trang chính

- `/` - Trang chủ
- `/products` - Danh sách sản phẩm
- `/products/[id]` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/admin` - Trang quản trị
- `/about` - Về chúng tôi
- `/contact` - Liên hệ

## Tính năng quản trị

- Thêm sản phẩm mới
- Sửa thông tin sản phẩm
- Xóa sản phẩm
- Xem đơn hàng
- Thống kê bán hàng

## State Management

Dự án sử dụng Zustand để quản lý trạng thái giỏ hàng. Store được định nghĩa trong `lib/store.ts`.

```typescript
const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
```

## Styling

Sử dụng Tailwind CSS với theme custom:
- **Primary color**: `#10b981` (xanh lá)
- **Secondary color**: `#f59e0b` (vàng)
- **Dark color**: `#1f2937` (xám tối)

## Deployment

Để deploy lên Vercel:

1. Push code lên GitHub
2. Import project từ Vercel dashboard
3. Vercel tự động build và deploy

```bash
npm run build
npm start
```

## Contributing

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## License

Project này được cấp phép dưới MIT License. Xem file LICENSE để chi tiết.

## Contact

Liên hệ: info@bancay.com  
Website: www.bancay.com  
Điện thoại: (028) 1234-5678

---

Phát triển với ❤️ bằng Next.js
