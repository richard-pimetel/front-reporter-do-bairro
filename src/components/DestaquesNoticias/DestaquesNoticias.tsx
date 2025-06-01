import CardCarrossel from '../CardCarrossel/CardCarrossel'; // Ajuste o caminho se necessário
import './DestaquesNoticias.css';
import { NoticiaItem } from '../../types'; // Importe NoticiaItem

interface DestaquesNoticiasProps {
  noticias: NoticiaItem[];
}

function DestaquesNoticias({ noticias }: DestaquesNoticiasProps) {
  const noticiaPrincipal = noticias[0];
  const noticiasLaterais = noticias.slice(1, 3);

  if (!noticiaPrincipal) return null;

  return (
    <div className="destaques-noticias-container">
      <div className="card-principal-wrapper">
        <CardCarrossel
          key={noticiaPrincipal.id}
          noticia={noticiaPrincipal} // Passa o objeto completo NoticiaItem
          ehCardPrincipal={true}
        />
      </div>
      <div className="cards-laterais-wrapper">
        {noticiasLaterais.map((item) => (
          <CardCarrossel
            key={item.id}
            noticia={item} // Passa o objeto completo NoticiaItem
            ehCardPrincipal={false}
          />
        ))}
      </div>
    </div>
  );
}

export default DestaquesNoticias;