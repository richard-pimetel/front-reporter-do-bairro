import {ViaCepResponse} from '../../types'


/**
 * Função que busca dados do ViaCEP com base no CEP, removendo o campo 'ddd'.
 */
export default async  function buscarDadosViaCep(cep: string): Promise<ViaCepResponse | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    if (!response.ok) throw new Error('Erro ao buscar CEP')

    const data = await response.json()
    if ('erro' in data) return null

    // Remove o campo ddd antes de retornar
    const { ddd, ...rest } = data
    return rest
  } catch (error) {
    console.error('Erro ao buscar dados do ViaCEP:', error)
    return null
  }
}
