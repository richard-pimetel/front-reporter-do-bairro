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

export interface Usuario {
  id: number
  nome: string
  email: string
  data_nascimento: string
  foto_perfil: string
  biografia: string | null
}