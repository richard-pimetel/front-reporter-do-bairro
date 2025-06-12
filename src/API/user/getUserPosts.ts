// src/API/noticia/getUserPosts.ts
import BASE_URL from '../config';
import { NoticiaItem } from '../../types'; // Certifique-se que NoticiaItem está definida em types.ts

interface UserPostsResponse {
    status: boolean;
    status_code: number;
    message: string;
    noticias: NoticiaItem[]; // Sua API deve retornar uma lista de NoticiaItem aqui
}

async function getUserPosts(userId: number): Promise<NoticiaItem[] | null> {
    try {
        // ESTE É O ENDPOINT DO BACKEND QUE PRECISA FUNCIONAR: /v1/bairro-news/posts/user/{userId}
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Se este endpoint exigir token de autenticação, adicione aqui
                // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
        });

        if (!response.ok) {
            // Este console.error será ativado se a API retornar 404, 500, etc.
            console.error(`Erro ao buscar publicações do usuário ${userId}: ${response.statusText}`);
            return null;
        }

        const responseData: UserPostsResponse = await response.json();
        // O console.log abaixo é para você VER o que sua API está retornando.
        console.log("Resposta da API para publicações do usuário:", responseData);
        
        // Verifica se a propriedade 'noticias' existe e é um array
        if (responseData && Array.isArray(responseData.noticias)) {
            return responseData.noticias; 
        } else {
            console.warn("A resposta da API para publicações não contém um array 'noticias'.", responseData);
            return null;
        }

    } catch (error) {
        console.error("Erro em getUserPosts (capturado pelo try-catch):", error);
        return null;
    }
}

export default getUserPosts;