import BASE_URL from '../config'
import { UsuarioUpdatePayload, Usuario } from '../../types'; // Importe os tipos que você definiu

interface UpdateUsuarioResponse {
  status: boolean;
  status_code: number;
  message?: string; // Mensagem de sucesso ou erro do backend
  user?: Usuario; // Opcional: O objeto do usuário atualizado, se o backend o retornar
}

export async function updateUsuario(payload: UsuarioUpdatePayload): Promise<UpdateUsuarioResponse> {
  // Constrói a URL usando o ID do usuário do payload
  const url = `${BASE_URL}/user/${payload.id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT', // Método HTTP para atualização
      headers: {
        'Content-Type': 'application/json', // Informa que o corpo é um JSON
        // Se sua API exige autenticação (ex: token JWT), adicione aqui:
        // 'Authorization': `Bearer SEU_TOKEN_AQUI`, 
      },
      body: JSON.stringify(payload), // Converte o payload JavaScript para JSON
    });

    const data = await response.json(); // Pega a resposta JSON do backend

    if (!response.ok) { // Se a resposta não for bem-sucedida (ex: status 4xx ou 5xx)
      console.error(`Erro na atualização do usuário: ${response.status} ${response.statusText}`, data);
      return {
        status: false,
        status_code: response.status,
        message: data.message || 'Falha ao atualizar usuário.', // Pega a mensagem de erro do backend ou uma padrão
      };
    }

    console.log('Usuário atualizado com sucesso:', data);
    return {
      status: true,
      status_code: response.status,
      message: data.message || 'Usuário atualizado com sucesso!',
      // Adaptação caso o backend retorne o usuário dentro de um array 'user' ou diretamente
      user: data.user && Array.isArray(data.user) ? data.user[0] : data.user, 
    };

  } catch (error) {
    console.error('Erro na requisição de atualização de usuário:', error);
    return {
      status: false,
      status_code: 500,
      message: 'Erro na conexão com o servidor.',
    };
  }
}