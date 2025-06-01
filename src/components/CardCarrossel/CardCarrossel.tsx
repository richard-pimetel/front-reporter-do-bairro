import './CardCarrossel.css'
import { NoticiaItem, Categoria } from '../../types'

interface CardCarrosselProps {
  noticia: NoticiaItem
  ehCardPrincipal: boolean
}

function CardCarrossel({ noticia, ehCardPrincipal }: CardCarrosselProps) {
  const imageUrl =
    noticia.urls_midia && noticia.urls_midia.length > 0
      ? noticia.urls_midia[0].url_midia
      : ehCardPrincipal
        ? 'https://via.placeholder.com/1200x600/CCCCCC/FFFFFF?text=Destaque+Sem+Imagem'
        : 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=Lateral+Sem+Imagem';

  let dataFormatada = 'Data Indisponível';
  if (noticia.data_postagem) {
    try {
      const dataObj = new Date(noticia.data_postagem);
      if (!isNaN(dataObj.getTime())) {
        dataFormatada = dataObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    } catch (e) {
      console.error('Erro ao formatar data no CardCarrossel:', e);
    }
  }

  const linkNoticia = `/noticia/${noticia.id}`;

  return (
    <a href={linkNoticia} className={`card-carrossel ${ehCardPrincipal ? 'card-principal' : 'card-lateral'}`}>
      <img src={imageUrl} alt={noticia.titulo} className="card-carrossel-imagem" />
      <div className="card-carrossel-overlay">
        <span className="card-carrossel-categoria">
          {noticia.categorias && noticia.categorias.length > 0
            ? (noticia.categorias[0] as Categoria).nome
            : 'Geral'}
        </span>
        <h3 className="card-carrossel-titulo">{noticia.titulo}</h3>
        <p className="card-carrossel-data">{dataFormatada}</p>
        {/* CORREÇÃO AQUI: Verifique se noticia.endereco existe antes de acessá-lo */}
        {noticia.endereco && noticia.endereco.display_name && (
          <p className="card-carrossel-endereco">{noticia.endereco.display_name}</p>
        )}
      </div>
    </a>
  );
}

export default CardCarrossel;