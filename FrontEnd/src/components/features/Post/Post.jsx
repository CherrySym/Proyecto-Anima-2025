import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    // Mock comments para demo
    ...(post.id === 1 ? [
      {
        id: 1,
        user: { name: "Ana Torres", avatar: "/img/usuario.png" },
        content: "¡Felicidades! Yo también estoy en marketing, me encantaría conectar 🎉",
        timestamp: "1h"
      },
      {
        id: 2,
        user: { name: "Tech Academy", avatar: "/img/teyma.jpg", isCompany: true },
        content: "Excelente María! Te invitamos a nuestro próximo webinar gratuito 📚",
        timestamp: "45min"
      }
    ] : [])
  ]);

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: { name: "Tú", avatar: "/img/usuario.png" },
        content: newComment.trim(),
        timestamp: "Ahora"
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp;
  };

  return (
    <article className="post">
      <div className="post-header">
        <Link to={`/perfil/${post.user.id}`} className="user-info">
          <div className="user-avatar">
            <img src={post.user.avatar} alt={post.user.name} />
            {post.user.isCompany && <div className="company-badge">🏢</div>}
          </div>
          <div className="user-details">
            <h4 className="user-name">{post.user.name}</h4>
            <p className="user-subtitle">
              {post.user.isCompany ? post.user.sector : post.user.profession}
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

          <div className="comments-list">
            {comments.map(comment => (
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
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default Post;