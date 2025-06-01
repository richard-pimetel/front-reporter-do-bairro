// src/pages/HomePage/HomePage.tsx
import { useState } from 'react'
import DestaquesNoticias from '../../components/DestaquesNoticias/DestaquesNoticias'
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias'
import CreateNewsModal from '../../components/CreateNewsModal/CreateNewsModal'
import './HomePage.css'
import { NoticiaItem, NoticiaCreatePayload} from '../../types'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { postNoticia } from '../../API/noticia/postNoticia'

// Simular dados da API (adaptados aos novos tipos)
const dadosMockNoticias: NoticiaItem[] = [
  {
    id: 1,
    titulo: 'Novo centro comunitário será inaugurado no próximo mês',
    categorias: [{ id: 1, nome: 'COMUNIDADE', sigla: 'COM', descricao: 'Notícias de grande relevância' }],
    urls_midia: [
      'https://via.placeholder.com/1200x600/0000FF/FFFFFF?text=Comunidade+1',
      'https://via.placeholder.com/1200x600/FF0000/FFFFFF?text=Comunidade+2',
      'https://via.placeholder.com/1200x600/00FF00/FFFFFF?text=Comunidade+3',
    ],
    
    conteudo: 'Espaço ofertará aulas e salas para cursos gratuitos para moradores do bairro.',
    data_postagem: new Date('2025-05-30T18:45:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 2,
    titulo: 'Feira gastronômica acontece neste fim de semana na praça central',
    categorias: [{ id: 2, nome: 'GASTRONOMIA', sigla: 'GAS', descricao: 'Eventos culinários' }],
    urls_midia: ['https://via.placeholder.com/600x300/FFA500/FFFFFF?text=Feira+Gastronomica'],
    
    conteudo: 'Variedade de comidas e bebidas típicas da região, com chefs renomados e muitas atrações para toda a família.',
    data_postagem: new Date('2025-05-31T10:00:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 3,
    titulo: 'Moradores se unem para revitalizar praça abandonada',
    categorias: [{ id: 3, nome: 'COMUNIDADE', sigla: 'COM', descricao: 'Ações comunitárias' }],
    urls_midia: ['https://via.placeholder.com/600x300/800080/FFFFFF?text=Praca+Revitalizada'],
    
    conteudo: 'Ação voluntária visa transformar espaço em área de lazer e convivência para todos, com jardinagem e pintura.',
    data_postagem: new Date('2025-05-30T16:30:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 4,
    titulo: 'Escola local recebe prêmio de excelência em educação',
    categorias: [{ id: 4, nome: 'EDUCAÇÃO', sigla: 'EDU', descricao: 'Notícias sobre educação' }],
    urls_midia: ['https://via.placeholder.com/400x250/008000/FFFFFF?text=Escola+Premiada'],
    
    conteudo: 'Instituição do bairro foi reconhecida pelo projeto de leitura que envolveu toda a comunidade, promovendo o hábito da leitura entre os alunos.',
    data_postagem: new Date('2025-05-31T14:32:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 5,
    titulo: 'Novo posto de saúde começa a funcionar na próxima semana',
    categorias: [{ id: 5, nome: 'SAÚDE', sigla: 'SAU', descricao: 'Notícias sobre saúde' }],
    urls_midia: ['https://via.placeholder.com/400x250/00BFFF/FFFFFF?text=Posto+Saude'],
    
    conteudo: 'Unidade terá capacidade para atender até 1.500 moradores por mês com especialidades diversas, como pediatria e clínica geral.',
    data_postagem: new Date('2025-05-30T11:00:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 6,
    titulo: 'Parque do bairro ganhará nova iluminação e equipamentos de...',
    categorias: [{ id: 6, nome: 'INFRAESTRUTURA', sigla: 'INF', descricao: 'Melhorias urbanas' }],
    urls_midia: ['https://via.placeholder.com/400x250/DAA520/FFFFFF?text=Parque+Iluminado'],
    
    conteudo: 'Prefeitura investirá R$ 500 mil para melhorias que serão entregues em dois meses, incluindo pista de caminhada e áreas de lazer.',
    data_postagem: new Date('2025-05-31T11:43:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 7,
    titulo: 'Campanha de vacinação contra gripe começa neste sábado',
    categorias: [{ id: 7, nome: 'SAÚDE', sigla: 'SAU', descricao: 'Campanhas de saúde' }],
    urls_midia: ['https://via.placeholder.com/400x250/DC143C/FFFFFF?text=Vacinacao'],
    
    conteudo: 'Postos de saúde do bairro estarão abertos das 8h às 17h para imunizar moradores, priorizando grupos de risco e idosos.',
    data_postagem: new Date('2025-05-30T10:00:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 8,
    titulo: 'Comércio local promove semana de descontos especiais',
    categorias: [{ id: 8, nome: 'ECONOMIA', sigla: 'ECO', descricao: 'Notícias sobre comércio' }],
    urls_midia: ['https://via.placeholder.com/400x250/4682B4/FFFFFF?text=Descontos'],
    
    conteudo: 'Lojas participantes oferecerão até 50% de desconto em diversos produtos e serviços, impulsionando a economia do bairro.',
    data_postagem: new Date('2025-05-31T09:15:00'),
    endereco: {
      cep: '01001-000',
      display_name: 'Praça da Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
];

function HomePage() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allNews, setAllNews] = useState<NoticiaItem[]>(dadosMockNoticias)

  const noticiasDestaque = allNews.slice(0, 3);
  const ultimasNoticias = allNews.slice(3);

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/login')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveNews = async (noticiaData: NoticiaCreatePayload) => {
    console.log("Dados para enviar:", noticiaData)
    try {
      const novaNoticia = await postNoticia(noticiaData); // Chama a função da API
      if (novaNoticia) {
        setAllNews((prevNews) => [novaNoticia, ...prevNews]); // Adiciona a nova notícia ao topo da lista
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
    logout()
    navigate('/login') // Opcional: redirecionar para login após logout
  }

  return (
    <div className={`homepage ${isModalOpen ? 'modal-open' : ''}`}> {/* Adiciona classe para escurecer */}
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
              <button onClick={handleLogout} className="botao-logout">Sair</button> {/* Botão de sair */}
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="botao-login">Login</button>
          )}

        </div>
      </header>

      <main className="conteudo-principal">
        <DestaquesNoticias noticias={noticiasDestaque} />

        <h2 className="titulo-secao">Últimas Notícias</h2>
        <ListaNoticias noticias={ultimasNoticias} />
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