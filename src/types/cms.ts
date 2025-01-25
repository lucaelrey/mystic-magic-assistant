export type ContentType = 'action_card' | 'number_card' | 'rule' | 'product';
export type Language = 'de' | 'en';

export interface ContentTranslation {
  id: string;
  content_id: string | null;
  language: Language;
  title: string | null;
  description: string | null;
  content: any | null;
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: string;
  type: ContentType;
  key: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
  published: boolean;
  metadata: any | null;
  translations: ContentTranslation[];
}