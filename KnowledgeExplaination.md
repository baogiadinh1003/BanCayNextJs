# Knowledge Explanations - BanCay Project

## File-based Routing (Next.js 13+ App Router)

### Cơ bản về Routing

Next.js sử dụng **File-based Routing** - một hệ thống tự động mapping folder/file thành routes URL.

**Cách nó hoạt động:**

```
Folder/File Structure          →    URL Route
────────────────────────────────────────────
app/page.tsx                   →    /
app/products/page.tsx          →    /products
app/products/[id]/page.tsx     →    /products/[id]
app/cart/page.tsx              →    /cart
app/about/page.tsx             →    /about
app/contact/page.tsx           →    /contact
app/admin/page.tsx             →    /admin
```

**Cấu trúc dự án BanCay:**

```
app/
├── layout.tsx                 # Root layout (tất cả routes)
├── page.tsx                   # / - Trang chủ
├── globals.css                # Global styles
│
├── products/
│   ├── page.tsx               # /products - Danh sách sản phẩm
│   └── [id]/
│       └── page.tsx           # /products/[id] - Chi tiết sản phẩm
│
├── cart/
│   └── page.tsx               # /cart - Giỏ hàng
│
├── about/
│   └── page.tsx               # /about - Về chúng tôi
│
├── contact/
│   └── page.tsx               # /contact - Liên hệ
│
└── admin/
    └── page.tsx               # /admin - Trang quản trị
```

### Quy tắc Routing

| Folder/File | Route | Ghi chú |
|------------|-------|--------|
| `page.tsx` | ✓ Định nghĩa route | Bắt buộc để tạo route |
| `layout.tsx` | ✗ Không là route | Nhưng bọc các child routes |
| `[param]/` | ✓ Dynamic segment | Match bất kỳ giá trị |
| `(group)/` | ✗ Route group | Không tạo segment trong URL |
| `@slot/` | ✗ Parallel routes | Advanced feature |

**Ví dụ chi tiết:**

```typescript
// app/products/[id]/page.tsx
export default function ProductDetail({ params }: { params: { id: string } }) {
  return <h1>Sản phẩm: {params.id}</h1>;
}

// URL: /products/123        →  <h1>Sản phẩm: 123</h1>
// URL: /products/mint-plant →  <h1>Sản phẩm: mint-plant</h1>
```

### Layout Hierarchy

**Next.js tự động nesting layouts:**

```
app/
├── layout.tsx              # ← RootLayout bọc tất cả
│   ├── page.tsx (/)
│   ├── products/layout.tsx # ← Optional: layout riêng cho products
│   │   ├── page.tsx (/products)
│   │   └── [id]/page.tsx (/products/[id])
│   ├── cart/page.tsx (/cart)
│   └── ...
```

**Khi user truy cập `/products/123`:**
```
RootLayout (app/layout.tsx)
  └── ProductsLayout (app/products/layout.tsx) - nếu có
      └── ProductDetail (app/products/[id]/page.tsx)
```

### Navigation giữa các Routes

**Sử dụng `next/link`:**

```typescript
import Link from 'next/link';

export default function Navigation() {
  return (
    <ul>
      <li><Link href="/">Trang chủ</Link></li>
      <li><Link href="/products">Danh sách sản phẩm</Link></li>
      <li><Link href="/products/123">Chi tiết sản phẩm 123</Link></li>
      <li><Link href="/cart">Giỏ hàng</Link></li>
      <li><Link href="/about">Về chúng tôi</Link></li>
    </ul>
  );
}
```

**Sử dụng `useRouter` (Client Component):**

```typescript
'use client';
import { useRouter } from 'next/navigation';

export default function ProductCard() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/products/123'); // Chuyển tới /products/123
  };
  
  return <button onClick={handleClick}>Xem chi tiết</button>;
}
```

### Special Files

| File | Tác dụng |
|------|---------|
| `page.tsx` | Định nghĩa UI cho route |
| `layout.tsx` | Shared layout cho route và children |
| `error.tsx` | Error boundary |
| `loading.tsx` | Loading UI (Suspense fallback) |
| `not-found.tsx` | Custom 404 page |

**Ví dụ - Tạo layout cho /products:**

```typescript
// app/products/layout.tsx
export default function ProductsLayout({ children }) {
  return (
    <div>
      <h1>Khu vực sản phẩm</h1>
      <aside>
        {/* Sidebar filter */}
      </aside>
      <main>{children}</main>
    </div>
  );
}

// Khi truy cập /products hoặc /products/123
// Cả hai sẽ dùng layout này
```

### Dynamic Routes - Catch-all

**Single dynamic segment:**
```
app/products/[id]/page.tsx
  /products/1         ✓
  /products/mint      ✓
  /products/1/2       ✗ (không match)
```

**Catch-all segments (3 chấm):**
```
app/docs/[...slug]/page.tsx
  /docs/a             ✓  →  params.slug = ['a']
  /docs/a/b           ✓  →  params.slug = ['a', 'b']
  /docs/a/b/c/d       ✓  →  params.slug = ['a', 'b', 'c', 'd']
```

