import axios from 'axios';
import { ROUTES } from '@/constants/routes';
import type { Order, Product } from '@/types';

interface OrderPayload {
  items: Order['items'];
  totalPrice: number;
}

type ProductPayload = Omit<Product, 'id'>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = ROUTES.HOME;
      }
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: () => apiClient.get<Product[]>('/api/products'),
  getOne: (id: number) => apiClient.get<Product>(`/api/products/${id}`),
  create: (data: ProductPayload) => apiClient.post<Product>('/api/products', data),
  update: (id: number, data: ProductPayload) => apiClient.put<Product>(`/api/products/${id}`, data),
  delete: (id: number) => apiClient.delete(`/api/products/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => apiClient.get<Order[]>('/api/orders'),
  getOne: (id: string) => apiClient.get<Order>(`/api/orders/${id}`),
  create: (data: OrderPayload) => apiClient.post<Order>('/api/orders', data),
  update: (id: string, data: OrderPayload) => apiClient.put<Order>(`/api/orders/${id}`, data),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiClient.get('/api/categories'),
};
