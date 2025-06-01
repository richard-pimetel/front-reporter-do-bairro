import { NoticiaResponse } from '../../types'
import BASE_URL from '../config'

export async function getAllNoticia(): Promise<NoticiaResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/noticia`)
    if (!response.ok) {
      throw new Error(`Erro ao buscar noticias: ${response.statusText}`)
    }
    const data: NoticiaResponse = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao buscar noticias:", error)
    return null
  }
}