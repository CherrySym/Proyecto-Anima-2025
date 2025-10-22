import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import Post from '../../components/Post/Post';
import * as userService from '../../../../services/userService';
import * as conexionesService from '../../../../services/conexionesService';
import * as empresaService from '../../../empresas/services/empresaService';
import { MapPin, BarChart3, UserPlus, UserCheck, UserX, Building2 } from 'lucide-react';
import * as postService from '../../services/postService';
import { getMisDesafios } from '../../../desafios/services/desafiosService';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './UserProfile.module.css';
// import './UserProfile.css'; // comentado: archivo original inactivado como backup

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [desafiosCount, setDesafiosCount] = useState(0);
  const [estadisticas, setEstadisticas] = useState({ conexiones: 0, empresasSeguidas: 0 });
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(null);
  const [loadingConnection, setLoadingConnection] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    loadUserProfile();
  }, [userId, currentUser]);

  const loadUserProfile = async () => {
    await withMinLoadingTime(async () => {
      try {
        // Determinar qué usuario cargar
        const targetUserId = userId || currentUser?.id;
        const ownProfile = !userId || userId === currentUser?.id?.toString();
        setIsOwnProfile(ownProfile);

        // Si es perfil propio, usar datos de AuthContext
        if (ownProfile && currentUser) {
          setUser(currentUser);
          
          // Cargar estadísticas de conexiones y empresas seguidas
          try {
            const stats = await conexionesService.obtenerEstadisticas();
            const empresasSeguidas = await empresaService.getEmpresasSeguidas();
            setEstadisticas({
              conexiones: stats.conexiones || 0,
              empresasSeguidas: empresasSeguidas?.length || 0
            });
          } catch (err) {
            console.error('Error cargando estadísticas:', err);
            setEstadisticas({ conexiones: 0, empresasSeguidas: 0 });
          }
          
          // Cargar posts del usuario
          try {
            const userPosts = await postService.getUserPosts(currentUser.id);
            // Normalizar estructura de posts para el componente Post
            const normalizedPosts = (userPosts || []).map(post => ({
              ...post,
              user: {
                id: post.author?.id || post.usuario?.id || currentUser.id,
                name: post.author?.nombre || post.usuario?.nombre || currentUser.nombre,
                avatar: post.author?.avatar || post.usuario?.avatar || currentUser.avatar || '/img/usuario.png',
                profession: post.author?.profesion || post.usuario?.profesion || 'Miembro de JobPath',
                isCompany: false
              },
              content: post.contenido || post.content,
              image: post.imagenUrl || post.image,
              timestamp: post.createdAt || post.timestamp,
              likes: post.likesCount || post.likes || 0,
              comments: post.commentsCount || post.comments || 0
            }));
            setPosts(normalizedPosts);
          } catch (err) {
            console.error('Error cargando posts:', err);
            setPosts([]);
          }

          // Cargar desafíos en los que participa
          try {
            const desafios = await getMisDesafios();
            setDesafiosCount(desafios?.length || 0);
          } catch (err) {
            console.error('Error cargando desafíos:', err);
            setDesafiosCount(0);
          }
        } else if (targetUserId) {
          // Cargar datos de otro usuario
          try {
            const userData = await userService.getUserById(targetUserId);
            setUser(userData);
            
            // Cargar posts del usuario
            const userPosts = await postService.getUserPosts(targetUserId);
            // Normalizar estructura de posts para el componente Post
            const normalizedPosts = (userPosts || []).map(post => ({
              ...post,
              user: {
                id: post.author?.id || post.usuario?.id || userData.id,
                name: post.author?.nombre || post.usuario?.nombre || userData.nombre,
                avatar: post.author?.avatar || post.usuario?.avatar || userData.avatar || '/img/usuario.png',
                profession: post.author?.profesion || post.usuario?.profesion || 'Miembro de JobPath',
                isCompany: false
              },
              content: post.contenido || post.content,
              image: post.imagenUrl || post.image,
              timestamp: post.createdAt || post.timestamp,
              likes: post.likesCount || post.likes || 0,
              comments: post.commentsCount || post.comments || 0
            }));
            setPosts(normalizedPosts);
            
            // Verificar si ya sigue a este usuario
            if (currentUser) {
              try {
                const connectionStatus = await conexionesService.verificarConexion(targetUserId);
                setIsFollowing(connectionStatus.siguiendo || false);
              } catch (err) {
                console.error('Error verificando conexión:', err);
                setIsFollowing(false);
              }
            }
            
            // Por ahora no mostramos desafíos de otros usuarios
            setDesafiosCount(0);
          } catch (err) {
            console.error('Error cargando perfil de usuario:', err);
            setError('No se pudo cargar el perfil del usuario');
          }
        }
      } catch (err) {
        console.error('Error en loadUserProfile:', err);
        setError('Error al cargar el perfil');
      }
    });
  };

  const handleFollow = async () => {
    if (!user?.id || loadingConnection) return;
    
    try {
      setLoadingConnection(true);
      
      if (isFollowing) {
        await conexionesService.dejarDeSeguirUsuario(user.id);
        setIsFollowing(false);
        // Actualizar contador de conexiones
        setEstadisticas(prev => ({
          ...prev,
          conexiones: Math.max(0, prev.conexiones - 1)
        }));
        showToast('Conexión eliminada', 'info');
      } else {
        await conexionesService.seguirUsuario(user.id);
        setIsFollowing(true);
        // Actualizar contador de conexiones
        setEstadisticas(prev => ({
          ...prev,
          conexiones: prev.conexiones + 1
        }));
        showToast('Conexión establecida', 'success');
      }
    } catch (err) {
      console.error('Error en conexión:', err);
      showToast('Error al procesar la conexión', 'error');
    } finally {
      setLoadingConnection(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
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
      <div className={styles['profile-page']}>
        <div className={styles['loading-container']}>
          <div className="loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || error) {
    return (
      <div className={styles['profile-page']}>
        <div className={styles['error-container']}>
          <h2>Usuario no encontrado</h2>
          <p>{error || 'El perfil que buscas no existe o ha sido eliminado.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['profile-page']}>
      {toast.show && (
        <Toast 
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={closeToast}
        />
      )}
      
      <div className={styles['profile-container']}>
        {/* Header del perfil */}
        <div className={styles['profile-header']}>
          <div className={styles['profile-cover']}>
            <div className={styles['cover-gradient']}></div>
          </div>
          
          <div className={styles['profile-info']}>
            <div className={styles['profile-avatar']}>
              <img src={user.avatar || '/img/usuario.png'} alt={user.nombre || user.name || 'Usuario'} />
            </div>
            
            <div className={styles['profile-details']}>
              <h1 className={styles['profile-name']}>{user.nombre || user.name || 'Usuario'}</h1>
              <p className={styles['profile-profession']}>{user.profesion || 'Miembro de JobPath'}</p>
              <p className={styles['profile-location']}>
                <MapPin size={16} /> {user.ubicacion || user.location || 'Uruguay'}
              </p>
              {user.bio && <p className={styles['profile-bio']}>{user.bio}</p>}
              
              <div className={styles['profile-stats']}>
                <div className={styles['stat']}>
                  <strong>{estadisticas.conexiones}</strong>
                  <span>Conexiones</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{posts.length}</strong>
                  <span>Publicaciones</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{desafiosCount}</strong>
                  <span>Desafíos</span>
                </div>
              </div>
            </div>
            
            <div className={styles['profile-actions']}>
              {isOwnProfile ? (
                <button className={styles['edit-profile-btn']}>
                  Editar perfil
                </button>
              ) : (
                <>
                  <button 
                    className={`${styles['follow-btn']} ${isFollowing ? styles.following : ''}`}
                    onClick={handleFollow}
                    onMouseEnter={() => setHoveredButton(true)}
                    onMouseLeave={() => setHoveredButton(false)}
                    disabled={loadingConnection}
                  >
                    {loadingConnection ? (
                      <div className="loading-spinner-small"></div>
                    ) : isFollowing ? (
                      hoveredButton ? (
                        <>
                          <UserX size={18} />
                          Desconectar
                        </>
                      ) : (
                        <>
                          <UserCheck size={18} />
                          Conectado
                        </>
                      )
                    ) : (
                      <>
                        <UserPlus size={18} />
                        Conectar
                      </>
                    )}
                  </button>
                  <button className={styles['message-btn']}>
                    Mensaje
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles['profile-content']}>
          {/* Sidebar con información adicional */}
          <div className={styles['profile-sidebar']}>
            {/* Habilidades */}
            <div className={styles['profile-section']}>
              <h3>Habilidades</h3>
              <div className={styles['skills-list']}>
                <p className={styles['empty-state']}>No hay habilidades registradas</p>
              </div>
            </div>

            {/* Educación */}
            <div className={styles['profile-section']}>
              <h3>Educación</h3>
              <div className={styles['education-list']}>
                <p className={styles['empty-state']}>No hay información educativa</p>
              </div>
            </div>

            {/* Experiencia */}
            <div className={styles['profile-section']}>
              <h3>Experiencia</h3>
              <div className={styles['experience-list']}>
                <p className={styles['empty-state']}>No hay experiencia laboral registrada</p>
              </div>
            </div>

            {/* Logros */}
            <div className={styles['profile-section']}>
              <h3>Logros</h3>
              <div className={styles['achievements-list']}>
                <p className={styles['empty-state']}>No hay logros registrados</p>
              </div>
            </div>
          </div>

          {/* Publicaciones del usuario */}
          <div className={styles['profile-main']}>
            <div className={styles['posts-section']}>
              <h3>Publicaciones de {isOwnProfile ? 'ti' : (user.nombre || user.name || 'este usuario')}</h3>
              
              {posts.length > 0 ? (
                <div className={styles['posts-list']}>
                  {posts.map(post => (
                    <Post 
                      key={post.id} 
                      post={post} 
                      onLike={handleLike}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles['no-posts']}>
                  <p>
                    {isOwnProfile 
                      ? "Aún no has publicado nada. ¡Comparte tu primera experiencia!"
                      : `${user.nombre || user.name || 'Este usuario'} aún no ha publicado nada.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
