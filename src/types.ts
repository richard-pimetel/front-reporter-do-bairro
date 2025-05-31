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

// Remove o campo "ddd" do retorno
export type ViaCepResponse = Omit<{
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  siafi: string
  ddd: string
}, 'ddd'>

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