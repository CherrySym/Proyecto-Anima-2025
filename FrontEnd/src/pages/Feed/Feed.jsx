import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CreatePost from '../../components/features/CreatePost/CreatePost';
import Post from '../../components/features/Post/Post';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import * as postService from '../../services/postService';
import './Feed.css';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data para posts
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
        sector: "Tecnología"
      },
      content: "🌟 ¡Nueva oportunidad para jóvenes desarrolladores! Estamos buscando talentos entre 18-25 años para nuestro programa de trainee. ¡Aplica ahora!",
      image: null,
      timestamp: "4 horas",
      likes: 156,
      comments: 32,
      isLiked: true
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Carlos Ruiz",
        avatar: "/img/usuario.png",
        isCompany: false,
        profession: "Desarrollador Junior"
      },
      content: "Compartiendo mi proyecto final del bootcamp de React. Fue todo un desafío pero aprendí muchísimo. ¡Gracias a todos los que me ayudaron! 💻✨",
      image: "/img/ejCV.png",
      timestamp: "6 horas",
      likes: 89,
      comments: 15,
      isLiked: false
    },
    {
      id: 4,
      user: {
        id: 4,
        name: "MercadoLibre",
        avatar: "/img/MercLP.jpg",
        isCompany: true,
        sector: "E-commerce"
      },
      content: "🎯 Tips para tu primera entrevista laboral:\n\n✅ Investiga sobre la empresa\n✅ Prepara preguntas inteligentes\n✅ Practica tu presentación personal\n✅ Llega 10 minutos antes\n\n¿Qué otros consejos agregarían?",
      image: "/img/entrevistaT.png",
      timestamp: "1 día",
      likes: 312,
      comments: 67,
      isLiked: true
    },
    {
      id: 5,
      user: {
        id: 5,
        name: "Sofía Mendez",
        avatar: "/img/usuario.png",
        isCompany: false,
        profession: "Diseñadora UX/UI"
      },
      content: "Feliz de compartir que conseguí mi primera pasantía en diseño UX! 🎨 Ha sido un camino largo de aprendizaje, pero cada curso y proyecto valió la pena. ¡A seguir creciendo!",
      image: null,
      timestamp: "2 días",
      likes: 198,
      comments: 41,
      isLiked: false
    }
  ];

  useEffect(() => {
    // Simular carga de posts
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNewPost = (newPost) => {
    const post = {
      id: posts.length + 1,
      user: {
        id: user.id,
        name: user.name || "Usuario",
        avatar: user.avatar || "/img/usuario.png",
        isCompany: user.tipo_usuario === 'empresa',
        profession: user.profession || "Estudiante"
      },
      content: newPost.content,
      image: newPost.image,
      timestamp: "Ahora",
      likes: 0,
      comments: 0,
      isLiked: false
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="feed-page">
        <div className="feed-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando tu feed...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-page">
      <div className="feed-container">
        <div className="feed-main">
          <div className="feed-content">
            {user && (
              <CreatePost onPost={handleNewPost} />
            )}
            
            <div className="posts-container">
              {posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike}
                />
              ))}
            </div>
          </div>
        </div>
        
        <Sidebar />
      </div>
    </div>
  );
};

export default Feed;