// src/pages/NoticiaPage/NoticiaPage.tsx
import './NoticiaPage.css'
import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { NoticiaItem, ComentarioItem, Categoria } from '../../types'; // Importar Categoria
import { getNoticia } from '../../API/noticia/getNoticia';
import { postComentario } from '../../API/noticia/postComentario'
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // <--- CORREÇÃO AQUI: Importe o locale diretamente

function NoticiaPage() {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<NoticiaItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [novoComentario, setNovoComentario] = useState<string>('');
  const [showComentarioInput, setShowComentarioInput] = useState<boolean>(false);
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);

  const { user } = useAuth(); // Assume que useAuth fornece 'user' com 'id'

  useEffect(() => {
    const fetchNoticia = async () => {
      if (!id) {
        setError("ID da notícia não fornecido na URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const noticiaId = parseInt(id, 10);
      if (isNaN(noticiaId)) { // Adiciona verificação para ID inválido
        setError("ID da notícia inválido.");
        setLoading(false);
        return;
      }
      const response = await getNoticia(noticiaId);
      if (response && response.noticias && response.noticias.length > 0) {
        setNoticia(response.noticias[0]);
      } else {
        setError("Notícia não encontrada ou erro ao carregar.");
      }
      setLoading(false);
    };

    fetchNoticia();
  }, [id]);

  const handlePostComentario = async (e: FormEvent) => {
    e.preventDefault();
    if (!novoComentario.trim()) {
      alert("O comentário não pode ser vazio.");
      return;
    }
    if (!id) {
      alert("Erro: ID da notícia ausente.");
      return;
    }

    const userId = user?.id; // Acesso seguro ao ID do usuário
    if (!userId) {
      alert("Você precisa estar logado para comentar.");
      // Redirecionar para login, se aplicável, ex: navigate('/login');
      return;
    }

    setSubmittingComment(true);

    const comentarioPayload: ComentarioItem = {
      conteudo: novoComentario.trim(),
      tbl_usuario_id: userId,
      tbl_noticia_id: parseInt(id, 10),
      data_postagem: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"), // Formata data como no mobile
    };

    const response = await postComentario(comentarioPayload);

    if (response) {
      alert("Comentário enviado com sucesso!");
      setNovoComentario('');
      setShowComentarioInput(false); // Esconde o input após enviar
      // Recarregar a notícia para ver o novo comentário
      const noticiaId = parseInt(id, 10);
      const updatedResponse = await getNoticia(noticiaId);
      if (updatedResponse && updatedResponse.noticias && updatedResponse.noticias.length > 0) {
        // Atualiza a notícia no estado com a nova lista de comentários
        setNoticia(updatedResponse.noticias[0]);
      }
    } else {
      alert("Falha ao enviar comentário.");
    }
    setSubmittingComment(false);
  };

  const formatarData = (dataString: string) => {
    try {
      const date = new Date(dataString);
      // Verifica se a data é válida (não é um "Invalid Date")
      if (isNaN(date.getTime())) {
        // Se falhar a primeira tentativa, tenta um parsing mais manual
        // Isso é uma tentativa de lidar com formatos que New Date() possa ter dificuldade
        const [datePart, timePart] = dataString.split('T');
        if (datePart && timePart) {
          const [year, month, day] = datePart.split('-').map(Number);
          const [hourStr, minuteStr, secondAndMsStr] = timePart.split(':');

          let hour = parseInt(hourStr);
          let minute = parseInt(minuteStr);
          let second = 0;
          let ms = 0;

          if (secondAndMsStr) {
            const [secStr, msStr] = secondAndMsStr.split('.');
            second = parseInt(secStr);
            if (msStr) {
              ms = parseInt(msStr.substring(0, 3)); // Pega os primeiros 3 dígitos para milissegundos
            }
          }
          // Usar Date.UTC para evitar problemas de fuso horário local ao criar a data para formatação
          // Se sua API retorna UTC, é melhor tratar como UTC
          const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second, ms));
          return format(utcDate, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
        }
        return "Data inválida"; // Se a string não puder ser partida
      }
      // Se New Date() funcionou, formata a data existente
      return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      console.error("Erro ao formatar data:", dataString, e);
      return "Data indisponível";
    }
  };

  if (loading) {
    return (
      <div className="detalhe-noticia-container">
        <Header showSearchBar={false} />
        <div className="detalhe-noticia-loading">
          <p>Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalhe-noticia-container">
        <Header showSearchBar={false} />
        <div className="detalhe-noticia-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Tentar Novamente</button>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="detalhe-noticia-container">
        <Header showSearchBar={false} />
        <div className="detalhe-noticia-not-found">
          <p>Notícia não encontrada.</p>
        </div>
      </div>
    );
  }

  const imageUrl = noticia.urls_midia && noticia.urls_midia.length > 0
    ? noticia.urls_midia[0].url_midia
    : '';

  const sortedComments = noticia.comentarios
    ? [...noticia.comentarios].sort((a, b) => new Date(b.data_postagem).getTime() - new Date(a.data_postagem).getTime())
    : [];

  return (
    <div className="detalhe-noticia-container">
      <Header showSearchBar={false} /> {/* Não mostra a barra de busca aqui */}
      <main className="detalhe-noticia-content-wrapper">
        <div className="detalhe-noticia-card">
          {imageUrl && (
            <div className="detalhe-noticia-image-wrapper">
              <img src={imageUrl} alt={noticia.titulo} className="detalhe-noticia-image" />
            </div>
          )}

          <div className="detalhe-noticia-info">
            <h1 className="detalhe-noticia-titulo">{noticia.titulo}</h1>
            <p className="detalhe-noticia-meta">
              Por {noticia.User?.nome || "Desconhecido"} em {formatarData(noticia.data_postagem)}
            </p>
            {noticia.categorias && noticia.categorias.length > 0 && (
              <p className="detalhe-noticia-meta">
                Categorias: {noticia.categorias.map(cat =>
                  // Verifica se 'cat' é do tipo Categoria (objeto com 'nome') ou number
                  (typeof cat === 'object' && 'nome' in cat) ? (cat as Categoria).nome : ''
                )
                  .filter(Boolean) // Remove strings vazias
                  .join(', ')}
              </p>
            )}
            {noticia.endereco?.display_name && (
              <p className="detalhe-noticia-meta">Local: {noticia.endereco.display_name}</p>
            )}
            <div className="detalhe-noticia-conteudo" dangerouslySetInnerHTML={{ __html: noticia.conteudo }}>
            </div>
          </div>

          <div className="detalhe-noticia-comments-section">
            <div className="comments-header">
              <h2>Comentários</h2>
              <button className="add-comment-button" onClick={() => setShowComentarioInput(!showComentarioInput)}>
                <ion-icon name="chatbubble-outline"></ion-icon>
              </button>
            </div>

            {showComentarioInput && (
              <form onSubmit={handlePostComentario} className="comment-input-form">
                <textarea
                  placeholder="Adicione um comentário..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  rows={4}
                  disabled={submittingComment}
                ></textarea>
                <button type="submit" disabled={submittingComment}>
                  {submittingComment ? 'Enviando...' : 'Enviar Comentário'}
                  <ion-icon name="send"></ion-icon>
                </button>
              </form>
            )}

            {sortedComments.length === 0 ? (
              <p className="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            ) : (
              <div className="comments-list">
                {sortedComments.map((comentario) => (
                  <div key={comentario.id} className="comment-card">
                    {/* Não mostra nome ou foto do usuário, conforme solicitado */}
                    <p className="comment-content">{comentario.conteudo}</p>
                    <p className="comment-date">
                      {formatarData(comentario.data_postagem)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default NoticiaPage;