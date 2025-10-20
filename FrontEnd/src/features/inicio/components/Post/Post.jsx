import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as postService from '../../services/postService';
import styles from './Post.module.css';
// import './Post.css'; // backup preserved as Post.css (commented)

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
      const commentsTransformed = data.map(comment => {
        // Backend puede enviar author o usuario
        const autor = comment.author || comment.usuario;
        
        return {
          id: comment.id,
          user: {
            name: autor?.nombre || 'Usuario',
            avatar: autor?.avatar || '/img/usuario.png',
            isCompany: comment.autorTipo === 'Empresa'
          },
          content: comment.contenido,
          timestamp: formatTimestamp(comment.createdAt),
          parentId: comment.parentId
        };
      });
      
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
      // El backend responde con { id, contenido, usuario, author }
      const autor = savedComment.author || savedComment.usuario;
      // Agregar el comentario nuevo a la lista local
      const newCommentObj = {
        id: savedComment.id,
        user: {
          name: autor?.nombre || 'Tú',
          avatar: autor?.avatar || '/img/usuario.png',
          isCompany: false
        },
        content: savedComment.content || savedComment.contenido,
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
    <article className={styles['post']}>
      <div className={styles['post-header']}>
        <Link to={post.user.isCompany ? `/empresa/${post.user.id}` : `/perfil/${post.user.id}`} className={styles['user-info']}>
          <div className={styles['user-avatar']}>
            <img src={post.user.avatar} alt={post.user.name} />
            {post.user.isCompany && <div className={styles['company-badge']}>🏢</div>}
          </div>
          <div className={styles['user-details']}>
            <h4 className={styles['user-name']}>{post.user.name}</h4>
            <p className={styles['user-subtitle']}>
              {post.user.profession}
            </p>
            <span className={styles['post-time']}>{formatTimestamp(post.timestamp)}</span>
          </div>
        </Link>
        
        <button className={styles['post-menu']}>
          <span>⋯</span>
        </button>
      </div>

      <div className={styles['post-content']}>
        <p className={styles['post-text']}>{post.content}</p>
        
        {post.image && (
          <div className={styles['post-image']}>
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>

      <div className={styles['post-stats']}>
        <span className={styles['likes-count']}>
          {post.likes > 0 && (
            <>
              <span className={styles['like-icon']}>❤️</span>
              {post.likes} {post.likes === 1 ? 'like' : 'likes'}
            </>
          )}
        </span>
        <span className={styles['comments-count']}>
          {post.comments > 0 && `${post.comments} comentarios`}
        </span>
      </div>

      <div className={styles['post-actions']}>
        <button 
          className={`${styles['action-btn']} ${styles['like-btn']} ${post.isLiked ? styles['liked'] : ''}`}
          onClick={() => onLike(post.id)}
        >
          <span className={styles['action-icon']}>
            {post.isLiked ? '❤️' : '🤍'}
          </span>
          <span>Me gusta</span>
        </button>
        
        <button 
          className={`${styles['action-btn']} ${styles['comment-btn']}`}
          onClick={() => setShowComments(!showComments)}
        >
          <span className={styles['action-icon']}>💬</span>
          <span>Comentar</span>
        </button>
        
        <button className={`${styles['action-btn']} ${styles['share-btn']}`}>
          <span className={styles['action-icon']}>🔄</span>
          <span>Compartir</span>
        </button>
      </div>

      {showComments && (
        <div className={styles['comments-section']}>
          <form className={styles['comment-form']} onSubmit={handleComment}>
            <div className={styles['comment-input-container']}>
              <img 
                src="/img/usuario.png" 
                alt="Tu avatar" 
                className={styles['comment-avatar']}
              />
              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={styles['comment-input']}
              />
              <button 
                type="submit" 
                className={styles['comment-submit']}
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
            <div className={styles['comments-list']}>
              {comments.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </div>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className={styles['comment']}>
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name}
                      className={styles['comment-avatar']}
                    />
                    <div className={styles['comment-content']}>
                      <div className={styles['comment-bubble']}>
                        <strong className={styles['comment-author']}>
                          {comment.user.name}
                          {comment.user.isCompany && <span className={styles['company-tag']}>🏢</span>}
                        </strong>
                        <p className={styles['comment-text']}>{comment.content}</p>
                      </div>
                      <div className={styles['comment-actions']}>
                        <span className={styles['comment-time']}>{comment.timestamp}</span>
                        <button className={styles['comment-like']}>Me gusta</button>
                        <button className={styles['comment-reply']}>Responder</button>
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