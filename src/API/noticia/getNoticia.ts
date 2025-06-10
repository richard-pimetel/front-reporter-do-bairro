import { NoticiaResponse } from '../../types'
import BASE_URL from '../config'

export async function getNoticia(id: number): Promise<NoticiaResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/noticia/${id}`)
    if (!response.ok) {
      throw new Error(`Erro ao buscar a noticia: ${response.statusText}`)
    }
    const data: NoticiaResponse = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao buscar a noticia:", error)
    return null
  }
}