import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
// import './Sidebar.css'; // backup preserved as Sidebar.css (commented)

const Sidebar = () => {
  // Mock data para usuarios sugeridos
  const suggestedUsers = [
    {
      id: 1,
      name: "Lucas García",
      profession: "Desarrollador Frontend",
      avatar: "/img/usuario.png",
      mutualConnections: 12,
      isFollowing: false
    },
    {
      id: 2,
      name: "Valentina López",
      profession: "Diseñadora UX",
      avatar: "/img/usuario.png",
      mutualConnections: 8,
      isFollowing: false
    },
    {
      id: 3,
      name: "Diego Martínez",
      profession: "Marketing Digital",
      avatar: "/img/usuario.png",
      mutualConnections: 15,
      isFollowing: false
    }
  ];

  // Mock data para cursos recomendados
  const recommendedCourses = [
    {
      id: 1,
      title: "Introducción a React",
      provider: "Tech Academy",
      students: "2.3k estudiantes",
      image: "/img/teyma.jpg",
      isFree: true
    },
    {
      id: 2,
      title: "Marketing Digital para Principiantes",
      provider: "Digital Skills",
      students: "1.8k estudiantes",
      image: "/img/MercLP.jpg",
      isFree: true
    },
    {
      id: 3,
      title: "Diseño UX/UI Básico",
      provider: "Design Pro",
      students: "950 estudiantes",
      image: "/img/img1.png",
      isFree: false,
      price: "$29"
    }
  ];

  // Mock data para empresas destacadas
  const featuredCompanies = [
    {
      id: 1,
      name: "Globant",
      sector: "Tecnología",
      logo: "/img/globant.jpg",
      openPositions: 15
    },
    {
      id: 2,
      name: "MercadoLibre",
      sector: "E-commerce",
      logo: "/img/MercLP.jpg",
      openPositions: 8
    },
    {
      id: 3,
      name: "Teyma",
      sector: "Consultoría",
      logo: "/img/teyma.jpg",
      openPositions: 5
    }
  ];

  return (
    <div className={styles['sidebar']}>
      {/* Usuarios sugeridos */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Conecta con colegas</h3>
        <div className={styles['suggested-users']}>
          {suggestedUsers.map(user => (
            <div key={user.id} className={styles['suggested-user']}>
              <Link to={`/perfil/${user.id}`} className={styles['user-link']}>
                <img src={user.avatar} alt={user.name} className={styles['user-avatar']} />
                <div className={styles['user-info']}>
                  <h4 className={styles['user-name']}>{user.name}</h4>
                  <p className={styles['user-profession']}>{user.profession}</p>
                  <span className={styles['mutual-connections']}>
                    {user.mutualConnections} conexiones en común
                  </span>
                </div>
              </Link>
              <button className={styles['follow-btn']}>
                Conectar
              </button>
            </div>
          ))}
        </div>
        <Link to="/explorar/usuarios" className={styles['see-all-link']}>
          Ver más personas
        </Link>
      </div>

      {/* Cursos recomendados */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Cursos para ti</h3>
        <div className={styles['recommended-courses']}>
          {recommendedCourses.map(course => (
            <div key={course.id} className={styles['recommended-course']}>
              <div className={styles['course-image']}>
                <img src={course.image} alt={course.title} />
                {course.isFree && <span className={styles['free-badge']}>GRATIS</span>}
              </div>
              <div className={styles['course-info']}>
                <h4 className={styles['course-title']}>{course.title}</h4>
                <p className={styles['course-provider']}>{course.provider}</p>
                <span className={styles['course-students']}>{course.students}</span>
                {!course.isFree && (
                  <span className={styles['course-price']}>{course.price}</span>
                )}
              </div>
              <Link to={`/cursos/${course.id}`} className={styles['course-btn']}>
                Ver curso
              </Link>
            </div>
          ))}
        </div>
        <Link to="/cursos" className={styles['see-all-link']}>
          Explorar más cursos
        </Link>
      </div>

      {/* Empresas destacadas */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Empresas destacadas</h3>
        <div className={styles['featured-companies']}>
          {featuredCompanies.map(company => (
            <div key={company.id} className={styles['featured-company']}>
              <Link to={`/empresa/${company.id}`} className={styles['company-link']}>
                <img src={company.logo} alt={company.name} className={styles['company-logo']} />
                <div className={styles['company-info']}>
                  <h4 className={styles['company-name']}>{company.name}</h4>
                  <p className={styles['company-sector']}>{company.sector}</p>
                  <span className={styles['open-positions']}>
                    {company.openPositions} posiciones abiertas
                  </span>
                </div>
              </Link>
              <button className={styles['follow-company-btn']}>
                Seguir
              </button>
            </div>
          ))}
        </div>
        <Link to="/companias" className={styles['see-all-link']}>
          Ver más empresas
        </Link>
      </div>

      {/* Widget de actividad reciente */}
      <div className={`${styles['sidebar-widget']} ${styles['activity-widget']}`}>
        <h3 className={styles['widget-title']}>Actividad reciente</h3>
        <div className={styles['recent-activity']}>
          <div className={styles['activity-item']}>
            <span className={styles['activity-icon']}>👍</span>
            <span className={styles['activity-text']}>
              <strong>Ana Torres</strong> le dio like a tu publicación
            </span>
            <span className={styles['activity-time']}>2h</span>
          </div>
          <div className={styles['activity-item']}>
            <span className={styles['activity-icon']}>💬</span>
            <span className={styles['activity-text']}>
              <strong>Carlos Ruiz</strong> comentó tu post
            </span>
            <span className={styles['activity-time']}>4h</span>
          </div>
          <div className={styles['activity-item']}>
            <span className={styles['activity-icon']}>🎯</span>
            <span className={styles['activity-text']}>
              Nueva oportunidad laboral disponible
            </span>
            <span className={styles['activity-time']}>6h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;