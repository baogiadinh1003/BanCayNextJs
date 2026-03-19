export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: ProductCategory;
  stock?: number;
  rating?: number;
  reviews?: number;
  details?: string[];
}

export type ProductCategory = 'flowers' | 'succulents' | 'trees' | 'greens' | 'luck';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductCreateInput {
  name: string;
  price: number;
  stock: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}
