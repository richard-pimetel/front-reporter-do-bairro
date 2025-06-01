import { CategoriaResponse  } from '../../types'
import BASE_URL from '../config'

export async function getCategories(): Promise<CategoriaResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/categoria`)
    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.statusText}`)
    }
    const data: CategoriaResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    return null
  }
}