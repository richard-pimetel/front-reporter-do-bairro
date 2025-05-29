// src/components/ListaNoticias.tsx
import React from 'react';
import CardNoticia from '../CardNoticia/CardNoticia';
import './ListaNoticias.css'; // Vamos criar este arquivo CSS

interface NoticiaItem {
  id: string;
  titulo: string;
  categoria: string;
  imagem: string;
  link: string;
  descricao: string;
  tempo?: string;
}

interface ListaNoticiasProps {
  noticias: NoticiaItem[];
}

const ListaNoticias: React.FC<ListaNoticiasProps> = ({ noticias }) => {
  return (
    <div className="lista-noticias-container">
      {noticias.map((item) => (
        <CardNoticia
          key={item.id}
          titulo={item.titulo}
          categoria={item.categoria}
          imagem={item.imagem}
          link={item.link}
          descricao={item.descricao}
          tempo={item.tempo}
        />
      ))}
    </div>
  );
};

export default ListaNoticias;

