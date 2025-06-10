export interface NoticiaItem {
  id?: number
  titulo: string
  categorias: Categoria[] | number[]
  urls_midia?: UrlMidiaItem[] | null
  conteudo: string
  data_postagem: string
  User?: Usuario
  tbl_usuario_id?: number
  endereco: Endereco
  comentarios?: ComentarioItem[]
}
export interface UrlMidiaItem {
  id?: number;
  url_midia: string;
  tbl_noticia_id?: number;
}

export interface ListaNoticiasProps {
  noticias: NoticiaItem[];
}
export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  sigla: string;
}

export interface CategoriaResponse {
  status: boolean;
  status_code: number;
  items: number;
  categorias: Categoria[];
}
export interface NoticiaResponse {
  status: boolean
  status_code: number
  items: number
  noticias: NoticiaItem[]
}

export interface Endereco {
  id?: number
  cep: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  uf?: string
  ibge?: string
  gia?: string
  siafi?: string
  display_name: string
  lat: number
  lon: number
}

export interface NoticiaCreatePayload {
  titulo: string
  conteudo: string
  tbl_usuario_id: number
  endereco: {
    cep: string
    display_name: string
    lat: number
    lon: number
  }
  urls_midia?: string[] 
  categorias: number[] 
  data_postagem?: string
}

export interface Usuario {
  id: number
  nome: string
  email: string
  data_nascimento: string
  foto_perfil: string
  biografia: string | null
}
export type Coordenadas = {
  lat: number
  lon: number
}

export type InputEnderecoProps = {
  setCoordenadas: (coords: Coordenadas) => void
}

export type CoordenadasComEndereco = {
  lat: number
  lon: number
  name?: string
  display_name: string
  cep: string | null
}

// Tipos retornados pelas APIs
export type NominatimResponseItem = {
  lat: string
  lon: string
  display_name: string
  name?: string
  [key: string]: any
}

export type ReverseNominatimResponse = {
  lat: string
  lon: string
  display_name: string
  name?: string
  address?: Record<string, any>
  [key: string]: any
}

export interface ComentarioItem {
  id?: number;
  conteudo: string;
  tbl_usuario_id: number;
  tbl_noticia_id: number;
  data_postagem: string;
  User?: {
    id: number;
    nome: string;
    foto_perfil: string;
  }; // Opcional, para quando o backend envia
}

export interface ComentarioResponse {
  status: boolean;
  status_code: number;
  comentarios: ComentarioItem[];
}