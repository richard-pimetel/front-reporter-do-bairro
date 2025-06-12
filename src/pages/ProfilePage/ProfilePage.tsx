// src/pages/ProfilePage/ProfilePage.tsx
import './ProfilePage.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getUsuario from '../../API/user/getUsuario'; 
import getUserPosts from '../../API/user/getUserPosts'; // IMPORTANTE: Sua função para buscar publicações
import Header from '../../components/Header/Header';
import ListaNoticias from '../../components/ListaNoticias/ListaNoticias'; // IMPORTANTE: Seu componente para listar notícias
import { Usuario, NoticiaItem } from '../../types'; // Importe Usuario e NoticiaItem

function ProfilePage() {
    const { id } = useParams<{ id: string }>(); 
    const [user, setUser] = useState<Usuario | null>(null);
    const [userPosts, setUserPosts] = useState<NoticiaItem[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true); 

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("ID do usuário não fornecido na URL.");
                setLoading(false);
                setLoadingPosts(false); 
                return;
            }

            setLoading(true);
            setLoadingPosts(true); 
            setError(null);
            setUser(null); 
            setUserPosts([]); 

            try {
                const userIdNum = Number(id); 

                // 1. Busca dados do usuário (getUsuario)
                const userData = await getUsuario(userIdNum); 
                if (userData) {
                    setUser(userData);
                } else {
                    setError("Usuário não encontrado.");
                }

                // 2. Busca publicações do usuário (getUserPosts) - Chamada aqui!
                if (userData) { // Só busca posts se o usuário foi encontrado com sucesso
                    const postsData = await getUserPosts(userIdNum); 
                    if (postsData) {
                        setUserPosts(postsData);
                    } else {
                        console.warn("Nenhuma publicação encontrada para este usuário (getUserPosts retornou nulo).");
                    }
                }

            } catch (err) {
                console.error("Falha ao buscar perfil ou publicações do usuário:", err);
                setError("Ocorreu um erro ao carregar o perfil e/ou publicações.");
            } finally {
                setLoading(false);
                setLoadingPosts(false);
            }
        };

        fetchData();
    }, [id]); 

    if (loading || loadingPosts) {
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
                        <img 
                            src={user.foto_perfil || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} 
                            alt="Foto de Perfil" 
                            className="profile-avatar" 
                        />
                        <h1 className="profile-name">{user.nome}</h1>
                    </div>
                    <div className="profile-details">
                        {user.biografia && <p><strong>Biografia:</strong> {user.biografia}</p>}
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