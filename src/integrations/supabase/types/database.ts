import { Json } from './json';
import { ShippingAddress } from './shipping';
import { OrderItem, Order } from './orders';
import { UserRole } from './roles';

export type Database = {
  public: {
    Tables: {
      order_items: {
        Row: OrderItem;
        Insert: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price_per_unit: number;
          product_name: string;
          quantity: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price_per_unit?: number;
          product_name?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: Order;
        Insert: {
          created_at?: string;
          id?: string;
          shipping_address?: ShippingAddress | null;
          status?: string;
          total_amount: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          shipping_address?: ShippingAddress | null;
          status?: string;
          total_amount?: number;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: UserRole;
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}