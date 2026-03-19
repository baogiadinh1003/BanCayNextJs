import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Cay Hoa Hong',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=600&h=600&fit=crop',
    description: 'Hoa hong tuoi dep, no hoa quanh nam',
    category: 'flowers',
    rating: 4.5,
    reviews: 28,
    stock: 45,
    details: [
      'Chat luong cao, chon loc ky luong',
      'Giao hang trong 24h tai TP.HCM',
      'Bao hanh va ho tro sau mua hang',
      'De cham soc, phu hop cho nguoi moi',
    ],
  },
  {
    id: 2,
    name: 'Cay Xuong Rong',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1509223197726-15dbe4c17d12?w=600&h=600&fit=crop',
    description: 'Cay xuong rong doc dao, chiu kho han',
    category: 'succulents',
    rating: 4.3,
    reviews: 16,
    stock: 30,
  },
  {
    id: 3,
    name: 'Cay Phat Tai',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=600&fit=crop',
    description: 'Cay phong thuy mang lai may man',
    category: 'luck',
    rating: 4.7,
    reviews: 35,
    stock: 55,
  },
  {
    id: 4,
    name: 'Cay Cau Vang',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=600&fit=crop',
    description: 'Cay than go phu hop trang tri noi that',
    category: 'trees',
    rating: 4.2,
    reviews: 12,
    stock: 20,
  },
  {
    id: 5,
    name: 'Cay Luoi Ho',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1502082553048-f572b2314260?w=600&h=600&fit=crop',
    description: 'De cham soc va loc khong khi tot',
    category: 'greens',
    rating: 4.6,
    reviews: 22,
    stock: 42,
  },
  {
    id: 6,
    name: 'Cay Da Huong',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1511629179557-c1f186d1cd09?w=600&h=600&fit=crop',
    description: 'Hoa dep va mui huong nhe nhang',
    category: 'flowers',
    rating: 4.4,
    reviews: 19,
    stock: 27,
  },
];

export async function getAllProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return mockProducts.slice(0, limit);
}

export async function getProductById(id: number): Promise<Product | null> {
  return mockProducts.find((product) => product.id === id) ?? null;
}
