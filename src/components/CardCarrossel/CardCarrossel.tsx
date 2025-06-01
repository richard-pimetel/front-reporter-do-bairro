import { useState, useEffect } from 'react'
import './CardCarrossel.css'
import { NoticiaItem } from '../../types'

// CardCarrosselProps agora recebe diretamente um NoticiaItem
interface CardCarrosselProps {
  noticia: NoticiaItem
  ehCardPrincipal?: boolean
}

function CardCarrossel({ noticia, ehCardPrincipal }: CardCarrosselProps) {
  // Garante que urls_midia é um array, mesmo que opcional
  const urlsMidia = noticia.urls_midia || [];
  const [indiceImagemAtual, setIndiceImagemAtual] = useState(0);

  useEffect(() => {
    if (urlsMidia.length > 1) {
      const intervalo = setInterval(() => {
        setIndiceImagemAtual((prevIndice) => (prevIndice + 1) % urlsMidia.length);
      }, 2000);
      return () => clearInterval(intervalo);
    }
  }, [urlsMidia]);

  const estiloBackground = urlsMidia.length > 0
    ? { backgroundImage: `url(${urlsMidia[indiceImagemAtual]})` }
    : {};

  const classesCard = `card-carrossel ${ehCardPrincipal ? 'card-carrossel-principal' : ''}`;

  return (
    <a href={noticia.link} className={classesCard} style={estiloBackground}>
      <div className="card-carrossel-overlay"></div>
      <div className="card-carrossel-conteudo">
        {/* Use a primeira categoria se existir, senão um fallback */}
        <span className="card-carrossel-categoria">{noticia.categorias[0]?.nome || 'Sem Categoria'}</span>
        <h3 className="card-carrossel-titulo">{noticia.titulo}</h3>
        {/* Formate a data_postagem para exibir como string */}
        {noticia.data_postagem && (
          <p className="card-carrossel-tempo">
            {noticia.data_postagem.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </a>
  );
}

export default CardCarrossel;