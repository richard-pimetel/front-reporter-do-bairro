// src/components/CardNoticia.tsx
import React from 'react';
import './CardNoticia.css'; // Vamos criar este arquivo CSS

interface CardNoticiaProps {
  titulo: string;
  categoria: string;
  imagem: string;
  link: string;
  descricao: string;
  tempo?: string; // Tempo/data opcional
}

const CardNoticia: React.FC<CardNoticiaProps> = ({ titulo, categoria, imagem, link, descricao, tempo }) => {
  return (
    <a href={link} className="card-noticia">
      <div className="card-noticia-imagem-container">
        <img src={imagem} alt={titulo} className="card-noticia-imagem" />
        <span className="card-noticia-categoria">{categoria}</span>
      </div>
      <div className="card-noticia-conteudo">
        <h4 className="card-noticia-titulo">{titulo}</h4>
        <p className="card-noticia-descricao">{descricao}</p>
        {tempo && <p className="card-noticia-tempo">{tempo}</p>}
      </div>
    </a>
  );
};

export default CardNoticia;

