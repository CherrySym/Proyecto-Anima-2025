import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import CreatePost from '../../components/CreatePost/CreatePost';
import Post from '../../components/Post/Post';
import Sidebar from '../../../../components/layout/Sidebar/Sidebar';
import { AlertTriangle } from 'lucide-react';
import * as postService from '../../services/postService';
import styles from './Feed.module.css';
// import './Feed.css'; // comentado: archivo original inactivado como backup

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Cargar posts desde la API
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    await withMinLoadingTime(async () => {
      try {
        setError(null);
        const data = await postService.getAllPosts();
        
        // Transformar datos del backend al formato del frontend
        const postsTransformados = data.map(post => ({
          id: post.id,
          user: {
            id: post.author?.id,
            name: post.authorName || post.author?.nombre,
            avatar: post.authorAvatar || post.author?.avatar || post.author?.logo || "/img/usuario.png",
            isCompany: post.autorTipo === 'Empresa',
            profession: post.author?.tipo || post.author?.sector || "Usuario"
          },
          content: post.contenido || post.content,
          image: post.imagenUrl || post.image,
          timestamp: formatTimestamp(post.createdAt),
          likes: post.likesCount || 0,
          comments: post.commentsCount || 0,
          isLiked: post.isLiked || false
        }));
        
        setPosts(postsTransformados);
      } catch (err) {
        setError('No se pudieron cargar las publicaciones. Mostrando contenido de ejemplo.');
        // Fallback a mock data si falla la API
        loadMockPosts();
      }
    });
  };

  const loadMockPosts = () => {
    // Mock data para posts (fallback)
    const mockPosts = [
      {
        id: 1,
        user: {
          id: 1,
          name: "María González",
          avatar: "/img/usuario.png",
          isCompany: false,
          profession: "Estudiante de Marketing"
        },
        content: "¡Acabo de completar mi primer curso de Marketing Digital! 🚀 Muy emocionada de aplicar todo lo aprendido. ¿Alguien más está estudiando marketing?",
        image: "/img/img1.png",
        timestamp: "2 horas",
        likes: 24,
        comments: 8,
        isLiked: false
      },
      {
        id: 2,
        user: {
          id: 2,
          name: "Globant",
          avatar: "/img/globant.jpg",
          isCompany: true,
          profession: "Tecnología"
        },
        content: "� ¡Nueva oportunidad para jóvenes desarrolladores! Estamos buscando talentos entre 18-25 años para nuestro programa de trainee. ¡Aplica ahora!",
        image: null,
        timestamp: "4 horas",
        likes: 156,
        comments: 32,
        isLiked: true
      }
    ];
    setPosts(mockPosts);
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return 'Ahora';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const handleNewPost = async (newPostData) => {
    try {
      // Crear post en el backend
      const createdPost = await postService.createPost({
        contenido: newPostData.content,
        imagenUrl: newPostData.image
      });

      // Agregar el nuevo post al estado
      const newPost = {
        id: createdPost.id,
        user: {
          id: user.id,
          name: user.nombre || "Usuario",
          avatar: user.avatar || user.logo || "/img/usuario.png",
          isCompany: user.tipoUsuario === 'EMPRESA',
          profession: user.tipo || user.sector || "Estudiante"
        },
        content: createdPost.contenido,
        image: createdPost.imagenUrl,
        timestamp: "Ahora",
        likes: 0,
        comments: 0,
        isLiked: false
      };
      setPosts([newPost, ...posts]);
    } catch (err) {
      alert('No se pudo crear la publicación. Inténtalo de nuevo.');
    }
  };

  const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      // Usar toggleLike que maneja dar/quitar like automáticamente
      const result = await postService.toggleLike(postId);
      
      // Actualizar el estado local con la respuesta del servidor
      setPosts(posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              isLiked: result.liked,
              likes: result.totalLikes || (result.liked ? p.likes + 1 : p.likes - 1)
            }
          : p
      ));
    } catch (err) {
      alert('No se pudo procesar el like. Inténtalo de nuevo.');
    }
  };

  if (loading) {
    return (
      <div className={styles['feed-page']}>
        <div className={styles['feed-container']}>
          <div className={styles['loading-container']}>
            <div className="loading-spinner"></div>
            <p>Cargando tu feed...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['feed-page']}>
      <div className={styles['feed-container']}>
        <div className={styles['feed-main']}>
          <div className={styles['feed-content']}>
            {error && (
              <div className={styles['error-banner']}>
                <AlertTriangle size={16} /> {error}
              </div>
            )}
            
            {user && (
              <CreatePost onPost={handleNewPost} />
            )}
            
            <div className={styles['posts-container']}>
              {posts.length === 0 ? (
                <div className={styles['no-posts']}>
                  <h3>No hay publicaciones aún</h3>
                  <p>¡Sé el primero en compartir algo!</p>
                </div>
              ) : (
                posts.map(post => (
                  <Post 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        
        <Sidebar />
      </div>
    </div>
  );
};

export default Feed;