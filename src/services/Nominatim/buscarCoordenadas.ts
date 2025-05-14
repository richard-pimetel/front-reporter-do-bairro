// Tipo para os dados retornados pela API
type NominatimResponseItem = {
  lat: string
  lon: string
  display_name: string
  [key: string]: any // Permite outros campos que não estamos usando
}

// Tipo simplificado que será retornado pela função
export type Coordenadas = {
  lat: number
  lon: number
}

export async function buscarCoordenadas(endereco: string): Promise<Coordenadas | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`,
      { method: 'GET' }
    )

    if (!response.ok) {
      throw new Error('Erro ao fazer a busca')
    }

    const data: NominatimResponseItem[] = await response.json()

    if (data.length === 0) return null

    const { lat, lon } = data[0]
    return {
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error)
    return null
  }
}
