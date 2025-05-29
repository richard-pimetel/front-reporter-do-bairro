import {CoordenadasComEndereco, ReverseNominatimResponse} from '../../types'
import {extrairCEP} from '../../utils/auxiliaryFunctions'
import buscarDadosViaCep from '../viaCEP/buscarDadosViaCep'


export default async function buscarEndereco(lat: number, lon: number): Promise<CoordenadasComEndereco | null> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        { method: 'GET' }
      )
  
      if (!response.ok) throw new Error('Erro ao buscar endereço por coordenadas')
  
      const data: ReverseNominatimResponse = await response.json()
  
      const { display_name, name = '' } = data
      const cep = extrairCEP(display_name)
      const viaCepData = cep ? await buscarDadosViaCep(cep) : null
  
      return {
        lat,
        lon,
        name,
        display_name,
        viaCepData
      }
    } catch (error) {
      console.error('Erro ao buscar endereço por coordenadas:', error)
      return null
    }
  }