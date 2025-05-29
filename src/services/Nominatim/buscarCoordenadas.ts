// src/services/Nominatim/buscarEndereco.ts
import { CoordenadasComEndereco, NominatimResponseItem } from '../../types'
import { extrairCEP } from '../../utils/auxiliaryFunctions'
import buscarDadosViaCep from '../viaCEP/buscarDadosViaCep'

export default async function buscarCoordenadasComEndereco(endereco: string): Promise<CoordenadasComEndereco | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&addressdetails=1&limit=1`,
      {
        method: 'GET',
        headers: {
          'Accept-Language': 'pt-BR', // Melhorar nome dos locais para pt
        }
      }
    )

    if (!response.ok) throw new Error('Erro ao buscar coordenadas.')

    const data: NominatimResponseItem[] = await response.json()
    if (data.length === 0) return null

    const { lat, lon, name = '', display_name } = data[0]
    const cep = extrairCEP(display_name)
    const viaCepData = cep ? await buscarDadosViaCep(cep) : null

    return {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      name,
      display_name,
      viaCepData
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas com endereço:', error)
    return null
  }
}
