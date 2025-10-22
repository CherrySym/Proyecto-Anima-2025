import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import Post from '../../../inicio/components/Post/Post';
import * as empresaService from '../../services/empresaService';
import { MapPin, UserPlus, UserCheck, UserX, Building2 } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './CompanyProfile.module.css';
// import './CompanyProfile.css'; // comentado: backup

// Función auxiliar para formatear timestamps
const formatTimestamp = (dateString) => {
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

const CompanyProfile = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [company, setCompany] = useState(null);
  const [posts, setPosts] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('publicaciones');
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Mock data para la empresa
  const mockCompany = {
    id: companyId || 1,
    name: "Globant",
    sector: "Tecnología",
    logo: "/img/globant.jpg",
    coverImage: "/img/img1.png",
    location: "Buenos Aires, Argentina",
    website: "https://www.globant.com",
    founded: "2003",
    employees: "25,000+",
    description: "Somos una compañía de servicios de tecnología nativa digital que ayuda a las organizaciones a reinventarse a través de la ingeniería de software innovadora.",
    stats: {
      followers: 45000,
      posts: 156,
      openPositions: 15
    },
    values: ["Innovación", "Agilidad", "Diversidad", "Sustentabilidad"],
    benefits: [
      "Trabajo remoto",
      "Horarios flexibles", 
      "Capacitación continua",
      "Seguro médico",
      "Gimnasio",
      "Día libre por cumpleaños"
    ],
    openPositions: [
      {
        id: 1,
        title: "Desarrollador Frontend React",
        department: "Tecnología",
        location: "Buenos Aires / Remoto",
        type: "Full-time",
        experience: "Junior"
      },
      {
        id: 2,
        title: "UX/UI Designer",
        department: "Diseño",
        location: "CABA",
        type: "Full-time", 
        experience: "Semi-senior"
      },
      {
        id: 3,
        title: "Data Analyst Trainee",
        department: "Data",
        location: "Remoto",
        type: "Trainee",
        experience: "Sin experiencia"
      }
    ],
    challenges: [
      {
        id: 1,
        title: "Globant Code Challenge",
        description: "Desarrolla una aplicación web innovadora",
        prize: "$50,000 ARS",
        deadline: "30 días",
        participants: 245
      },
      {
        id: 2,
        title: "UX Innovation Contest",
        description: "Diseña la experiencia del futuro",
        prize: "Entrevista directa",
        deadline: "15 días",
        participants: 89
      }
    ]
  };

  // Mock posts de la empresa
  const mockCompanyPosts = [
    {
      id: 201,
      user: {
        id: mockCompany.id,
        name: mockCompany.name,
        avatar: mockCompany.logo,
        isCompany: true,
        sector: mockCompany.sector
      },
      content: "🌟 ¡Nueva oportunidad para jóvenes desarrolladores! Estamos buscando talentos entre 18-25 años para nuestro programa de trainee. Si te apasiona la tecnología y quieres formar parte de proyectos innovadores, ¡esta es tu oportunidad! 🚀\n\n#Trainee #Tecnología #Oportunidades",
      image: null,
      timestamp: "2 horas",
      likes: 156,
      comments: 32,
      isLiked: false
    },
    {
      id: 202,
      user: {
        id: mockCompany.id,
        name: mockCompany.name,
        avatar: mockCompany.logo,
        isCompany: true,
        sector: mockCompany.sector
      },
      content: "🎯 En Globant creemos en el poder de la diversidad. Nuestros equipos multiculturales trabajan desde más de 25 países creando soluciones digitales que transforman industrias.\n\n¿Quieres ser parte de esta revolución digital?",
      image: "/img/jovenes.png",
      timestamp: "1 día",
      likes: 289,
      comments: 45,
      isLiked: true
    },
    {
      id: 203,
      user: {
        id: mockCompany.id,
        name: mockCompany.name,
        avatar: mockCompany.logo,
        isCompany: true,
        sector: mockCompany.sector
      },
      content: "💡 Tips para destacar en tu entrevista técnica:\n\n✅ Practica coding challenges\n✅ Entiende los fundamentos\n✅ Comunica tu proceso de pensamiento\n✅ Haz preguntas inteligentes\n✅ Muestra pasión por aprender\n\n¿Qué otros consejos agregarían? 👇",
      image: null,
      timestamp: "3 días",
      likes: 567,
      comments: 89,
      isLiked: false
    }
  ];

  useEffect(() => {
    const loadCompanyData = async () => {
      if (!companyId) return;
      
      await withMinLoadingTime(async () => {
        try {
          // Cargar datos reales de la empresa desde la API
          const empresaData = await empresaService.getEmpresaById(companyId);
          
          setCompany({
            id: empresaData.id,
            name: empresaData.nombre || empresaData.name,
            sector: empresaData.sector,
            logo: empresaData.logo,
            coverImage: empresaData.coverImage || '/img/img1.png',
            location: empresaData.ubicacion,
            website: empresaData.website || '#',
            description: empresaData.descripcion,
            founded: empresaData.founded || 'N/A',
            employees: empresaData.employees || 'N/A',
            values: empresaData.values || [],
            benefits: empresaData.benefits || [],
            stats: {
              followers: empresaData.contadores?.seguidores || 0,
              posts: empresaData.contadores?.posts || 0,
              openPositions: empresaData.contadores?.ofertas || 0
            },
            // Las ofertas y desafíos vienen del backend
            openPositions: empresaData.ofertas || [],
            challenges: empresaData.desafios || []
          });
          
          setIsFollowing(empresaData.siguiendo || false);
          
          // Cargar posts reales de la empresa desde el backend
          const postsFormateados = (empresaData.posts || []).map(post => ({
            id: post.id,
            user: {
              id: empresaData.id,
              name: empresaData.nombre,
              avatar: empresaData.logo,
              isCompany: true,
              sector: empresaData.sector
            },
            content: post.contenido,
            image: post.imagenUrl, // Corregido: era imagenUrl, no imagen
            timestamp: formatTimestamp(post.createdAt),
            likes: post.likesCount || 0,
            comments: post.commentsCount || 0,
            isLiked: false // TODO: verificar si el usuario dio like
          }));
          setPosts(postsFormateados);
        } catch (err) {
          console.error('Error cargando empresa:', err);
          // NO usar fallback - mostrar error al usuario
          setCompany(null);
          setPosts([]);
          setIsFollowing(false);
        }
      });
    };
    
    loadCompanyData();
  }, [companyId]);

  const handleFollow = async () => {
    if (!company?.id || loadingFollow) return;
    
    try {
      setLoadingFollow(true);
      
      if (isFollowing) {
        await empresaService.dejarDeSeguirEmpresa(company.id);
        setIsFollowing(false);
        // Actualizar contador
        setCompany(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            followers: Math.max(0, prev.stats.followers - 1)
          }
        }));
        showToast('Dejaste de seguir a esta empresa', 'info');
      } else {
        await empresaService.seguirEmpresa(company.id);
        setIsFollowing(true);
        // Actualizar contador
        setCompany(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            followers: prev.stats.followers + 1
          }
        }));
        showToast('Ahora sigues a esta empresa', 'success');
      }
    } catch (err) {
      console.error('Error siguiendo empresa:', err);
      showToast('Error al procesar la acción', 'error');
    } finally {
      setLoadingFollow(false);
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
      <div className={styles['company-profile-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando perfil de empresa...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className={styles['company-profile-page']}>
        <div className={styles['error-container']}>
          <Building2 size={64} style={{ color: '#999', marginBottom: '20px' }} />
          <h2>Empresa no encontrada</h2>
          <p>La empresa con ID {companyId} no existe en la base de datos.</p>
          <button 
            onClick={() => navigate('/red?tab=empresas')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#4f4fcf',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Ver todas las empresas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['company-profile-page']}>
      {toast.show && (
        <Toast 
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={closeToast}
        />
      )}
      
      <div className={styles['company-profile-container']}>
        {/* Header de la empresa */}
        <div className={styles['company-header']}>
          <div className={styles['company-cover']}>
            <img src={company.coverImage} alt={`${company.name} cover`} />
            <div className={styles['cover-overlay']}></div>
          </div>
          
          <div className={styles['company-info']}>
            <div className={styles['company-avatar']}>
              <img src={company.logo} alt={company.name} />
            </div>
            
            <div className={styles['company-details']}>
              <h1 className={styles['company-name']}>{company.name}</h1>
              <p className={styles['company-sector']}>{company.sector}</p>
              <p className={styles['company-location']}><MapPin size={16} /> {company.location}</p>
              <p className={styles['company-description']}>{company.description}</p>
              
              <div className={styles['company-stats']}>
                <div className={styles['stat']}>
                  <strong>{company.stats.followers.toLocaleString()}</strong>
                  <span>Seguidores</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{company.stats.posts}</strong>
                  <span>Publicaciones</span>
                </div>
                <div className={styles['stat']}>
                  <strong>{company.stats.openPositions}</strong>
                  <span>Ofertas</span>
                </div>
              </div>
            </div>
            
            <div className={styles['company-actions']}>
              <button 
                className={`${styles['follow-company-btn']} ${isFollowing ? styles['following'] : ''}`}
                onClick={handleFollow}
                onMouseEnter={() => setHoveredButton(true)}
                onMouseLeave={() => setHoveredButton(false)}
                disabled={loadingFollow}
              >
                {loadingFollow ? (
                  <div className="loading-spinner-small"></div>
                ) : isFollowing ? (
                  hoveredButton ? (
                    <>
                      <UserX size={18} />
                      Dejar de seguir
                    </>
                  ) : (
                    <>
                      <UserCheck size={18} />
                      Siguiendo
                    </>
                  )
                ) : (
                  <>
                    <UserPlus size={18} />
                    Seguir
                  </>
                )}
              </button>
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles['visit-website-btn']}
              >
                Visitar sitio web
              </a>
            </div>
          </div>
        </div>

        {/* Navegación de tabs */}
        <div className={styles['company-tabs']}>
          <button 
            className={`${styles['tab']} ${activeTab === 'publicaciones' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('publicaciones')}
          >
            Publicaciones
          </button>
          <button 
            className={`${styles['tab']} ${activeTab === 'empleos' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('empleos')}
          >
            Empleos ({company.openPositions.length})
          </button>
          <button 
            className={`${styles['tab']} ${activeTab === 'desafios' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('desafios')}
          >
            Desafíos ({company.challenges.length})
          </button>
          <button 
            className={`${styles['tab']} ${activeTab === 'sobre-nosotros' ? styles['active'] : ''}`}
            onClick={() => setActiveTab('sobre-nosotros')}
          >
            Sobre nosotros
          </button>
        </div>

        {/* Contenido según tab activo */}
        <div className={styles['company-content']}>
          {activeTab === 'publicaciones' && (
            <div className={styles['publications-tab']}>
              <div className={styles['posts-list']}>
                {posts.map(post => (
                  <Post 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'empleos' && (
            <div className={styles['jobs-tab']}>
              <h3>Posiciones abiertas</h3>
              {company.openPositions.length === 0 ? (
                <p className={styles['no-data']}>No hay posiciones abiertas en este momento.</p>
              ) : (
                <div className={styles['jobs-grid']}>
                  {company.openPositions.map(job => (
                    <div key={job.id} className={styles['job-card']}>
                      <h4>{job.titulo}</h4>
                      <p className={styles['job-department']}>{job.ubicacion}</p>
                      <p className={styles['job-location']}><MapPin size={14} /> {job.tipoContrato}</p>
                      <div className={styles['job-tags']}>
                        <span className={styles['job-type']}>{job.modalidad}</span>
                        <span className={styles['job-experience']}>{job.postulacionesCount || 0} postulaciones</span>
                      </div>
                      <button 
                        className={styles['apply-btn']}
                        onClick={() => navigate(`/oferta/${job.id}`)}
                      >
                        Ver oferta
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'desafios' && (
            <div className={styles['challenges-tab']}>
              <h3>Desafíos activos</h3>
              {company.challenges.length === 0 ? (
                <p className={styles['no-data']}>No hay desafíos activos en este momento.</p>
              ) : (
                <div className={styles['challenges-grid']}>
                  {company.challenges.map(challenge => (
                    <div key={challenge.id} className={styles['challenge-card']}>
                      <h4>{challenge.titulo}</h4>
                      <p className={styles['challenge-description']}>{challenge.descripcion}</p>
                      <div className={styles['challenge-info']}>
                        <div className={styles['challenge-prize']}>
                          <strong>Recompensa: {challenge.recompensa || 0} puntos</strong>
                        </div>
                        <div className={styles['challenge-stats']}>
                          <span>📊 Dificultad: {challenge.dificultad || 'Media'}</span>
                          <span>👥 {challenge.participantesCount || 0} participantes</span>
                        </div>
                      </div>
                      <button 
                        className={styles['participate-btn']}
                        onClick={() => navigate(`/desafio/${challenge.id}`)}
                      >
                        Ver desafío
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'sobre-nosotros' && (
            <div className={styles['about-tab']}>
              <div className={styles['about-grid']}>
                <div className={styles['about-section']}>
                  <h3>Información general</h3>
                  <div className={styles['info-list']}>
                    <div className={styles['info-item']}>
                      <strong>Fundada:</strong>
                      <span>{company.founded}</span>
                    </div>
                    <div className={styles['info-item']}>
                      <strong>Empleados:</strong>
                      <span>{company.employees}</span>
                    </div>
                    <div className={styles['info-item']}>
                      <strong>Sector:</strong>
                      <span>{company.sector}</span>
                    </div>
                    <div className={styles['info-item']}>
                      <strong>Ubicación:</strong>
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>

                <div className={styles['about-section']}>
                  <h3>Valores</h3>
                  <div className={styles['values-list']}>
                    {company.values.map((value, index) => (
                      <span key={index} className={styles['value-tag']}>
                        {value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles['about-section']}>
                  <h3>Beneficios</h3>
                  <div className={styles['benefits-list']}>
                    {company.benefits.map((benefit, index) => (
                      <div key={index} className={styles['benefit-item']}>
                        <span className={styles['benefit-icon']}>✅</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;