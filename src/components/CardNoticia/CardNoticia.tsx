import './CardNoticia.css'
import { NoticiaItem } from '../../types'

// CardNoticiaProps agora recebe diretamente um NoticiaItem
interface CardNoticiaProps {
  noticia: NoticiaItem;
}

function CardNoticia({ noticia }: CardNoticiaProps) { // Removido : React.FC
  // Garante que urls_midia é um array, mesmo que opcional, e pega o primeiro item
  const imagemPrincipal = (noticia.urls_midia && noticia.urls_midia.length > 0)
    ? noticia.urls_midia[0]
    : 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?text=Sem+Imagem'; // Imagem fallback

  return (
    <a href={noticia.link} className="card-noticia">
      <div className="card-noticia-imagem-container">
        <img src={imagemPrincipal} alt={noticia.titulo} className="card-noticia-imagem" />
        {/* Use a primeira categoria se existir, senão um fallback */}
        <span className="card-noticia-categoria">{noticia.categorias[0]?.nome || 'Sem Categoria'}</span>
      </div>
      <div className="card-noticia-conteudo">
        <h4 className="card-noticia-titulo">{noticia.titulo}</h4>
        <p className="card-noticia-descricao">{noticia.conteudo}</p> {/* Conteudo */}
        {/* Formate a data_postagem para exibir como string */}
        {noticia.data_postagem && (
          <p className="card-noticia-tempo">
            {noticia.data_postagem.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </a>
  );
}

export default CardNoticia