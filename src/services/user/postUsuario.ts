import BASE_URL from '../config'

interface UsuarioInput {
    nome: string
    email: string
    senha: string
    data_de_nascimento: Date 
    biografia?: string
    foto_perfil?: string
}

interface Usuario {
    id: number
    nome: string
    email: string
    data_nascimento: string
    foto_perfil: string
    biografia: string | null
}

interface UsuarioResponse {
    status: boolean
    status_code: number
    messagem: string
    usuario: Usuario
}

async function postUsuario(data: UsuarioInput): Promise<UsuarioResponse | null> {
    try {
        const dados = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            data_nascimento: data.data_de_nascimento,
            biografia: data.biografia || null,
            foto_perfil: data.foto_perfil || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
        }

        const response = await fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário')
        }

        const responseData: UsuarioResponse = await response.json()
        return responseData

    } catch (error) {
        console.error(error)
        return null
    }
}

export default postUsuario
