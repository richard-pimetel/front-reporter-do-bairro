// src/components/CardCarrossel.tsx
import React, { useState, useEffect } from 'react';
import './CardCarrossel.css'; // Vamos criar este arquivo CSS

interface CardCarrosselProps {
  titulo: string;
  categoria: string;
  imagens: string[]; // Lista de URLs de imagens para o carrossel
  link: string;
  tempo?: string; // Tempo/data opcional
  ehCardPrincipal?: boolean; // Para diferenciar o estilo do card principal
}

const CardCarrossel: React.FC<CardCarrosselProps> = ({ titulo, categoria, imagens, link, tempo, ehCardPrincipal }) => {
  const [indiceImagemAtual, setIndiceImagemAtual] = useState(0);

  useEffect(() => {
    if (imagens.length > 1) {
      const intervalo = setInterval(() => {
        setIndiceImagemAtual((prevIndice) => (prevIndice + 1) % imagens.length);
      }, 2000); // Troca de imagem a cada 2 segundos
      return () => clearInterval(intervalo);
    }
  }, [imagens]);

  const estiloBackground = imagens.length > 0
    ? { backgroundImage: `url(${imagens[indiceImagemAtual]})` }
    : {};

  const classesCard = `card-carrossel ${ehCardPrincipal ? 'card-carrossel-principal' : ''}`;

  return (
    <a href={link} className={classesCard} style={estiloBackground}>
      <div className="card-carrossel-overlay"></div>
      <div className="card-carrossel-conteudo">
        <span className="card-carrossel-categoria">{categoria}</span>
        <h3 className="card-carrossel-titulo">{titulo}</h3>
        {tempo && <p className="card-carrossel-tempo">{tempo}</p>}
      </div>
    </a>
  );
};

export default CardCarrossel;
