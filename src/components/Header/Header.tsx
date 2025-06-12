// src/components/Header/Header.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css'; // Crie este arquivo CSS para o cabeçalho

interface HeaderProps {
    showSearchBar?: boolean;
    onOpenCreateNewsModal?: () => void;
}

function Header(props: HeaderProps) {
    const { showSearchBar = true, onOpenCreateNewsModal } = props;
    // Adicione 'user' aqui se o seu AuthContext o fornecer
    const { logout, isLoggedIn, user } = useAuth(); 
    const navigate = useNavigate();

    const handleOpenCreateNews = () => {
        if (isLoggedIn) {
            onOpenCreateNewsModal && onOpenCreateNewsModal();
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navigateToMap = () => {
        navigate('/map');
    };

    // Nova função para lidar com o clique no ícone do perfil
    const handleProfileClick = () => {
        // Verifica se o usuário está logado e se o objeto 'user' e seu 'id' existem
        if (isLoggedIn && user && user.id) {
            navigate(`/profile/${user.id}`); // Navega para a página de perfil usando o ID do usuário
        } else {
            // Se não estiver logado ou o ID do usuário não estiver disponível, redireciona para a página de login
            navigate('/login');
        }
    };

    return (
        <header className="cabecalho">
            <div className="cabecalho-esquerda">
                <button className="menu-hamburguer">
                    <ion-icon name="menu-sharp"></ion-icon>
                </button>
                <span className="nome-app" onClick={() => navigate('/')}>BairroNews</span>
            </div>
            <div className="cabecalho-direita">
                {showSearchBar && (
                    <div className="cabecalho-busca">
                        <input type="text" placeholder="Seu Bairro: 24ºC Parcialmente nublado" className="campo-busca" />
                        <button className="icone-busca"><ion-icon name="search-outline"></ion-icon></button>
                    </div>
                )}
                <button className="botao-noticia" onClick={handleOpenCreateNews}>
                    <ion-icon name="navigate"></ion-icon>
                </button>
                <button className="botao-mapa" onClick={navigateToMap}>
                    <ion-icon name="map-outline"></ion-icon>
                </button>
                <button><ion-icon name="notifications-outline"></ion-icon></button>
                <button><ion-icon name="settings-outline"></ion-icon></button>

                {isLoggedIn ? (
                    <>
                        {/* Adicionado o onClick para o ícone de perfil */}
                        <button onClick={handleProfileClick} title="Meu Perfil">
                            <ion-icon name="person-circle-outline"></ion-icon>
                        </button>
                        <button onClick={handleLogout} className="botao-logout">Sair</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')} className="botao-login">Login</button>
                )}
            </div>
        </header>
    );
}

export default Header;