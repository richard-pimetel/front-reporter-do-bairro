// src/components/DestaquesNoticias.tsx
import React from 'react';
import CardCarrossel from '../CardCarrossel/CardCarrossel';
import './DestaquesNoticias.css'; // Vamos criar este arquivo CSS

interface NoticiaItem {
  id: string;
  titulo: string;
  categoria: string;
  imagens: string[];
  link: string;
  descricao: string; // Não usado diretamente no CardCarrossel, mas bom para a estrutura de dados
  tempo?: string;
}

interface DestaquesNoticiasProps {
  noticias: NoticiaItem[];
}

const DestaquesNoticias: React.FC<DestaquesNoticiasProps> = ({ noticias }) => {
  const noticiaPrincipal = noticias[0];
  const noticiasLaterais = noticias.slice(1, 3); // Pega as próximas duas notícias

  if (!noticiaPrincipal) return null; // Retorna nulo se não houver notícias

  return (
    <div className="destaques-noticias-container">
      <div className="card-principal-wrapper">
        <CardCarrossel
          key={noticiaPrincipal.id}
          titulo={noticiaPrincipal.titulo}
          categoria={noticiaPrincipal.categoria}
          imagens={noticiaPrincipal.imagens}
          link={noticiaPrincipal.link}
          tempo={noticiaPrincipal.tempo}
          ehCardPrincipal={true}
        />
      </div>
      <div className="cards-laterais-wrapper">
        {noticiasLaterais.map((item) => (
          <CardCarrossel
            key={item.id}
            titulo={item.titulo}
            categoria={item.categoria}
            imagens={item.imagens}
            link={item.link}
            tempo={item.tempo}
            ehCardPrincipal={false}
          />
        ))}
      </div>
    </div>
  );
};

export default DestaquesNoticias;
