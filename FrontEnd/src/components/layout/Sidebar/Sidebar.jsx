import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

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
    <div className="sidebar">
      {/* Usuarios sugeridos */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Conecta con colegas</h3>
        <div className="suggested-users">
          {suggestedUsers.map(user => (
            <div key={user.id} className="suggested-user">
              <Link to={`/perfil/${user.id}`} className="user-link">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <div className="user-info">
                  <h4 className="user-name">{user.name}</h4>
                  <p className="user-profession">{user.profession}</p>
                  <span className="mutual-connections">
                    {user.mutualConnections} conexiones en común
                  </span>
                </div>
              </Link>
              <button className="follow-btn">
                Conectar
              </button>
            </div>
          ))}
        </div>
        <Link to="/explorar/usuarios" className="see-all-link">
          Ver más personas
        </Link>
      </div>

      {/* Cursos recomendados */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Cursos para ti</h3>
        <div className="recommended-courses">
          {recommendedCourses.map(course => (
            <div key={course.id} className="recommended-course">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                {course.isFree && <span className="free-badge">GRATIS</span>}
              </div>
              <div className="course-info">
                <h4 className="course-title">{course.title}</h4>
                <p className="course-provider">{course.provider}</p>
                <span className="course-students">{course.students}</span>
                {!course.isFree && (
                  <span className="course-price">{course.price}</span>
                )}
              </div>
              <Link to={`/cursos/${course.id}`} className="course-btn">
                Ver curso
              </Link>
            </div>
          ))}
        </div>
        <Link to="/cursos" className="see-all-link">
          Explorar más cursos
        </Link>
      </div>

      {/* Empresas destacadas */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Empresas destacadas</h3>
        <div className="featured-companies">
          {featuredCompanies.map(company => (
            <div key={company.id} className="featured-company">
              <Link to={`/empresa/${company.id}`} className="company-link">
                <img src={company.logo} alt={company.name} className="company-logo" />
                <div className="company-info">
                  <h4 className="company-name">{company.name}</h4>
                  <p className="company-sector">{company.sector}</p>
                  <span className="open-positions">
                    {company.openPositions} posiciones abiertas
                  </span>
                </div>
              </Link>
              <button className="follow-company-btn">
                Seguir
              </button>
            </div>
          ))}
        </div>
        <Link to="/companias" className="see-all-link">
          Ver más empresas
        </Link>
      </div>

      {/* Widget de actividad reciente */}
      <div className="sidebar-widget activity-widget">
        <h3 className="widget-title">Actividad reciente</h3>
        <div className="recent-activity">
          <div className="activity-item">
            <span className="activity-icon">👍</span>
            <span className="activity-text">
              <strong>Ana Torres</strong> le dio like a tu publicación
            </span>
            <span className="activity-time">2h</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💬</span>
            <span className="activity-text">
              <strong>Carlos Ruiz</strong> comentó tu post
            </span>
            <span className="activity-time">4h</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🎯</span>
            <span className="activity-text">
              Nueva oportunidad laboral disponible
            </span>
            <span className="activity-time">6h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;