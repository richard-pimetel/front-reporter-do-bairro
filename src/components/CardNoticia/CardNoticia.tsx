// src/components/CardNoticia/CardNoticia.tsx
import './CardNoticia.css';
import { NoticiaItem, Categoria } from '../../types';

interface CardNoticiaProps {
  noticia: NoticiaItem;
}

function CardNoticia({ noticia }: CardNoticiaProps) {
  // Acessa a primeira URL da mídia do array de objetos UrlMidiaItem.
  // Garante que urls_midia existe, que é um array, e que tem pelo menos um elemento.
  // Depois, acessa a propriedade 'url_midia' desse primeiro elemento.
  const imageUrl =
    noticia.urls_midia && noticia.urls_midia.length > 0
      ? noticia.urls_midia[0].url_midia
      : 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?text=Sem+Imagem'; // Imagem fallback

  // Converte a string data_postagem para um objeto Date antes de formatar
  let dataFormatada = 'Data Indisponível';
  if (noticia.data_postagem) {
    try {
      const dataObj = new Date(noticia.data_postagem);
      // Verifica se a data é válida antes de formatar
      if (!isNaN(dataObj.getTime())) {
        dataFormatada = dataObj.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (e) {
      console.error('Erro ao formatar data:', e);
    }
  }

  // Define o link do card. Use uma rota real se tiver, senão, apenas uma div.
  // Exemplo: `/noticia/${noticia.id}` se você tiver uma rota de detalhes.
  const linkNoticia = `/noticia/${noticia.id}`; // Exemplo, ajuste conforme sua rota

  return (
    <a href={linkNoticia} className="card-noticia"> {/* Alterado para usar linkNoticia */}
      <div className="card-noticia-imagem-container">
        <img src={imageUrl} alt={noticia.titulo} className="card-noticia-imagem" />
        <span className="card-noticia-categoria">
          {noticia.categorias && noticia.categorias.length > 0
            ? (noticia.categorias[0] as Categoria).nome // Adicionado type assertion para Categoria
            : 'Sem Categoria'}
        </span>
      </div>
      <div className="card-noticia-conteudo">
        <h4 className="card-noticia-titulo">{noticia.titulo}</h4>
        <p className="card-noticia-descricao">{noticia.conteudo}</p>
        {noticia.data_postagem && (
          <p className="card-noticia-tempo">{dataFormatada}</p>
        )}
      </div>
    </a>
  );
}

export default CardNoticia;