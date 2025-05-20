export interface NewsItem {
  id?: number;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  publishedAt: string;
  category?: string;
  author?: string;
}