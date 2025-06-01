import DestaquesNoticias from '../../components/DestaquesNoticias/DestaquesNoticias';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import './HomePage.css'; 
import { NoticiaItem} from '../../types'; // Ajuste o caminho conforme onde você salvou o arquivo de tipos

const dadosMockNoticias: NoticiaItem[] = [
  {
    id: 1, // id como number
    titulo: 'Novo centro comunitário será inaugurado no próximo mês',
    categorias: [{ id: 1, nome: 'DESTAQUE', sigla: 'DST', descricao: 'Notícias de grande relevância' }], // Array de Categoria
    urls_midia: [ // Usando urls_midia para as imagens
      'https://via.placeholder.com/1200x600/0000FF/FFFFFF?text=Comunidade+1',
      'https://via.placeholder.com/1200x600/FF0000/FFFFFF?text=Comunidade+2',
      'https://via.placeholder.com/1200x600/00FF00/FFFFFF?text=Comunidade+3',
    ],
    link: '#',
    conteudo: 'Espaço ofertará aulas e salas para cursos gratuitos para moradores do bairro.', // Conteudo
    data_postagem: new Date('2025-05-30T18:45:00'), // data_postagem como Date
    endereco: { // Endereço obrigatório
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 2,
    titulo: 'Feira gastronômica acontece neste fim de semana na praça central',
    categorias: [{ id: 2, nome: 'GASTRONOMIA', sigla: 'GAS', descricao: 'Eventos culinários' }],
    urls_midia: ['https://via.placeholder.com/600x300/FFA500/FFFFFF?text=Feira+Gastronomica'],
    link: '#',
    conteudo: 'Variedade de comidas e bebidas típicas da região, com chefs renomados e muitas atrações para toda a família.',
    data_postagem: new Date('2025-05-31T10:00:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 3,
    titulo: 'Moradores se unem para revitalizar praça abandonada',
    categorias: [{ id: 3, nome: 'COMUNIDADE', sigla: 'COM', descricao: 'Ações comunitárias' }],
    urls_midia: ['https://via.placeholder.com/600x300/800080/FFFFFF?text=Praca+Revitalizada'],
    link: '#',
    conteudo: 'Ação voluntária visa transformar espaço em área de lazer e convivência para todos, com jardinagem e pintura.',
    data_postagem: new Date('2025-05-30T16:30:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 4,
    titulo: 'Escola local recebe prêmio de excelência em educação',
    categorias: [{ id: 4, nome: 'EDUCAÇÃO', sigla: 'EDU', descricao: 'Notícias sobre educação' }],
    urls_midia: ['https://via.placeholder.com/400x250/008000/FFFFFF?text=Escola+Premiada'],
    link: '#',
    conteudo: 'Instituição do bairro foi reconhecida pelo projeto de leitura que envolveu toda a comunidade, promovendo o hábito da leitura entre os alunos.',
    data_postagem: new Date('2025-05-31T14:32:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 5,
    titulo: 'Novo posto de saúde começa a funcionar na próxima semana',
    categorias: [{ id: 5, nome: 'SAÚDE', sigla: 'SAU', descricao: 'Notícias sobre saúde' }],
    urls_midia: ['https://via.placeholder.com/400x250/00BFFF/FFFFFF?text=Posto+Saude'],
    link: '#',
    conteudo: 'Unidade terá capacidade para atender até 1.500 moradores por mês com especialidades diversas, como pediatria e clínica geral.',
    data_postagem: new Date('2025-05-30T11:00:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 6,
    titulo: 'Parque do bairro ganhará nova iluminação e equipamentos de...',
    categorias: [{ id: 6, nome: 'INFRAESTRUTURA', sigla: 'INF', descricao: 'Melhorias urbanas' }],
    urls_midia: ['https://via.placeholder.com/400x250/DAA520/FFFFFF?text=Parque+Iluminado'],
    link: '#',
    conteudo: 'Prefeitura investirá R$ 500 mil para melhorias que serão entregues em dois meses, incluindo pista de caminhada e áreas de lazer.',
    data_postagem: new Date('2025-05-31T11:43:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 7,
    titulo: 'Campanha de vacinação contra gripe começa neste sábado',
    categorias: [{ id: 7, nome: 'SAÚDE', sigla: 'SAU', descricao: 'Campanhas de saúde' }],
    urls_midia: ['https://via.placeholder.com/400x250/DC143C/FFFFFF?text=Vacinacao'],
    link: '#',
    conteudo: 'Postos de saúde do bairro estarão abertos das 8h às 17h para imunizar moradores, priorizando grupos de risco e idosos.',
    data_postagem: new Date('2025-05-30T10:00:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
  {
    id: 8,
    titulo: 'Comércio local promove semana de descontos especiais',
    categorias: [{ id: 8, nome: 'ECONOMIA', sigla: 'ECO', descricao: 'Notícias sobre comércio' }],
    urls_midia: ['https://via.placeholder.com/400x250/4682B4/FFFFFF?text=Descontos'],
    link: '#',
    conteudo: 'Lojas participantes oferecerão até 50% de desconto em diversos produtos e serviços, impulsionando a economia do bairro.',
    data_postagem: new Date('2025-05-31T09:15:00'),
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      display_name: 'Praça da Sé, Sé, São Paulo - SP',
      lat: -23.55052,
      lon: -46.633309,
    },
  },
];

function HomePage() {
  // As três primeiras notícias para o carrossel de destaques
  const noticiasDestaque = dadosMockNoticias.slice(0, 3);
  // As notícias restantes para a grade de notícias
  const ultimasNoticias = dadosMockNoticias.slice(3);

  return (
    <div className="homepage">
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
            <button className="icone-busca"><ion-icon name="search-outline"></ion-icon></button> {/* Mudei para ícone real */}
          </div>
          <button className="icone-notificacao"><ion-icon name="notifications-outline"></ion-icon></button> {/* Mudei para ícone real */}
          <button className="icone-configuracao"><ion-icon name="settings-outline"></ion-icon></button> {/* Mudei para ícone real */}
          <button className="icone-perfil"><ion-icon name="person-circle-outline"></ion-icon></button> {/* Mudei para ícone real */}
          <button className="botao-denuncia">
            <span className="ponto-vermelho"></span> Denuncie ou Reportar
          </button>
        </div>
      </header>

      <main className="conteudo-principal">
        <DestaquesNoticias noticias={noticiasDestaque} />

        <h2 className="titulo-secao">Últimas Notícias</h2>
        <ListaNoticias noticias={ultimasNoticias} />
      </main>
    </div>
  );
}

export default HomePage;