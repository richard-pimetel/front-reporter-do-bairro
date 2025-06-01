import CardNoticia from '../CardNoticia/CardNoticia'; // Ajuste o caminho se necessário
import './ListaNoticias.css';
import { NoticiaItem } from '../../types'; // Importe NoticiaItem

interface ListaNoticiasProps {
  noticias: NoticiaItem[];
}

function ListaNoticias({ noticias }: ListaNoticiasProps) { // Removido : React.FC
  return (
    <div className="lista-noticias-container">
      {noticias.map((item) => (
        <CardNoticia
          key={item.id}
          noticia={item} // Passa o objeto completo NoticiaItem
        />
      ))}
    </div>
  );
}

export default ListaNoticias;