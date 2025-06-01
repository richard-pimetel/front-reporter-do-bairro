// src/pages/HomePage/HomePage.tsx
import { useState, useEffect } from 'react'; // Importar useEffect
import DestaquesNoticias from '../../components/DestaquesNoticias/DestaquesNoticias';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import CreateNewsModal from '../../components/CreateNewsModal/CreateNewsModal';
import './HomePage.css';
import { NoticiaItem, NoticiaCreatePayload } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { postNoticia } from '../../API/noticia/postNoticia';
import { getAllNoticia } from '../../API/noticia/getAllNoticia'; // Já importado

function HomePage() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allNews, setAllNews] = useState<NoticiaItem[]>([]); // Inicializa com array vazio
  const [loadingNews, setLoadingNews] = useState<boolean>(true); // Estado de carregamento

  // Efeito para carregar as notícias ao montar o componente
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const response = await getAllNoticia();
      if (response && response.noticias) {
        // Ordenar as notícias pela data_postagem em ordem decrescente (mais recente primeiro)
        const sortedNews = response.noticias.sort((a, b) =>
          new Date(b.data_postagem).getTime() - new Date(a.data_postagem).getTime()
        );
        setAllNews(sortedNews);
      } else {
        console.error('Falha ao carregar notícias.');
        setAllNews([]);
      }
      setLoadingNews(false);
    };

    fetchNews();
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  const noticiasDestaque = allNews.slice(0, 3);
  const ultimasNoticias = allNews.slice(3);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveNews = async (noticiaData: NoticiaCreatePayload) => {
    console.log("Dados para enviar:", noticiaData);
    try {
      const novaNoticia = await postNoticia(noticiaData); // Chama a função da API
      if (novaNoticia) {
        // Para garantir que a nova notícia esteja no topo e a lista seja atualizada
        // É melhor refazer a chamada getAllNoticia para ter a lista mais atualizada do backend
        // ou adicionar a nova notícia e reordenar a lista localmente.
        // Por simplicidade, vamos adicionar e reordenar localmente por enquanto.
        setAllNews((prevNews) => {
          const updatedNews = [novaNoticia, ...prevNews];
          return updatedNews.sort((a, b) =>
            new Date(b.data_postagem).getTime() - new Date(a.data_postagem).getTime()
          );
        });
        alert('Notícia criada com sucesso!');
      } else {
        alert('Falha ao criar notícia. Verifique o console para detalhes.');
      }
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert('Ocorreu um erro ao criar a notícia.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`homepage ${isModalOpen ? 'modal-open' : ''}`}>
      <header className="cabecalho">
        <div className="cabecalho-esquerda">
          <button className="menu-hamburguer">
            <ion-icon name="menu-sharp"></ion-icon>
          </button>
          <span className="nome-app">BairroNews</span>
        </div>
        <div className="cabecalho-direita">
          <div className="cabecalho-busca">
            <input type="text" placeholder="Seu Bairro: 24ºC Parcialmente nublado" className="campo-busca" />
            <button className="icone-busca"><ion-icon name="search-outline"></ion-icon></button>
          </div>
          <button className="botao-denuncia" onClick={handleOpenModal}>
            <ion-icon name="navigate"></ion-icon>
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

      <main className="conteudo-principal">
        {loadingNews ? (
          <p>Carregando notícias...</p> // Exibe um status de carregamento
        ) : (
          <>
            <DestaquesNoticias noticias={noticiasDestaque} />

            <h2 className="titulo-secao">Últimas Notícias</h2>
            <ListaNoticias noticias={ultimasNoticias} />
          </>
        )}
      </main>

      <CreateNewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNews}
      />
    </div>
  );
}

export default HomePage;