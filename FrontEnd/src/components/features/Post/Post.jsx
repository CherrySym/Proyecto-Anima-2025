import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as postService from '../../../services/postService';
import './Post.css';

const Post = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Cargar comentarios cuando se expande la sección
  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const data = await postService.getPostComments(post.id);
      
      // Transformar comentarios del backend al formato del frontend
      const commentsTransformed = data.map(comment => ({
        id: comment.id,
        user: {
          name: comment.autor?.nombre || 'Usuario',
          avatar: comment.autor?.avatar || '/img/usuario.png',
          isCompany: comment.autorTipo === 'Empresa'
        },
        content: comment.contenido,
        timestamp: formatTimestamp(comment.createdAt),
        parentId: comment.parentId
      }));
      
      setComments(commentsTransformed);
    } catch (err) {
      // Si falla, mostrar comentarios mock solo para demo
      if (post.id === 1) {
        setComments([
          {
            id: 1,
            user: { name: "Ana Torres", avatar: "/img/usuario.png" },
            content: "¡Felicidades! Yo también estoy en marketing, me encantaría conectar 🎉",
            timestamp: "1h"
          }
        ]);
      }
    } finally {
      setLoadingComments(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Enviar comentario al backend
      const commentData = {
        postId: post.id,
        contenido: newComment.trim()
      };
      
      const savedComment = await postService.addComment(commentData);
      
      // Agregar el comentario nuevo a la lista local
      const newCommentObj = {
        id: savedComment.id,
        user: {
          name: savedComment.autor?.nombre || 'Tú',
          avatar: savedComment.autor?.avatar || '/img/usuario.png',
          isCompany: savedComment.autorTipo === 'Empresa'
        },
        content: savedComment.contenido,
        timestamp: 'Ahora'
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
    } catch (err) {
      alert('No se pudo agregar el comentario. Inténtalo de nuevo.');
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    // Si ya es un string simple como "2h" o "hace 3 días", devolverlo
    if (typeof timestamp === 'string' && !timestamp.includes('T')) {
      return timestamp;
    }
    
    // Si es una fecha ISO, formatearla
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Ahora';
      if (diffMins < 60) return `${diffMins}min`;
      if (diffHours < 24) return `${diffHours}h`;
      if (diffDays < 7) return `${diffDays}d`;
      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        <Link to={post.user.isCompany ? `/empresa/${post.user.id}` : `/perfil/${post.user.id}`} className="user-info">
          <div className="user-avatar">
            <img src={post.user.avatar} alt={post.user.name} />
            {post.user.isCompany && <div className="company-badge">🏢</div>}
          </div>
          <div className="user-details">
            <h4 className="user-name">{post.user.name}</h4>
            <p className="user-subtitle">
              {post.user.profession}
            </p>
            <span className="post-time">{formatTimestamp(post.timestamp)}</span>
          </div>
        </Link>
        
        <button className="post-menu">
          <span>⋯</span>
        </button>
      </div>

      <div className="post-content">
        <p className="post-text">{post.content}</p>
        
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>

      <div className="post-stats">
        <span className="likes-count">
          {post.likes > 0 && (
            <>
              <span className="like-icon">❤️</span>
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </>
          )}
        </span>
        <span className="comments-count">
          {post.comments > 0 && `${post.comments} comentarios`}
        </span>
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
          onClick={() => onLike(post.id)}
        >
          <span className="action-icon">
            {post.isLiked ? '❤️' : '🤍'}
          </span>
          <span>Me gusta</span>
        </button>
        
        <button 
          className="action-btn comment-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <span className="action-icon">💬</span>
          <span>Comentar</span>
        </button>
        
        <button className="action-btn share-btn">
          <span className="action-icon">🔄</span>
          <span>Compartir</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form className="comment-form" onSubmit={handleComment}>
            <div className="comment-input-container">
              <img 
                src="/img/usuario.png" 
                alt="Tu avatar" 
                className="comment-avatar"
              />
              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button 
                type="submit" 
                className="comment-submit"
                disabled={!newComment.trim()}
              >
                Enviar
              </button>
            </div>
          </form>

          {loadingComments ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              Cargando comentarios...
            </div>
          ) : (
            <div className="comments-list">
              {comments.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </div>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name}
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-bubble">
                        <strong className="comment-author">
                          {comment.user.name}
                          {comment.user.isCompany && <span className="company-tag">🏢</span>}
                        </strong>
                        <p className="comment-text">{comment.content}</p>
                      </div>
                      <div className="comment-actions">
                        <span className="comment-time">{comment.timestamp}</span>
                        <button className="comment-like">Me gusta</button>
                        <button className="comment-reply">Responder</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Post;