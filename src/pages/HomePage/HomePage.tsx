
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

// src/HomePage.tsx
import React from 'react';
import DestaquesNoticias from '../../components/DestaquesNoticias/DestaquesNoticias';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import './HomePage.css'; // Vamos criar este arquivo CSS

// Simular dados da API
const dadosMockNoticias = [
  {
    id: '1',
    titulo: 'Novo centro comunitário será inaugurado no próximo mês',
    categoria: 'DESTAQUE',
    imagens: [
      'https://via.placeholder.com/1200x600/0000FF/FFFFFF?text=Comunidade+1', // Imagem principal
      'https://via.placeholder.com/1200x600/FF0000/FFFFFF?text=Comunidade+2',
      'https://via.placeholder.com/1200x600/00FF00/FFFFFF?text=Comunidade+3',
    ],
    link: '#',
    descricao: 'Espaço ofertará aulas e salas para cursos gratuitos para moradores do bairro.',
    tempo: 'Ontem, 18:45',
  },
  {
    id: '2',
    titulo: 'Feira gastronômica acontece neste fim de semana na praça central',
    categoria: 'GASTRONOMIA',
    imagens: ['https://via.placeholder.com/600x300/FFA500/FFFFFF?text=Feira+Gastronomica'],
    link: '#',
    descricao: 'Variedade de comidas e bebidas típicas da região, com chefs renomados e muitas atrações para toda a família.',
    tempo: 'Hoje, 10:00',
  },
  {
    id: '3',
    titulo: 'Moradores se unem para revitalizar praça abandonada',
    categoria: 'COMUNIDADE',
    imagens: ['https://via.placeholder.com/600x300/800080/FFFFFF?text=Praca+Revitalizada'],
    link: '#',
    descricao: 'Ação voluntária visa transformar espaço em área de lazer e convivência para todos, com jardinagem e pintura.',
    tempo: 'Ontem, 16:30',
  },
  {
    id: '4',
    titulo: 'Escola local recebe prêmio de excelência em educação',
    categoria: 'EDUCAÇÃO',
    imagem: 'https://via.placeholder.com/400x250/008000/FFFFFF?text=Escola+Premiada',
    link: '#',
    descricao: 'Instituição do bairro foi reconhecida pelo projeto de leitura que envolveu toda a comunidade, promovendo o hábito da leitura entre os alunos.',
    tempo: 'Hoje, 14:32',
  },
  {
    id: '5',
    titulo: 'Novo posto de saúde começa a funcionar na próxima semana',
    categoria: 'SAÚDE',
    imagem: 'https://via.placeholder.com/400x250/00BFFF/FFFFFF?text=Posto+Saude',
    link: '#',
    descricao: 'Unidade terá capacidade para atender até 1.500 moradores por mês com especialidades diversas, como pediatria e clínica geral.',
    tempo: 'Ontem, 11:00',
  },
  {
    id: '6',
    titulo: 'Parque do bairro ganhará nova iluminação e equipamentos de...',
    categoria: 'INFRAESTRUTURA',
    imagem: 'https://via.placeholder.com/400x250/DAA520/FFFFFF?text=Parque+Iluminado',
    link: '#',
    descricao: 'Prefeitura investirá R$ 500 mil para melhorias que serão entregues em dois meses, incluindo pista de caminhada e áreas de lazer.',
    tempo: 'Hoje, 11:43',
  },
  {
    id: '7',
    titulo: 'Campanha de vacinação contra gripe começa neste sábado',
    categoria: 'SAÚDE',
    imagem: 'https://via.placeholder.com/400x250/DC143C/FFFFFF?text=Vacinacao',
    link: '#',
    descricao: 'Postos de saúde do bairro estarão abertos das 8h às 17h para imunizar moradores, priorizando grupos de risco e idosos.',
    tempo: 'Ontem, 10:00',
  },
  {
    id: '8',
    titulo: 'Comércio local promove semana de descontos especiais',
    categoria: 'ECONOMIA',
    imagem: 'https://via.placeholder.com/400x250/4682B4/FFFFFF?text=Descontos',
    link: '#',
    descricao: 'Lojas participantes oferecerão até 50% de desconto em diversos produtos e serviços, impulsionando a economia do bairro.',
    tempo: 'Hoje, 09:15',
  },
];

const HomePage: React.FC = () => {
  // As três primeiras notícias para o carrossel de destaques
  const noticiasDestaque = dadosMockNoticias.slice(0, 3);
  // As notícias restantes para a grade de notícias
  const ultimasNoticias = dadosMockNoticias.slice(3);

  return (
    <div className="homepage">
      <header className="cabecalho">
        <div className="cabecalho-esquerda">
          <button className="menu-hamburguer">☰</button>
          <span className="nome-app">BairroNews</span>
        </div>
        <div className="cabecalho-direita">
          <div className="cabecalho-busca">
            <input type="text" placeholder="Seu Bairro: 24ºC Parcialmente nublado" className="campo-busca" />
            <button className="icone-busca">🔍</button>
          </div>
          <button className="icone-notificacao">🔔</button>
          <button className="icone-configuracao">⚙️</button>
          <button className="icone-perfil">👤</button>
          <button className="botao-denuncia">
            <span className="ponto-vermelho"></span> Denuncie ou Reportar
          </button>
        </div>
      </header>

      {/* Removendo o card de temperatura conforme solicitado */}
      {/* <div className="card-temperatura">...</div> */}

      <main className="conteudo-principal">
        <DestaquesNoticias noticias={noticiasDestaque} />

        <h2 className="titulo-secao">Últimas Notícias</h2>
        <ListaNoticias noticias={ultimasNoticias} />
      </main>
    </div>
  );
};

export default HomePage;
