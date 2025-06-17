// src/components/CardNoticia/CardNoticia.tsx
import './CardNoticia.css'; // Importa o CSS
import { NoticiaItem, Categoria } from '../../types'; // Importe os tipos corretos, incluindo Categoria

interface CardNoticiaProps {
  noticia: NoticiaItem;
}

function CardNoticia({ noticia }: CardNoticiaProps) {
  // DEBUG: Este log deve aparecer no console se o componente está sendo renderizado
  console.log("DEBUG: CardNoticia está sendo RENDERIZADO para a notícia:", noticia.titulo, "ID:", noticia.id);

  const linkNoticia = noticia.id ? `/noticia/${noticia.id}` : '#';

  // Lógica de URL da imagem mais robusta
  const imageUrl =
    (noticia.urls_midia &&
     Array.isArray(noticia.urls_midia) &&
     noticia.urls_midia.length > 0 &&
     noticia.urls_midia[0]?.url_midia)
      ? noticia.urls_midia[0].url_midia
      : 'https://via.placeholder.com/400x250/CCCCCC/FFFFFF?text=Sem+Imagem'; // Imagem de fallback

  // Lógica de nome da categoria mais robusta
  let categoryName = 'Sem Categoria';
  if (noticia.categorias && Array.isArray(noticia.categorias) && noticia.categorias.length > 0) {
    const firstCategory = noticia.categorias[0];
    if (typeof firstCategory === 'object' && firstCategory !== null && 'nome' in firstCategory) {
      categoryName = (firstCategory as Categoria).nome;
    } else if (typeof firstCategory === 'number') {
      categoryName = `Categoria ID: ${firstCategory}`; 
    }
  }

  // Formatação da data mais robusta
  let dataFormatada = 'Data Indisponível';
  if (noticia.data_postagem) {
    try {
      const dataObj = new Date(noticia.data_postagem);
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
      console.error('Erro ao formatar data em CardNoticia:', e);
    }
  }

  return (
    <a href={linkNoticia} className="card-noticia"> 
      <div className="card-noticia-imagem-container">
        <img 
            src={imageUrl} 
            alt={noticia.titulo || "Imagem da Notícia"} 
            className="card-noticia-imagem" 
        />
        <span className="card-noticia-categoria">
          {categoryName}
        </span>
      </div>
      <div className="card-noticia-conteudo">
        <h4 className="card-noticia-titulo">{noticia.titulo || 'Título Indisponível'}</h4>
        <p className="card-noticia-descricao">{noticia.conteudo || 'Conteúdo Indisponível'}</p>
        {noticia.data_postagem && (
          <p className="card-noticia-tempo">{dataFormatada}</p>
        )}
      </div>
    </a>
  );
}

export default CardNoticia;