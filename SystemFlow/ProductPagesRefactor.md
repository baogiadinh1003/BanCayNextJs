# Flow: ProductPagesRefactor

## Overview
Refactor luong du lieu san pham de theo kieu server-first, typing ro rang, va tach biet logic UI tu logic truy xuat du lieu.

## Trigger
Nguoi dung truy cap trang chu, trang danh sach san pham, hoac trang chi tiet san pham.

## Flow Diagram

Home/Products/ProductDetail request
        |
        v
services/products.ts
        |
        +--> getFeaturedProducts() --> app/page.tsx
        |
        +--> getAllProducts() ------> app/products/page.tsx
        |
        +--> getProductById(id) ----> app/products/[id]/page.tsx
                                      |
                                      +--> found ----> ProductDetailClient
                                      |
                                      +--> not found -> fallback UI

## Steps

1. **Server fetch** - Server pages goi service typed de lay data.
2. **Client interaction** - Component client xu ly filter/category va add-to-cart.
3. **State update** - `useCart` cap nhat gio hang va tinh tong item/tien.
4. **Fallback handling** - Dynamic route tra ve UI thong bao khi id khong hop le hoac khong tim thay.

## Error Handling

| Scenario | Behavior |
|---|---|
| Invalid `id` param | Hien thi trang fallback va link quay lai danh sach |
| Product not found | Hien thi thong bao khong tim thay san pham |
| Empty filter result | Hien thi trang thai "Khong tim thay san pham" |

## Files Involved

| File | Role |
|---|---|
| `services/products.ts` | Typed du lieu va ham truy xuat san pham |
| `app/page.tsx` | Trang chu server component su dung featured products |
| `app/products/page.tsx` | Trang danh sach server component |
| `components/features/products/ProductsCatalog.tsx` | Filter category tren client |
| `app/products/[id]/page.tsx` | Xu ly dynamic param va fallback |
| `components/features/products/ProductDetailClient.tsx` | Hien thi chi tiet + them vao gio |

## Notes
Refactor nay uu tien tinh nhat quan typing, loai bo `any`, va giam logic fetch trong client components.
