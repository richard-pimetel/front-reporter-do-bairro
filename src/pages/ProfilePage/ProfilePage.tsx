// src/pages/ProfilePage/ProfilePage.tsx
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getUsuario from '../../API/user/getUsuario'; // Sua função para buscar o usuário
import { updateUsuario } from '../../API/user/putUsuario'; // NOVA: Sua função para atualizar o usuário
import Header from '../../components/Header/Header';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import { Usuario, NoticiaItem } from '../../types'; // Importe os tipos corretos, incluindo UsuarioUpdatePayload

function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<Usuario | null>(null);
    const [userPosts, setUserPosts] = useState<NoticiaItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false); // NOVO: Estado para o modo de edição
    const [editNome, setEditNome] = useState<string>(''); // NOVO: Estado para o nome no formulário
    const [editBiografia, setEditBiografia] = useState<string>(''); // NOVO: Estado para a biografia no formulário
    const [editFotoPerfil, setEditFotoPerfil] = useState<string>(''); // NOVO: Estado para a foto no formulário
    const [updateMessage, setUpdateMessage] = useState<string | null>(null); // NOVO: Mensagens de atualização

    // Efeito para carregar os dados do usuário
    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("ID do usuário não fornecido na URL.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setUser(null);
            setUserPosts([]);
            setUpdateMessage(null); // Limpa mensagens ao recarregar perfil

            try {
                const userIdNum = Number(id);
                const response = await getUsuario(userIdNum);

                if (response) {
                    const userData = Array.isArray(response.user) ? response.user[0] : response;
                    setUser(userData);
                    console.log("DEBUG: Dados do usuário recebidos (ProfilePage):", userData);

                    // Inicializa os campos do formulário de edição com os dados do usuário
                    setEditNome(userData.nome || '');
                    setEditBiografia(userData.biografia || '');
                    setEditFotoPerfil(userData.foto_perfil || '');

                    if (userData.noticias && Array.isArray(userData.noticias)) {
                        setUserPosts(userData.noticias);
                        console.log("DEBUG: Notícias carregadas no estado userPosts:", userData.noticias);
                    } else {
                        console.warn("DEBUG: 'noticias' não encontrado ou não é um array no objeto do usuário. Definindo userPosts como vazio.");
                        setUserPosts([]);
                    }
                } else {
                    setError("Usuário não encontrado.");
                    console.warn(`DEBUG: getUsuario(ID: ${userIdNum}) retornou null/undefined.`);
                }

            } catch (err) {
                console.error("DEBUG: Falha ao carregar perfil ou publicações do usuário:", err);
                setError("Ocorreu um erro ao carregar o perfil e/ou publicações.");
                setUserPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Função para alternar o modo de edição
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Se estiver entrando no modo de edição, inicializa os campos com os valores atuais do usuário
        if (!isEditing && user) {
            setEditNome(user.nome);
            setEditBiografia(user.biografia || '');
            setEditFotoPerfil(user.foto_perfil || '');
        }
        setUpdateMessage(null); // Limpa mensagens de atualização ao alternar
    };

    // Função para lidar com a submissão do formulário de edição
    const handleUpdateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setUpdateMessage(null);

        if (!user?.id) {
            setUpdateMessage('Erro: ID do usuário não encontrado para atualização.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                id: user.id,
                nome: editNome,
                biografia: editBiografia === '' ? null : editBiografia, // Envia null se vazio
                foto_perfil: editFotoPerfil,
            };

            const result = await updateUsuario(payload);

            if (result.status && result.user) {
                setUser(result.user); // Atualiza o estado 'user' com os dados retornados pelo backend
                setUpdateMessage(result.message || 'Perfil atualizado com sucesso!');
                setIsEditing(false); // Sai do modo de edição
            } else {
                setUpdateMessage(result.message || 'Falha ao atualizar o perfil.');
            }
        } catch (err) {
            console.error('Erro ao submeter atualização:', err);
            setUpdateMessage('Ocorreu um erro inesperado ao atualizar o perfil.');
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <p>Carregando perfil e publicações...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <p className="error-message">{error}</p>
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <p>Nenhum usuário encontrado com este ID.</p>
                </div>
            </>
        );
    }

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-content">
                <div className="profile-card">
                    <div className="profile-header">
                        {/* Foto de Perfil */}
                        {isEditing ? (
                            // Modo de edição: input para URL da foto
                            <div className="profile-edit-field">
                                <label htmlFor="editFotoPerfil">URL da Foto:</label>
                                <input
                                    type="text"
                                    id="editFotoPerfil"
                                    value={editFotoPerfil}
                                    onChange={(e) => setEditFotoPerfil(e.target.value)}
                                    disabled={loading}
                                    className="profile-input"
                                />
                                {editFotoPerfil && <img src={editFotoPerfil} alt="Pré-visualização" className="profile-avatar-preview" />}
                            </div>
                        ) : (
                            // Modo de visualização: exibe a foto atual
                            <img
                                src={user.foto_perfil || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"}
                                alt="Foto de Perfil"
                                className="profile-avatar"
                            />
                        )}

                        {/* Nome do Usuário */}
                        {isEditing ? (
                            // Modo de edição: input para o nome
                            <div className="profile-edit-field">
                                <label htmlFor="editNome">Nome:</label>
                                <input
                                    type="text"
                                    id="editNome"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                    disabled={loading}
                                    className="profile-input"
                                />
                            </div>
                        ) : (
                            // Modo de visualização: exibe o nome
                            <h1 className="profile-name">{user.nome}</h1>
                        )}
                    </div>

                    <div className="profile-details">
                        {/* Biografia */}
                        {isEditing ? (
                            // Modo de edição: textarea para a biografia
                            <div className="profile-edit-field">
                                <label htmlFor="editBiografia">Biografia:</label>
                                <textarea
                                    id="editBiografia"
                                    value={editBiografia}
                                    onChange={(e) => setEditBiografia(e.target.value)}
                                    disabled={loading}
                                    className="profile-textarea"
                                />
                            </div>
                        ) : (
                            // Modo de visualização: exibe a biografia
                            user.biografia && <p><strong>Biografia:</strong> {user.biografia}</p>
                        )}
                    </div>

                    {/* Mensagens de sucesso/erro da atualização */}
                    {updateMessage && (
                        <p className={`update-message ${updateMessage.includes('sucesso') ? 'success' : 'error'}`}>
                            {updateMessage}
                        </p>
                    )}

                    {/* Botões de ação */}
                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleUpdateSubmit}
                                    disabled={loading}
                                    className="profile-button primary"
                                >
                                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                                <button
                                    onClick={handleEditToggle} // Cancela a edição
                                    disabled={loading}
                                    className="profile-button secondary"
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEditToggle} // Entra no modo de edição
                                className="profile-button primary"
                            >
                                Editar Perfil
                            </button>
                        )}
                    </div>
                </div>

                <div className="user-posts-section">
                    <h2 className="titulo-secao">Minhas Publicações</h2>
                    {userPosts.length > 0 ? (
                        <ListaNoticias noticias={userPosts} />
                    ) : (
                        <p>Nenhuma publicação encontrada para este usuário.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;