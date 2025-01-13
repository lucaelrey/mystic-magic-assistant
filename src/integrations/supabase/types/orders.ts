import { ShippingAddress } from './shipping';

export type OrderItem = {
  id: string;
  created_at: string;
  order_id: string | null;
  product_name: string;
  quantity: number;
  price_per_unit: number;
};

export type Order = {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  status: string;
  total_amount: number;
  shipping_address: ShippingAddress | null;
};