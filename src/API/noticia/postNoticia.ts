// src/api/news.ts
import { NoticiaCreatePayload, NoticiaItem } from '../../types'
import BASE_URL from '../config'

export async function postNoticia(noticiaData: NoticiaCreatePayload): Promise<NoticiaItem | null> {
  try {
    const response = await fetch(`${BASE_URL}/noticia`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noticiaData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erro ao postar notícia: ${response.status} - ${errorText}`)
    }

    const createdNoticia: NoticiaItem = await response.json()
    return createdNoticia
  } catch (error) {
    console.error("Erro ao criar notícia:", error)
    return null
  }
}