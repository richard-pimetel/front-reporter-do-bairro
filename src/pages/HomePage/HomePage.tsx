
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function HomePage(){
    const { user, isLoggedIn, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            {
            isLoggedIn 
                ? 
                <div>
                    <p>Olá {user?.nome}</p> 
                    <button onClick={() => logout()}>Sair</button>
                </div>
                : <button onClick={() => navigate('/login')}>Entrar</button>
            }
        </div>
    )
}

export default HomePage