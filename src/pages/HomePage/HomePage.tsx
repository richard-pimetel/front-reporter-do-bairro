// src/pages/HomePage/HomePage.tsx

import { useState, useEffect } from 'react';
import DestaquesNoticias from '../../components/DestaquesNoticias/DestaquesNoticias';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import CreateNewsModal from '../../components/CreateNewsModal/CreateNewsModal';
import Header from '../../components/Header/Header'; // Importar o novo componente Header
import './HomePage.css';

import { NoticiaItem, NoticiaCreatePayload } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { postNoticia } from '../../API/noticia/postNoticia';
import { getAllNoticia } from '../../API/noticia/getAllNoticia';

function HomePage() {
  const { isLoggedIn } = useAuth(); // Apenas isLoggedIn é necessário aqui para o modal
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- CONTINUA NO HOMEPAGE
  const [allNews, setAllNews] = useState<NoticiaItem[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const response = await getAllNoticia();
      if (response && response.noticias) {
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
  }, []);

  const noticiasDestaque = allNews.slice(0, 3);
  const ultimasNoticias = allNews.slice(3);

  // Esta função será passada para o Header
  const handleOpenCreateNewsModal = () => { // <--- FUNÇÃO PERMANECE AQUI
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => { // <--- FUNÇÃO PERMANECE AQUI
    setIsModalOpen(false);
  };

  const handleSaveNews = async (noticiaData: NoticiaCreatePayload) => { // <--- FUNÇÃO PERMANECE AQUI
    console.log("Dados para enviar:", noticiaData);
    try {
      const novaNoticia = await postNoticia(noticiaData);
      if (novaNoticia) {
        setAllNews((prevNews) => {
          const updatedNews = [novaNoticia, ...prevNews];
          return updatedNews.sort((a, b) =>
            new Date(b.data_postagem).getTime() - new Date(a.data_postagem).getTime()
          );
        });
        alert('Notícia criada com sucesso!');
        setIsModalOpen(false); // Fechar modal após salvar
      } else {
        alert('Falha ao criar notícia. Verifique o console para detalhes.');
      }
    } catch (error) {
      console.error("Erro ao salvar notícia:", error);
      alert('Ocorreu um erro ao criar a notícia.');
    }
  };

  return (
    <div className={`homepage ${isModalOpen ? 'modal-open' : ''}`}>
      {/* Usar o componente Header e passar a função para ele */}
      <Header
        onOpenCreateNewsModal={handleOpenCreateNewsModal} // <--- PASSANDO A FUNÇÃO COMO PROP
      />

      <main className="conteudo-principal">
        {loadingNews ? (
          <p>Carregando notícias...</p>
        ) : (
          <>
            <DestaquesNoticias noticias={noticiasDestaque} />

            <h2 className="titulo-secao">Últimas Notícias</h2>
            <ListaNoticias noticias={ultimasNoticias} />
          </>
        )}
      </main>

      {/* O CreateNewsModal continua sendo renderizado no HomePage */}
      <CreateNewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveNews}
      />
    </div>
  );
}

export default HomePage;