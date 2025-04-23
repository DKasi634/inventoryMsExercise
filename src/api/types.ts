export interface Product {
  uid: string;
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OrderItem {
  id: number;
  product_details:Product;
  qty: number;
  price: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
  paid: boolean;
}

// src/api/types.ts
export interface OrderFormValues {
  items: { product: number; qty: number }[];
  paid: boolean;
}