// src/API/noticia/postComentario.ts
import { ComentarioItem } from '../../types'
import BASE_URL from '../config'

export async function postComentario(comentario: ComentarioItem): Promise<ComentarioItem | null> {
  try {
    const response = await fetch(`${BASE_URL}/comentario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comentario),
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erro ao postar comentario: ${response.status} - ${errorText}`)
    }
    const createdComentario: ComentarioItem = await response.json()
    return createdComentario
  } catch (error) {
    console.error('Erro ao postar comentário:', error);
    return null;
  }
}