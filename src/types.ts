// src/types.ts

export interface UrlMidiaItem {
  id?: number;
  url_midia: string;
  tbl_noticia_id?: number;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  sigla: string;
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

export interface ComentarioItem {
  id?: number;
  conteudo: string;
  tbl_usuario_id: number;
  tbl_noticia_id: number;
  data_postagem: string;
  User?: { // Opcional, para quando o backend envia o usuário que fez o comentário
    id: number;
    nome: string;
    foto_perfil: string;
  }; 
}

export interface NoticiaItem {
  id?: number // ID pode ser opcional para novas notícias antes de serem salvas
  titulo: string
  categorias: Categoria[] | number[] // Mantenha isso como está, mas o CardNoticia espera Categoria[] para o nome
  urls_midia?: UrlMidiaItem[] | null
  conteudo: string
  data_postagem: string
  User?: Usuario // Opcional, se a notícia retornar dados do usuário
  tbl_usuario_id?: number
  endereco: Endereco
  comentarios?: ComentarioItem[]
}

export interface ListaNoticiasProps {
  noticias: NoticiaItem[];
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
  noticias: NoticiaItem[] | null;
}

export interface UsuarioUpdatePayload {
  id: number; // ID do usuário que será atualizado (obrigatório)
  nome?: string; // Nome atualizado (opcional)
  biografia?: string | null; // Biografia atualizada (opcional, pode ser null)
  foto_perfil?: string | null; // <-- **CERTIFIQUE-SE DE QUE ESTÁ ASSIM**
  senha?: string; // Se você for permitir a atualização de senha, adicione aqui (parece que sim, pois você está enviando)
  email?: string; // Adicione se o email puder ser atualizado
  data_nascimento?: string; // Adicione se a data de nascimento puder ser atualizada
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

export interface ComentarioResponse {
  status: boolean;
  status_code: number;
  comentarios: ComentarioItem[];
}