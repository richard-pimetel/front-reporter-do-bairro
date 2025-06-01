// src/components/DestaquesNoticias/DestaquesNoticias.tsx
import CardCarrossel from '../CardCarrossel/CardCarrossel'; // Ajuste o caminho se necessário
import './DestaquesNoticias.css';
import { NoticiaItem } from '../../types';

interface DestaquesNoticiasProps {
  noticias: NoticiaItem[];
}

function DestaquesNoticias({ noticias }: DestaquesNoticiasProps) {
  // Garante que haja notícias antes de tentar acessá-las
  if (!noticias || noticias.length === 0) {
    return <div className="destaques-noticias-container">Nenhuma notícia em destaque para exibir.</div>;
  }

  const noticiaPrincipal = noticias[0];
  // Pega as próximas 2 notícias para as laterais (índices 1 e 2)
  const noticiasLaterais = noticias.slice(1, 3);

  return (
    <div className="destaques-noticias-container">
      <div className="card-principal-wrapper">
        <CardCarrossel
          key={noticiaPrincipal.id}
          noticia={noticiaPrincipal}
          ehCardPrincipal={true}
        />
      </div>
      <div className="cards-laterais-wrapper">
        {noticiasLaterais.map((item) => (
          <CardCarrossel
            key={item.id}
            noticia={item}
            ehCardPrincipal={false}
          />
        ))}
      </div>
    </div>
  );
}

export default DestaquesNoticias;