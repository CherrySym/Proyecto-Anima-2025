import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import './Perfil.css';

/**
 * Página Perfil - Migrado desde perfil/perfil.html
 * Muestra información del usuario y sus publicaciones
 * Permite agregar imágenes y editar perfil
 */
const Perfil = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  // Estados locales
  const [publications, setPublications] = useState([]);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(null);
  const [stats, setStats] = useState({
    publications: 0,
    followers: '10.394',
    points: '20'
  });

  // Redirigir si no hay usuario logueado
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Manejar click en placeholder para agregar imagen
  const handlePlaceholderClick = (index) => {
    setCurrentPlaceholder(index);
    fileInputRef.current?.click();
  };

  // Agregar nueva publicación
  const handleAddPublication = () => {
    setPublications(prev => [...prev, { id: Date.now(), image: null }]);
    setStats(prev => ({
      ...prev,
      publications: parseInt(prev.publications) + 1
    }));
  };

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && currentPlaceholder !== null) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPublications(prev => {
          const newPubs = [...prev];
          newPubs[currentPlaceholder] = {
            ...newPubs[currentPlaceholder],
            image: event.target.result
          };
          return newPubs;
        });
        setCurrentPlaceholder(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar edición de perfil
  const handleEdit = () => {
    const newName = prompt('Ingrese su nombre:', user.name);
    const newLastname = prompt('Ingrese su apellido:', user.lastname);
    const newEmail = prompt('Ingrese su correo:', user.email);

    if (newName !== null && newLastname !== null && newEmail !== null) {
      updateProfile({
        name: newName || user.name,
        lastname: newLastname || user.lastname,
        email: newEmail || user.email
      });
    }
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="perfil-page">
      <Header showFullNav={true} title="Job Path" />

      <div className="profile-container">
        <h2 className="username">{user.name}</h2>
        <h2 className="username">{user.lastname}</h2>
        <p className="user-email">{user.email}</p>

        <div className="stats">
          <div>
            <strong>{stats.publications}</strong>
            <br />
            publications
          </div>
          <div>
            <strong>{stats.followers}</strong>
            <br />
            followers
          </div>
          <div>
            <strong>{stats.points}</strong>
            <br />
            points
          </div>
        </div>

        <div className="top-right-buttons">
          <button className="edit-btn" onClick={handleEdit}>
            Editar
          </button>
          <button 
            className="settings-btn" 
            onClick={() => navigate('/curriculum')}
          >
            CV
          </button>
          <button className="settings-btn logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="main-container">
        <div className="publications">
          <div className="publications-header">
            <h3>Mis Publicaciones</h3>
            <button className="add-image-btn" onClick={handleAddPublication}>
              ➕ Agregar Publicación
            </button>
          </div>

          <div className="publications-grid">
            {publications.map((pub, index) => (
              <div key={pub.id} className="publication-item">
                {pub.image ? (
                  <img src={pub.image} alt="Publicación de usuario" />
                ) : (
                  <div
                    className="image-placeholder"
                    onClick={() => handlePlaceholderClick(index)}
                  >
                    <span>Haz click para agregar imagen</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="working">
          <h3>Actualmente trabajando en</h3>
          <div className="company-card">
            <img src="https://picsum.photos/400/200?random=7" alt="Compañía" />
            <button>Ver Compañía</button>
          </div>
        </div>
      </div>

      {/* Input oculto para selección de archivos */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Perfil;