**Optional catch-all:**
```
app/docs/[[...slug]]/page.tsx
  /docs               ✓  →  params.slug = undefined
  /docs/a             ✓  →  params.slug = ['a']
  /docs/a/b/c         ✓  →  params.slug = ['a', 'b', 'c']
```

### Metadata & SEO

**Static metadata:**
```typescript
// app/about/page.tsx
export const metadata = {
  title: 'Về chúng tôi - BanCay',
  description: 'Tìm hiểu về cửa hàng BanCay',
};
```

**Dynamic metadata:**
```typescript
// app/products/[id]/page.tsx
export async function generateMetadata({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    title: `${product.name} - BanCay`,
    description: product.description,
  };
}
```

---

## Dynamic Routing (Tuyến động)

### Giải thích về [id] trong Products

Trong Next.js App Router, dấu ngoặc vuông `[id]` được sử dụng để tạo **dynamic routes** (tuyến động). Đây là cú pháp chuẩn để xử lý các URL với tham số động.

**Cách hoạt động:**

```
/products/[id]/page.tsx
    ↓
match các URL: /products/1, /products/2, /products/iphone-15, /products/abc123
```

**Tuyến động Route vs Static Route:**

| Loại | Cấu trúc folder | URL match | Ví dụ |
|------|-----------------|-----------|-------|
| **Dynamic** | `[id]/page.tsx` | `/products/RẤT_CÓ_GIÁ_TRỊ` | `/products/1`, `/products/mint-plant`, `/products/999` |
| **Static** | `id/page.tsx` | `/products/id` | Chỉ match `/products/id` |

**Truy cập tham số `id` trong component:**

```typescript
interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: Props) {
  const productId = params.id; // Giá trị từ URL
  
  // Ví dụ: fetch sản phẩm từ API
  const product = await fetchProduct(productId);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>ID sản phẩm: {productId}</p>
    </div>
  );
}
```

**Ví dụ URL thực tế:**

| URL | `params.id` | Ghi chú |
|-----|-----------|--------|
| `/products/1` | `"1"` | ID số |
| `/products/mint-plant` | `"mint-plant"` | Slug thân thiện SEO |
| `/products/orchid-flower-999` | `"orchid-flower-999"` | ID dạng slug với số |
| `/products/abc123xyz` | `"abc123xyz"` | ID UUID hoặc ngẫu nhiên |

**Cấu trúc folder thực tế trong dự án:**

```
app/
├── products/
│   ├── page.tsx              # /products - Danh sách sản phẩm
│   └── [id]/
│       └── page.tsx          # /products/[id] - Chi tiết sản phẩm
```

**Lợi ích của Dynamic Routing:**

✅ **Tái sử dụng component** - Một file `page.tsx` xử lý tất cả sản phẩm  
✅ **Hỗ trợ SEO** - URL có ý nghĩa (ví dụ: `/products/mint-plant`)  
✅ **Linh hoạt** - Thêm sản phẩm mới không cần tạo folder mới  
✅ **Chuẩn Next.js** - Theo convention của framework  

**So với cách truyền thống (useRouter):**

```typescript
// ❌ Cách cũ (Pages Router)
import { useRouter } from 'next/navigation';

export default function ProductDetail() {
  const router = useRouter();
  const productId = router.query.id; // Async, có delay
  // ...
}

// ✅ Cách mới (App Router - Dynamic Routing)
export default function ProductDetail({ params }: Props) {
  const productId = params.id; // Sync, ngay lập tức
  // ...
}
```

---

## 'use client' Directive

### Giải thích 'use client'

`'use client'` là một directive trong Next.js 13+ (App Router) dùng để **đánh dấu một component là Client Component** (chạy ở phía trình duyệt) thay vì Server Component (chạy ở phía server).

**Đặt ở dầu file:**

```typescript
'use client'; // ← Phải ở dòng đầu tiên

import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  // ...
}
```

### Server Component vs Client Component

| Tính chất | **Server Component** | **Client Component** |
|----------|-------------------|-------------------|
| **Chạy ở** | Phía server (Node.js) | Phía client (Browser) |
| **Directive** | Không có | Cần `'use client'` |
| **Có thể dùng** | Hooks, Async functions, Secrets | useState, useEffect, event listeners |
| **Kích thước bundle** | ❌ Không ảnh hưởng | ✅ Thêm vào bundle |
| **Tốc độ** | ✅ Nhanh (pre-render) | ⚠️ Chậm hơn (render ở browser) |
| **Ví dụ** | Layout, Fetch data | Form, Button, Counter |

### Khi nào dùng 'use client'?

**Dùng `'use client'` khi bạn cần:**

| Tính năng | Ví dụ | File |
|----------|-------|------|
| **useState, useReducer** | Quản lý state giỏ hàng | `app/cart/page.tsx` |
| **useEffect** | Fetch data từ API | `app/page.tsx` |
| **Event listeners** | onClick, onChange | `components/ProductCard.tsx` |
| **Browser APIs** | localStorage, window | `components/Header.tsx` |
| **Context API** | Theme provider | `components/ThemeProvider.tsx` |

