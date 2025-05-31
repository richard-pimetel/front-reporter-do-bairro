import BASE_URL from '../../config'

interface LoginInput {
    email: string
    senha: string
}

interface Usuario {
    id: number
    nome: string
    email: string
    data_nascimento: string
    foto_perfil: string
    biografia: string | null
}

interface LoginResponse {
    status: boolean
    status_code: number
    messagem: string
    usuario: Usuario
}

async function loginUser(data: LoginInput): Promise<LoginResponse | null> {
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                senha: data.senha
            })
        })

        if (!response.ok) {
            throw new Error('Erro ao fazer login')
        }

        const responseData: LoginResponse = await response.json()
        return responseData

    } catch (error) {
        console.error(error)
        return null
    }
}

export default loginUser
