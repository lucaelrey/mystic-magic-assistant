export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cms_content: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          key: string
          metadata: Json | null
          published: boolean
          type: Database["public"]["Enums"]["content_type"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          key: string
          metadata?: Json | null
          published?: boolean
          type: Database["public"]["Enums"]["content_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          key?: string
          metadata?: Json | null
          published?: boolean
          type?: Database["public"]["Enums"]["content_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      cms_content_media: {
        Row: {
          content_id: string
          created_at: string
          media_id: string
        }
        Insert: {
          content_id: string
          created_at?: string
          media_id: string
        }
        Update: {
          content_id?: string
          created_at?: string
          media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_content_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "cms_media"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_media: {
        Row: {
          content_type: string
          created_at: string
          created_by: string | null
          filename: string
          filepath: string
          id: string
          metadata: Json | null
          size: number
        }
        Insert: {
          content_type: string
          created_at?: string
          created_by?: string | null
          filename: string
          filepath: string
          id?: string
          metadata?: Json | null
          size: number
        }
        Update: {
          content_type?: string
          created_at?: string
          created_by?: string | null
          filename?: string
          filepath?: string
          id?: string
          metadata?: Json | null
          size?: number
        }
        Relationships: []
      }
      cms_translations: {
        Row: {
          content: Json | null
          content_id: string | null
          created_at: string
          description: string | null
          id: string
          language: Database["public"]["Enums"]["supported_language"]
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          content_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          language: Database["public"]["Enums"]["supported_language"]
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          content_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          language?: Database["public"]["Enums"]["supported_language"]
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_translations_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_versions: {
        Row: {
          content_data: Json
          content_id: string | null
          created_at: string
          created_by: string | null
          id: string
          version_number: number
        }
        Insert: {
          content_data: Json
          content_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          version_number: number
        }
        Update: {
          content_data?: Json
          content_id?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "cms_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "cms_content"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          html_content: string
          id: string
          name: string
          subject: string
          type: Database["public"]["Enums"]["email_template_type"]
          updated_at: string | null
          updated_by: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          html_content: string
          id?: string
          name: string
          subject: string
          type: Database["public"]["Enums"]["email_template_type"]
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          html_content?: string
          id?: string
          name?: string
          subject?: string
          type?: Database["public"]["Enums"]["email_template_type"]
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          price_per_unit: number
          product_name: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          price_per_unit: number
          product_name: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          price_per_unit?: number
          product_name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_intent_id: string | null
          payment_status: string
          shipping_address: Json
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string
          shipping_address: Json
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string
          shipping_address?: Json
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      content_type:
        | "action_card"
        | "number_card"
        | "rule"
        | "product"
        | "rule_section"
        | "rules_overview"
        | "rules_number_cards"
        | "rules_action_cards"
        | "rules_other"
      email_template_type:
        | "order_confirmation"
        | "shipping_confirmation"
        | "custom"
      supported_language: "de" | "en"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      content_type: [
        "action_card",
        "number_card",
        "rule",
        "product",
        "rule_section",
        "rules_overview",
        "rules_number_cards",
        "rules_action_cards",
        "rules_other",
      ],
      email_template_type: [
        "order_confirmation",
        "shipping_confirmation",
        "custom",
      ],
      supported_language: ["de", "en"],
    },
  },
} as const