**Ví dụ: Đặt `'use client'` ở app/page.tsx**

```typescript
'use client'; // ← Bắt buộc vì dùng useState, useEffect

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { // ← useEffect cần 'use client'
    const mockProducts = [
      { id: 1, name: 'Cây Hoa Hồng', price: 150000 },
      { id: 2, name: 'Cây Xương Rồng', price: 80000 },
    ];
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  return (
    <div>
      <h1>Sản phẩm nổi bật</h1>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Ví dụ: Không cần `'use client'` (Server Component)**

```typescript
// ✅ Không cần 'use client' - đây là Server Component
// app/layout.tsx hoặc component chỉ dùng JSX thuần

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* Client Component */}
        {children}
        <Footer /> {/* Client Component */}
      </body>
    </html>
  );
}
```

### Server vs Client Component trong dự án BanCay

**Server Components:**
```
✓ app/layout.tsx           (Root layout)
✓ app/(pages)/about/page.tsx
✓ app/(pages)/contact/page.tsx
```

**Client Components:**
```
✗ app/page.tsx             ('use client' - dùng useState, useEffect)
✗ components/Header.tsx    ('use client' - dùng addEventListener)
✗ components/Footer.tsx    ('use client' - dùng Link từ next/link)
✗ components/ProductCard.tsx ('use client' - dùng onClick, useState)
```

### Lợi ích của 'use client'

✅ **Render tương tác** - Component hiển thị ngay lập tức ở browser  
✅ **Event-driven** - Có thể dùng onClick, onChange, v.v.  
✅ **Real-time updates** - State thay đổi, UI cập nhật tức thì  
✅ **Browser APIs** - Truy cập localStorage, sessionStorage, geolocation  

### Nhược điểm và cách tối ưu

⚠️ **Bundle size tăng** - Mã JS thêm vào gói tải về client  
⚠️ **Chậm hơn** - Phải render ở browser, không pre-render  
⚠️ **SEO không tốt** - Bot AI không thể crawl dữ liệu từ XHR

**Cách tối ưu:**
```typescript
// ❌ Tránh: 'use client' quá sớm ở root layout
'use client';
export default function RootLayout({ children }) {
  // ...
}

// ✅ Tốt: 'use client' ở component cụ thể
// app/layout.tsx - Server Component
export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}

// app/page.tsx - Client Component nếu cần
'use client';
export default function Home() {
  const [data, setData] = useState([]);
  // ...
}
```

---


### Định nghĩa Interface cho Dynamic Route Props

```typescript
interface ProductDetailProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export default function ProductDetail({ params, searchParams }: ProductDetailProps) {
  // params.id - dynamic route parameter
  // searchParams - query parameters từ URL (ví dụ: ?sort=price)
}
```

---

## Zustand State Management

### Cách sử dụng Zustand trong dự án

Zustand là thư viện state management nhẹ, được sử dụng để quản lý giỏ hàng.

**File: `lib/store.ts`**

```typescript
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
```

**Sử dụng trong Component:**

```typescript
'use client'; // Zustand bắt buộc use client

import { useCart } from '@/lib/store';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  
  return (
    <button onClick={() => addItem(product)}>
      Thêm vào giỏ
    </button>
  );
}
```

---

## Tailwind CSS Custom Classes

### Các class custom được định nghĩa trong `globals.css`

```css
/* Button Styles */
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 
         text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300;
}

.btn-secondary {
  @apply px-6 py-3 border-2 border-emerald-500 text-emerald-600 
         rounded-lg font-bold hover:bg-emerald-50 transition-all;
}

/* Card Styles */
.card {
  @apply bg-white rounded-lg shadow-lg overflow-hidden;
}

/* Gradient Text */
.gradient-text {
  @apply bg-gradient-to-r from-emerald-500 to-cyan-500 
         bg-clip-text text-transparent;
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

---

## SEO Optimization

### Metadata động trong App Router

```typescript
// app/products/[id]/page.tsx

import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  
  return {
    title: `${product.name} | BanCay`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductDetail({ params }: ProductPageProps) {
  // Component content
}
```

---

## Deployment Tối ưu

### Next.js Build Output

Khi chạy `npm run build`, Next.js tự động:

- **Prerender** - Các static routes (home, about, contact)
- **Server-render on demand** - Dynamic routes như `/products/[id]`
- **Optimize images** - Compress và serve tối ưu
- **Code splitting** - Chia nhỏ bundle size

**Route Types trong dự án:**

```
✓ Prerendered (Static):
  - / (home)
  - /about
  - /contact
  - /cart
  - /admin

ƒ Server-rendered (Dynamic):
  - /products (→ ISR có thể)
  - /products/[id] (→ On-demand)
```

---

Phát triển với ❤️ bằng Next.js
