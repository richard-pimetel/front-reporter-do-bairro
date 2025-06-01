export interface NoticiaItem {
  id?: number
  titulo: string
  categorias: Categoria[]
  urls_midia?: string[]
  link: string
  conteudo: string
  data_postagem?: Date
  User?: Usuario
  tbl_usuario_id?: number
  endereco: Endereco
}


export interface ListaNoticiasProps {
  noticias: NoticiaItem[];
}
export interface Categoria {
  id?: number;
  nome: string;
  descricao?: string;
  sigla?: string;
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