export interface Post {
  id: string;
  document_id: string;
  title: string;
  slug: string;
  cover: string;
  abstract: string;
  content: string;
  published: boolean;
  seo_title: string;
  seo_description: string;
  locale: string;
  created_at: string;
  updated_at: string;
}
