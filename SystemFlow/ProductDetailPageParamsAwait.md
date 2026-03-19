# Flow: ProductDetailPageParamsAwait

## Overview
Fixes dynamic route parameter handling for `/products/[id]` by awaiting `params` before reading `id`.

## Trigger
A request to `/products/[id]` renders `app/products/[id]/page.tsx`.

## Flow Diagram

Request /products/[id]
        |
        v
ProductDetailPage receives params (Promise)
        |
        v
await params -> { id }
        |
        v
Number(id)
   |                     |
   | NaN                 | valid number
   v                     v
Render invalid page    getProductById(productId)
                             |
                             | null
                             v
                      Render not-found page
                             |
                             | product found
                             v
                    Render <ProductDetailClient />

## Steps

1. Receive `params` as `Promise<{ id: string }>`.
2. Resolve route params with `const { id } = await params`.
3. Convert `id` to number and validate.
4. Fetch product by ID when valid.
5. Render fallback UI for invalid/missing product.
6. Render `ProductDetailClient` when product exists.

## Error Handling

| Scenario | Behavior |
|---|---|
| `id` is not numeric | Render invalid-product message and link back to products page |
| Product service returns `null`/`undefined` | Render not-found message and link back to products page |

## Files Involved

| File | Role |
|---|---|
| `app/products/[id]/page.tsx` | Server page for product detail route |
| `services/products.ts` | Provides `getProductById` service call |
| `components/features/products/ProductDetailClient.tsx` | Displays product details |

## Notes
This update aligns with newer Next.js behavior where route `params` can be delivered as a Promise in server components.
