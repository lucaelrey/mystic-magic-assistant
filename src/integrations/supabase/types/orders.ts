import { ShippingAddress } from './shipping';

export type OrderItem = {
  created_at: string;
  id: string;
  order_id: string | null;
  price_per_unit: number;
  product_name: string;
  quantity: number;
}

export type Order = {
  created_at: string;
  id: string;
  shipping_address: ShippingAddress | null;
  status: string;
  total_amount: number;
  updated_at: string;
  user_id: string | null;
}