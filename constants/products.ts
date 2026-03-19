import type { ProductCategory } from '@/types';

export interface ProductCategoryOption {
  label: string;
  value: ProductCategory | 'all';
}

export const PRODUCT_CATEGORIES: ProductCategoryOption[] = [
  { value: 'all', label: 'Tat ca' },
  { value: 'flowers', label: 'Hoa' },
  { value: 'succulents', label: 'Cay mong nuoc' },
  { value: 'trees', label: 'Cay than go' },
  { value: 'greens', label: 'Cay xanh' },
  { value: 'luck', label: 'Cay phong thuy' },
];
