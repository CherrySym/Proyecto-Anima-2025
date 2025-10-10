import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './CreatePost.css';

const CreatePost = ({ onPost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onPost({
        content: content.trim(),
        image: image
      });
      setContent('');
      setImage(null);
      setIsExpanded(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // En un MVP real, aquí subirías la imagen a un servidor
      // Por ahora simulamos con una URL local
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="create-post">
      <div className="create-post-header">
        <div className="user-avatar">
          <img 
            src={user?.avatar || "/img/usuario.png"} 
            alt={user?.name || "Usuario"} 
          />
        </div>
        <div className="post-input-container">
          <textarea
            className={`post-input ${isExpanded ? 'expanded' : ''}`}
            placeholder={user?.tipo_usuario === 'empresa' 
              ? "¿Qué novedades quieres compartir con la comunidad?" 
              : "¿Qué está pasando en tu carrera profesional?"
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            rows={isExpanded ? 4 : 1}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="create-post-actions">
          {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />
              <button 
                type="button" 
                className="remove-image"
                onClick={removeImage}
              >
                ✕
              </button>
            </div>
          )}

          <div className="post-tools">
            <div className="post-options">
              <label className="image-upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <span className="upload-icon">📷</span>
                <span>Foto</span>
              </label>
              
              <button type="button" className="poll-btn" disabled>
                <span>📊</span>
                <span>Encuesta</span>
              </button>
              
              <button type="button" className="event-btn" disabled>
                <span>📅</span>
                <span>Evento</span>
              </button>
            </div>

            <div className="post-actions-right">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                  setImage(null);
                }}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="publish-btn"
                onClick={handleSubmit}
                disabled={!content.trim()}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;