import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { Camera, BarChart3, Calendar } from 'lucide-react';
import styles from './CreatePost.module.css';
// import './CreatePost.css'; // backup preserved as CreatePost.css (commented)

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
      // TODO: En producción, subir la imagen a un servidor o servicio de almacenamiento
      // Por ahora creamos una URL local para preview
      const reader = new FileReader();
      reader.onloadend = () => {
        // Aquí deberías subir la imagen y obtener la URL
        // Por ahora usamos la URL local
        setImage(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className={styles['create-post']}>
      <div className={styles['create-post-header']}>
        <div className={styles['user-avatar']}>
          <img 
            src={user?.avatar || user?.logo || "/img/usuario.png"} 
            alt={user?.nombre || "Usuario"} 
          />
        </div>
        <div className={styles['post-input-container']}>
          <textarea
            id="post-content"
            name="content"
            className={`${styles['post-input']} ${isExpanded ? styles['expanded'] : ''}`}
            placeholder={user?.tipoUsuario === 'EMPRESA' 
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
        <div className={styles['create-post-actions']}>
          {image && (
            <div className={styles['image-preview']}>
              <img src={image} alt="Preview" />
              <button 
                type="button" 
                className={styles['remove-image']}
                onClick={removeImage}
              >
                ✕
              </button>
            </div>
          )}

          <div className={styles['post-tools']}>
            <div className={styles['post-options']}>
              <label className={styles['image-upload-btn']}>
                <input
                  id="post-image-upload"
                  name="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <Camera size={20} className={styles['upload-icon']} />
                <span>Foto</span>
              </label>
              
              <button type="button" className={styles['poll-btn']} disabled>
                <BarChart3 size={20} />
                <span>Encuesta</span>
              </button>
              
              <button type="button" className={styles['event-btn']} disabled>
                <Calendar size={20} />
                <span>Evento</span>
              </button>
            </div>

            <div className={styles['post-actions-right']}>
              <button 
                type="button" 
                className={styles['cancel-btn']}
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
                className={styles['publish-btn']}
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