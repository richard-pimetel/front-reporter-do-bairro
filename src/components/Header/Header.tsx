// src/components/Header/Header.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css'; // Crie este arquivo CSS para o cabeçalho

interface HeaderProps {
  showSearchBar?: boolean;
  onOpenCreateNewsModal?: () => void; // <--- NOVA PROP AQUI
}

function Header(props: HeaderProps) {
  const { showSearchBar = true, onOpenCreateNewsModal } = props; // Desestrutura a nova prop
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleOpenCreateNews = () => { // Função para o botão de criar notícia
    if (isLoggedIn) {
      onOpenCreateNewsModal && onOpenCreateNewsModal(); // Chama a prop se ela existir
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
        {/* Use a nova função no botão "navigate" que antes abria o modal */}
        <button className="botao-noticia" onClick={handleOpenCreateNews}> {/* <-- ATUALIZADO */}
          <ion-icon name="navigate"></ion-icon>
        </button>
        <button className="botao-mapa" onClick={navigateToMap}>
          <ion-icon name="map-outline"></ion-icon>
        </button>
        <button><ion-icon name="notifications-outline"></ion-icon></button>
        <button><ion-icon name="settings-outline"></ion-icon></button>

        {isLoggedIn ? (
          <>
            <button><ion-icon name="person-circle-outline"></ion-icon></button>
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