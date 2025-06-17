// src/pages/ProfilePage/ProfilePage.tsx
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getUsuario from '../../API/user/getUsuario'; // Sua função para buscar o usuário
import { updateUsuario } from '../../API/user/putUsuario'; // Sua função para atualizar o usuário
import Header from '../../components/Header/Header';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias';
import { useAuth } from '../../contexts/AuthContext';
import { Usuario, NoticiaItem } from '../../types';

function ProfilePage() {
    // Usando o contexto de autenticação para pegar as informações do usuário logado
    const { user: loggedInUser, login, isLoggedIn } = useAuth(); // Adicionado 'login' para atualizar o contexto
    const { id } = useParams<{ id: string }>();

    // State para o usuário exibido na página (pode ser o próprio usuário logado ou outro)
    const [userProfile, setUserProfile] = useState<Usuario | null>(null);
    const [userPosts, setUserPosts] = useState<NoticiaItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editNome, setEditNome] = useState<string>('');
    const [editBiografia, setEditBiografia] = useState<string>('');
    const [editFotoPerfil, setEditFotoPerfil] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    // Determina se o perfil sendo visualizado é o do usuário logado
    const isCurrentUserProfile = loggedInUser && userProfile && loggedInUser.id === userProfile.id;

    // Efeito para carregar os dados do usuário
    useEffect(() => {
        const fetchData = async () => {
            const targetId = id ? Number(id) : loggedInUser?.id;

            if (!targetId) {
                setError("ID do usuário não fornecido na URL e nenhum usuário logado.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            setUserProfile(null);
            setUserPosts([]);
            setUpdateMessage(null);

            try {
                // Agora getUsuario retorna diretamente Usuario | null
                const userData = await getUsuario(targetId); // <-- MUDANÇA AQUI: Não precisa mais de Array.isArray

                if (userData) { // Se userData for um objeto Usuario
                    setUserProfile(userData); // <-- AGORA O TIPO ESTÁ CORRETO
                    console.log("DEBUG: Dados do usuário recebidos (ProfilePage):", userData);

                    setEditNome(userData.nome || '');
                    setEditBiografia(userData.biografia || '');
                    setEditFotoPerfil(userData.foto_perfil || '');
                    setPassword('');
                    setConfirmPassword('');

                    // Verifica se 'noticias' existe e é um array dentro do objeto Usuario
                    if (userData.noticias && Array.isArray(userData.noticias)) {
                        setUserPosts(userData.noticias);
                        console.log("DEBUG: Notícias carregadas no estado userPosts:", userData.noticias);
                    } else {
                        console.warn("DEBUG: 'noticias' não encontrado ou não é um array no objeto do usuário. Definindo userPosts como vazio.");
                        setUserPosts([]);
                    }
                } else {
                    setError("Usuário não encontrado.");
                    console.warn(`DEBUG: getUsuario(ID: ${targetId}) retornou null.`);
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
    }, [id, loggedInUser?.id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing && userProfile) {
            setEditNome(userProfile.nome);
            setEditBiografia(userProfile.biografia || '');
            setEditFotoPerfil(userProfile.foto_perfil || '');
            setPassword('');
            setConfirmPassword('');
        }
        setUpdateMessage(null);
    };

    const handleUpdateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setUpdateMessage(null);

        if (!loggedInUser?.id || !loggedInUser?.email || !loggedInUser?.data_nascimento) {
            setUpdateMessage('Erro: Dados essenciais do usuário logado (ID, Email ou Data de Nascimento) não encontrados para atualização.');
            setLoading(false);
            return;
        }

        if (!password) {
            setUpdateMessage('Por favor, digite sua senha atual para confirmar as alterações.');
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setUpdateMessage('As senhas não coincidem. Por favor, confirme sua senha corretamente.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                id: loggedInUser.id,
                nome: editNome,
                email: loggedInUser.email,
                senha: password,
                data_nascimento: loggedInUser.data_nascimento,
                biografia: editBiografia === '' ? null : editBiografia,
                foto_perfil: editFotoPerfil === '' ? null : editFotoPerfil,
                noticias: null,
            };

            console.log("DEBUG: Payload de atualização enviado:", payload);

            const result = await updateUsuario(payload);

            if (result.status && result.user) {
                // Atualiza o estado 'userProfile'
                setUserProfile(result.user);

                // ATUALIZA O CONTEXTO DE AUTENTICAÇÃO COM OS NOVOS DADOS
                // Certifique-se de que 'result.user' tem todos os campos necessários para 'Usuario'
                if (isLoggedIn && loggedInUser.id === result.user.id) {
                    const updatedContextUser: Usuario = {
                        id: result.user.id,
                        nome: result.user.nome,
                        email: result.user.email,
                        data_nascimento: result.user.data_nascimento,
                        biografia: result.user.biografia,
                        foto_perfil: result.user.foto_perfil,
                        noticias: null
                        // Notícias não são normalmente armazenadas no contexto de autenticação
                        // Se houver outros campos que você precisa no contexto, adicione-os aqui
                    };
                    login(updatedContextUser); // Usamos o 'login' do contexto para atualizar
                }

                setUpdateMessage(result.message || 'Perfil atualizado com sucesso!');
                setIsEditing(false);
            } else {
                setUpdateMessage(result.message || 'Falha ao atualizar o perfil.');
            }
        } catch (err) {
            console.error('Erro ao submeter atualização:', err);
            setUpdateMessage('Ocorreu um erro inesperado ao atualizar o perfil.');
        } finally {
            setLoading(false);
            setPassword('');
            setConfirmPassword('');
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

    if (!userProfile) {
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
                            <img
                                src={userProfile.foto_perfil || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"}
                                alt="Foto de Perfil"
                                className="profile-avatar"
                            />
                        )}

                        {/* Nome do Usuário */}
                        {isEditing ? (
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
                            <h1 className="profile-name">{userProfile.nome}</h1>
                        )}
                    </div>

                    <div className="profile-details">
                        {/* Biografia */}
                        {isEditing ? (
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
                            userProfile.biografia && <p><strong>Biografia:</strong> {userProfile.biografia}</p>
                        )}

                        {/* NOVO: Campos de senha (aparecem apenas em modo de edição e para o próprio usuário) */}
                        {isEditing && isCurrentUserProfile && (
                            <>
                                <div className="profile-edit-field">
                                    <label htmlFor="password">Senha:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        className="profile-input"
                                        placeholder="Digite sua senha atual"
                                    />
                                </div>
                                <div className="profile-edit-field">
                                    <label htmlFor="confirmPassword">Confirmar Senha:</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                        className="profile-input"
                                        placeholder="Confirme sua senha"
                                    />
                                </div>
                            </>
                        )}

                        {/* Email e Data de Nascimento (apenas visualização e apenas para o próprio usuário) */}
                        {isCurrentUserProfile && (
                            <>
                                <p><strong>Email:</strong> {userProfile.email}</p>
                                <p><strong>Data de Nascimento:</strong> {userProfile.data_nascimento ? new Date(userProfile.data_nascimento).toLocaleDateString('pt-BR') : 'Não informada'}</p>
                            </>
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
                        {isEditing && isCurrentUserProfile ? (
                            <>
                                <button
                                    onClick={handleUpdateSubmit}
                                    disabled={loading}
                                    className="profile-button primary"
                                >
                                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                                <button
                                    onClick={handleEditToggle}
                                    disabled={loading}
                                    className="profile-button secondary"
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            isCurrentUserProfile && (
                                <button
                                    onClick={handleEditToggle}
                                    className="profile-button primary"
                                >
                                    Editar Perfil
                                </button>
                            )
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