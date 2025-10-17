import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import './Cursos.css';

/**
 * Página de Cursos y Talleres
 * Accesible para todos los usuarios
 * Muestra cursos externos y capacitaciones
 * 
 * ⚠️ ESTADO MVP: Esta página usa datos de ejemplo (mock data)
 * Los cursos NO están conectados al backend en esta versión MVP
 * Funcionalidad completa se implementará en fase 2
 */
const Cursos = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [filtros, setFiltros] = useState({
    area: 'todas',
    nivel: 'todos',
    modalidad: 'todas',
    precio: 'todos'
  });

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    await withMinLoadingTime(async () => {
      // Simular carga de cursos desde API
      setCursos([
        {
          id: 1,
          titulo: 'Introducción a la Programación con Python',
          descripcion: 'Aprende los fundamentos de la programación con uno de los lenguajes más populares.',
          area: 'tecnologia',
          nivel: 'principiante',
          modalidad: 'online',
          duracion: '6 semanas',
          precio: 'gratuito',
          proveedor: 'CodeAcademy',
          rating: 4.8,
          estudiantes: 1234,
          imagen: '/img/curso-python.jpg',
          url: 'https://example.com/python-course',
          skills: ['Python', 'Programación', 'Variables', 'Funciones'],
          certificado: true
        },
        {
          id: 2,
          titulo: 'Diseño UX/UI para Principiantes',
          descripcion: 'Domina los principios del diseño de experiencia de usuario y interfaces.',
          area: 'diseño',
          nivel: 'principiante',
          modalidad: 'online',
          duracion: '4 semanas',
          precio: 'pago',
          precio_valor: '$25,000',
          proveedor: 'DesignHub',
          rating: 4.6,
          estudiantes: 856,
          imagen: '/img/curso-ux.jpg',
          url: 'https://example.com/ux-course',
          skills: ['UX Design', 'UI Design', 'Figma', 'Prototipado'],
          certificado: true
        },
        {
          id: 3,
          titulo: 'Marketing Digital para Jóvenes',
          descripcion: 'Estrategias de marketing digital adaptadas para la nueva generación.',
          area: 'marketing',
          nivel: 'intermedio',
          modalidad: 'hibrido',
          duracion: '8 semanas',
          precio: 'gratuito',
          proveedor: 'MarketingPro',
          rating: 4.7,
          estudiantes: 642,
          imagen: '/img/curso-marketing.jpg',
          url: 'https://example.com/marketing-course',
          skills: ['SEO', 'Redes Sociales', 'Google Ads', 'Analytics'],
          certificado: false
        },
        {
          id: 4,
          titulo: 'Desarrollo Web Frontend',
          descripcion: 'Crea sitios web modernos con HTML, CSS, JavaScript y React.',
          area: 'tecnologia',
          nivel: 'intermedio',
          modalidad: 'online',
          duracion: '12 semanas',
          precio: 'pago',
          precio_valor: '$45,000',
          proveedor: 'WebDev Academy',
          rating: 4.9,
          estudiantes: 2108,
          imagen: '/img/curso-frontend.jpg',
          url: 'https://example.com/frontend-course',
          skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
          certificado: true
        },
        {
          id: 5,
          titulo: 'Inglés para el Mundo Laboral',
          descripcion: 'Mejora tu inglés con enfoque en comunicación profesional y entrevistas.',
          area: 'idiomas',
          nivel: 'intermedio',
          modalidad: 'online',
          duracion: '10 semanas',
          precio: 'pago',
          precio_valor: '$30,000',
          proveedor: 'English Pro',
          rating: 4.5,
          estudiantes: 1523,
          imagen: '/img/curso-ingles.jpg',
          url: 'https://example.com/english-course',
          skills: ['Business English', 'Presentaciones', 'Entrevistas', 'Email'],
          certificado: true
        },
        {
          id: 6,
          titulo: 'Emprendimiento Digital',
          descripcion: 'Aprende a crear y lanzar tu propio emprendimiento digital desde cero.',
          area: 'negocios',
          nivel: 'avanzado',
          modalidad: 'hibrido',
          duracion: '6 semanas',
          precio: 'gratuito',
          proveedor: 'StartUp School',
          rating: 4.4,
          estudiantes: 789,
          imagen: '/img/curso-emprendimiento.jpg',
          url: 'https://example.com/entrepreneurship-course',
          skills: ['Business Plan', 'Lean Startup', 'Financiamiento', 'Pitch'],
          certificado: false
        }
      ]);
    });
  };

  const filtrarCursos = () => {
    return cursos.filter(curso => {
      const coincideArea = filtros.area === 'todas' || curso.area === filtros.area;
      const coincideNivel = filtros.nivel === 'todos' || curso.nivel === filtros.nivel;
      const coincideModalidad = filtros.modalidad === 'todas' || curso.modalidad === filtros.modalidad;
      const coincidePrecio = filtros.precio === 'todos' || curso.precio === filtros.precio;
      
      return coincideArea && coincideNivel && coincideModalidad && coincidePrecio;
    });
  };

  const handleVerCurso = (curso) => {
    // Abrir en nueva pestaña
    window.open(curso.url, '_blank');
  };

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'principiante': return '#28a745';
      case 'intermedio': return '#ffc107';
      case 'avanzado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getNivelIcon = (nivel) => {
    switch(nivel) {
      case 'principiante': return '🌱';
      case 'intermedio': return '🌿';
      case 'avanzado': return '🌳';
      default: return '📚';
    }
  };

  if (loading) {
    return (
      <div className="cursos-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando cursos disponibles...</p>
        </div>
      </div>
    );
  }

  const cursosFiltrados = filtrarCursos();

  return (
    <div className="cursos-page">
      <main className="cursos-content">
        {/* Banner de advertencia MVP */}
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <div>
            <strong style={{ color: '#856404', display: 'block', marginBottom: '4px' }}>
              Versión MVP - Datos de Ejemplo
            </strong>
            <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
              Esta página muestra cursos de ejemplo. La conexión con proveedores de cursos reales 
              se implementará en una futura actualización. Por ahora, puedes explorar la interfaz 
              y ver cómo funcionará el sistema de cursos.
            </p>
          </div>
        </div>

        <div className="cursos-header">
          <h1>📚 Cursos y Talleres</h1>
          <p>Desarrolla nuevas habilidades con cursos seleccionados para jóvenes profesionales</p>
          
          <div className="stats-banner">
            <div className="stat-item">
              <strong>{cursos.length}</strong>
              <span>Cursos disponibles</span>
            </div>
            <div className="stat-item">
              <strong>15+</strong>
              <span>Áreas de estudio</span>
            </div>
            <div className="stat-item">
              <strong>Gratuitos</strong>
              <span>y de pago</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtro-grupo">
            <label>Área de estudio:</label>
            <select 
              value={filtros.area} 
              onChange={(e) => setFiltros({...filtros, area: e.target.value})}
            >
              <option value="todas">Todas las áreas</option>
              <option value="tecnologia">Tecnología</option>
              <option value="diseño">Diseño</option>
              <option value="marketing">Marketing</option>
              <option value="negocios">Negocios</option>
              <option value="idiomas">Idiomas</option>
              <option value="finanzas">Finanzas</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Nivel:</label>
            <select 
              value={filtros.nivel} 
              onChange={(e) => setFiltros({...filtros, nivel: e.target.value})}
            >
              <option value="todos">Todos los niveles</option>
              <option value="principiante">🌱 Principiante</option>
              <option value="intermedio">🌿 Intermedio</option>
              <option value="avanzado">🌳 Avanzado</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Modalidad:</label>
            <select 
              value={filtros.modalidad} 
              onChange={(e) => setFiltros({...filtros, modalidad: e.target.value})}
            >
              <option value="todas">Todas</option>
              <option value="online">💻 Online</option>
              <option value="presencial">🏢 Presencial</option>
              <option value="hibrido">🔄 Híbrido</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Precio:</label>
            <select 
              value={filtros.precio} 
              onChange={(e) => setFiltros({...filtros, precio: e.target.value})}
            >
              <option value="todos">Todos</option>
              <option value="gratuito">💚 Gratuitos</option>
              <option value="pago">💰 De pago</option>
            </select>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className="cursos-grid">
          {cursosFiltrados.length === 0 ? (
            <div className="no-cursos">
              <h3>No se encontraron cursos</h3>
              <p>Intenta con otros filtros para encontrar el curso perfecto para ti</p>
            </div>
          ) : (
            cursosFiltrados.map(curso => (
              <div key={curso.id} className="curso-card">
                <div className="curso-image">
                  <img 
                    src={curso.imagen} 
                    alt={curso.titulo}
                    onError={(e) => {
                      e.target.src = '/img/default-course.jpg';
                    }}
                  />
                  <div className="curso-badges">
                    {curso.precio === 'gratuito' && (
                      <span className="badge gratuito">GRATIS</span>
                    )}
                    {curso.certificado && (
                      <span className="badge certificado">📜 Certificado</span>
                    )}
                  </div>
                </div>

                <div className="curso-content">
                  <div className="curso-header">
                    <h3>{curso.titulo}</h3>
                    <div className="curso-proveedor">{curso.proveedor}</div>
                  </div>

                  <p className="curso-descripcion">{curso.descripcion}</p>

                  <div className="curso-skills">
                    {curso.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                    {curso.skills.length > 3 && (
                      <span className="skill-tag more">+{curso.skills.length - 3}</span>
                    )}
                  </div>

                  <div className="curso-info">
                    <div className="info-row">
                      <span className="info-label">
                        {getNivelIcon(curso.nivel)} Nivel:
                      </span>
                      <span 
                        className="info-value nivel"
                        style={{ color: getNivelColor(curso.nivel) }}
                      >
                        {curso.nivel}
                      </span>
                    </div>
                    
                    <div className="info-row">
                      <span className="info-label">⏰ Duración:</span>
                      <span className="info-value">{curso.duracion}</span>
                    </div>
                    
                    <div className="info-row">
                      <span className="info-label">💻 Modalidad:</span>
                      <span className="info-value">{curso.modalidad}</span>
                    </div>
                    
                    {curso.precio === 'pago' && (
                      <div className="info-row">
                        <span className="info-label">💰 Precio:</span>
                        <span className="info-value precio">{curso.precio_valor}</span>
                      </div>
                    )}
                  </div>

                  <div className="curso-stats">
                    <div className="rating">
                      ⭐ {curso.rating} ({curso.estudiantes.toLocaleString()} estudiantes)
                    </div>
                  </div>

                  <button 
                    className="btn-ver-curso"
                    onClick={() => handleVerCurso(curso)}
                  >
                    Ver Curso
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Cursos;