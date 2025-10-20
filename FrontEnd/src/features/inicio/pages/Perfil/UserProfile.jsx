import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import Post from '../../components/Post/Post';
import * as userService from '../../../../services/userService';
import { MapPin, BarChart3 } from 'lucide-react';
import * as postService from '../../services/postService';
import styles from './UserProfile.module.css';
// import './UserProfile.css'; // comentado: archivo original inactivado como backup

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data para el perfil
  const mockUser = {
    id: userId || currentUser?.id || 1,
    name: userId ? "María González" : (currentUser?.name || "Usuario"),
    email: "maria.gonzalez@email.com",
    avatar: "/img/usuario.png",
    profession: "Estudiante de Marketing Digital",
    location: "Buenos Aires, Argentina",
    age: 20,
    bio: "Apasionada por el marketing digital y las redes sociales. Siempre buscando nuevas oportunidades para aprender y crecer profesionalmente. 🚀",
    stats: {
      connections: 156,
      posts: 23,
      coursesCompleted: 8
    },
    skills: ["Marketing Digital", "Redes Sociales", "Análisis de Datos", "Content Creation", "SEO", "Google Analytics"],
    education: [
      {
        title: "Licenciatura en Marketing",
        institution: "Universidad de Buenos Aires",
        period: "2021 - 2024",
        current: true
      },
      {
        title: "Certificación en Marketing Digital",
        institution: "Google",
        period: "2023",
        current: false
      }
    ],
    experience: [
      {
        title: "Pasante de Marketing",
        company: "StartupTech",
        period: "Ene 2024 - Presente",
        current: true,
        description: "Desarrollo de estrategias de contenido y gestión de redes sociales."
      }
    ],
    achievements: [
      {
        title: "Marketing Rookie del Año",
        date: "2024",
        icon: "🏆"
      },
      {
        title: "Curso Google Analytics Completado",
        date: "2023",
        icon: <BarChart3 size={16} />
      }
    ],
    enrolledCourses: [
      {
        id: 1,
        titulo: 'Introducción a la Programación con Python',
        area: 'tecnologia',
        nivel: 'principiante',
        progreso: 75,
        fechaInscripcion: '2024-09-15',
        completado: false,
        proveedor: 'CodeAcademy',
        imagen: '/img/curso-python.jpg'
      },
      {
        id: 2,
        titulo: 'Diseño UX/UI para Principiantes',
        area: 'diseño',
        nivel: 'principiante',
        progreso: 100,
        fechaInscripcion: '2024-08-01',
        completado: true,
        proveedor: 'DesignHub',
        imagen: '/img/curso-ux.jpg'
      },
      {
        id: 5,
        titulo: 'Excel Avanzado para Negocios',
        area: 'negocios',
        nivel: 'intermedio',
        progreso: 45,
        fechaInscripcion: '2024-10-01',
        completado: false,
        proveedor: 'BusinessPro',
        imagen: '/img/curso-excel.jpg'
      }
    ]
  };

  // Mock posts del usuario
  const mockUserPosts = [
    {
      id: 101,
      user: mockUser,
      content: "¡Acabo de completar mi primer curso de Marketing Digital! 🚀 Muy emocionada de aplicar todo lo aprendido. ¿Alguien más está estudiando marketing?",
      image: "/img/img1.png",
      timestamp: "2 días",
      likes: 24,
      comments: 8,
      isLiked: false
    },
    {
      id: 102,
      user: mockUser,
      content: "Reflexionando sobre la importancia del networking en el desarrollo profesional. Las conexiones que hacemos hoy pueden abrir puertas increíbles mañana. 💼✨",
      image: null,
      timestamp: "1 semana",
      likes: 45,
      comments: 12,
      isLiked: true
    }
  ];

  useEffect(() => {
    loadUserProfile();
  }, [userId, currentUser]);

  const loadUserProfile = async () => {
    await withMinLoadingTime(async () => {
      // Simular carga de datos
      setUser(mockUser);
      setPosts(mockUserPosts);
      setIsOwnProfile(!userId || userId === currentUser?.id?.toString());
      setIsFollowing(false); // Por defecto no seguimos al usuario
    });
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
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

  if (!user) {
    return (
      <div className={styles['profile-page']}>
        <div className={styles['error-container']}>
          <h2>Usuario no encontrado</h2>
          <p>El perfil que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-container']}>
        {/* Header del perfil */}
        <div className={styles['profile-header']}>
          <div className={styles['profile-cover']}>
            <div className={styles['cover-gradient']}></div>
          </div>
          
          <div className={styles['profile-info']}>
            <div className={styles['profile-avatar']}>
              <img src={user.avatar} alt={user.name} />
            </div>
            
            <div className={styles['profile-details']}>
              <h1 className={styles['profile-name']}>{user.name}</h1>
              <p className={styles['profile-profession']}>{user.profession}</p>
              <p className={styles['profile-location']}><MapPin size={16} /> {user.location}</p>
              <p className={styles['profile-bio']}>{user.bio}</p>
              
              <div className={styles['profile-stats']}>
                <div className={styles['stat']}>
                  <strong>{user.stats.connections}</strong>
                  <span>Conexiones</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{user.stats.posts}</strong>
                  <span>Publicaciones</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{user.stats.coursesCompleted}</strong>
                  <span>Cursos</span>
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
                  >
                    {isFollowing ? 'Siguiendo' : 'Conectar'}
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
                {user.skills.map((skill, index) => (
                  <span key={index} className={styles['skill-tag']}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Educación */}
            <div className={styles['profile-section']}>
              <h3>Educación</h3>
              <div className={styles['education-list']}>
                {user.education.map((edu, index) => (
                  <div key={index} className={styles['education-item']}>
                    <h4>{edu.title}</h4>
                    <p>{edu.institution}</p>
                    <span className={styles['period']}>
                      {edu.period} {edu.current && <span className={styles['current-badge']}>Actual</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiencia */}
            <div className={styles['profile-section']}>
              <h3>Experiencia</h3>
              <div className={styles['experience-list']}>
                {user.experience.map((exp, index) => (
                  <div key={index} className={styles['experience-item']}>
                    <h4>{exp.title}</h4>
                    <p>{exp.company}</p>
                    <span className={styles['period']}>
                      {exp.period} {exp.current && <span className={styles['current-badge']}>Actual</span>}
                    </span>
                    <p className={styles['description']}>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logros */}
            <div className={styles['profile-section']}>
              <h3>Logros</h3>
              <div className={styles['achievements-list']}>
                {user.achievements.map((achievement, index) => (
                  <div key={index} className={styles['achievement-item']}>
                    <span className={styles['achievement-icon']}>{achievement.icon}</span>
                    <div>
                      <h4>{achievement.title}</h4>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mis Cursos - Solo visible en perfil propio */}
            {isOwnProfile && user.enrolledCourses && user.enrolledCourses.length > 0 && (
              <div className={styles['profile-section']}>
                <div className={styles['section-header']}>
                  <h3>Mis Cursos</h3>
                  <button 
                    className={styles['view-all-btn']}
                    onClick={() => navigate('/mis-cursos')}
                  >
                    Ver todos
                  </button>
                </div>
                <div className={styles['enrolled-courses-list']}>
                  {user.enrolledCourses.map((curso) => (
                    <div 
                      key={curso.id} 
                      className={styles['enrolled-course-card']}
                      onClick={() => navigate('/mis-cursos')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles['course-image']}>
                        <img 
                          src={curso.imagen} 
                          alt={curso.titulo}
                          onError={(e) => {
                            e.target.src = '/img/default-course.png';
                          }}
                        />
                        {curso.completado && (
                          <span className={styles['completed-badge']}>✓ Completado</span>
                        )}
                      </div>
                      <div className={styles['course-info']}>
                        <h4>{curso.titulo}</h4>
                        <p className={styles['course-provider']}>{curso.proveedor}</p>
                        <div className={styles['course-progress']}>
                          <div className={styles['progress-bar']}>
                            <div 
                              className={styles['progress-fill']} 
                              style={{ width: `${curso.progreso}%` }}
                            ></div>
                          </div>
                          <span className={styles['progress-text']}>{curso.progreso}% completado</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Publicaciones del usuario */}
          <div className={styles['profile-main']}>
            <div className={styles['posts-section']}>
              <h3>Publicaciones de {isOwnProfile ? 'ti' : user.name}</h3>
              
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
                      : `${user.name} aún no ha publicado nada.`
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
