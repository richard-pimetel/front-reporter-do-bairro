// src/api/categories.ts
import { Categoria } from '../../types'; // Ajuste o caminho se necessário
import BASE_URL from '../config'

export async function fetchCategories(): Promise<Categoria[]> {
  try {
    const response = await fetch(`${BASE_URL}/categorias`); // Exemplo de endpoint
    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
    }
    const data: Categoria[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}