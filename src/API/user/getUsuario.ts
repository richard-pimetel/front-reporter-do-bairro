// src/API/user/getUsuario.ts (caminho corrigido para consistência)
import BASE_URL from '../config';
import { Usuario } from '../../types';

// Mantemos UsuarioResponse para tipar a resposta completa da API
interface UsuarioResponse {
    status: boolean;
    status_code: number;
    messagem: string;
    user: Usuario[]; // A API retorna um ARRAY de Usuários
}

// A função agora retorna diretamente Usuario ou null
async function getUsuario(userId: number): Promise<Usuario | null> { // <-- MUDANÇA AQUI
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Se sua API exigir autenticação, você precisará adicionar um token aqui
                // 'Authorization': `Bearer ${seuTokenDeAutentacao}`
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Usuário com ID ${userId} não encontrado.`);
                return null;
            }
            throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
        }

        const responseData: UsuarioResponse = await response.json();
        console.log("Dados completos da resposta da API:", responseData);

        // AQUI ESTÁ A CORREÇÃO: Pegar o primeiro elemento do array 'user'
        // Retornamos o primeiro usuário do array, ou null se o array estiver vazio
        if (responseData.user && responseData.user.length > 0) {
            return responseData.user[0]; // <-- MUDANÇA AQUI
        } else {
            console.warn("Array 'user' vazio ou não encontrado na resposta.");
            return null;
        }

    } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        return null;
    }
}

export default getUsuario;