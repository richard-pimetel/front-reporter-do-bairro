// src/components/ListaNoticias/ListaNoticias.tsx
import CardNoticia from '../CardNoticia/CardNoticia'; 
import './ListaNoticias.css'; // Importa o CSS
import { NoticiaItem } from '../../types'; 

interface ListaNoticiasProps {
  noticias: NoticiaItem[];
}

function ListaNoticias({ noticias }: ListaNoticiasProps) { 
  return (
    <div className="lista-noticias-container">
      {noticias.map((item) => (
        <CardNoticia
          key={item.id} // Use o ID como chave, é importante para o React
          noticia={item} 
        />
      ))}
    </div>
  );
}

export default ListaNoticias;