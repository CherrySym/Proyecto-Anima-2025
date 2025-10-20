import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { GraduationCap } from 'lucide-react';
import styles from './MisCursos.module.css';
// import './MisCursos.css'; // comentado: backup

/**
 * Página Mis Cursos
 * Muestra SOLO los cursos en los que el usuario está inscrito
 * Diferente de /cursos que muestra TODOS los cursos disponibles
 */
const MisCursos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [filtroEstado, setFiltroEstado] = useState('todos'); // todos, en-progreso, completados

  useEffect(() => {
    loadCursosInscritos();
  }, []);

  const loadCursosInscritos = async () => {
    await withMinLoadingTime(async () => {
      // Simular carga de cursos inscritos del usuario desde API
      // En producción: fetch(`/api/users/${user.id}/enrolled-courses`)
      setCursosInscritos([
        {
          id: 1,
          titulo: 'Introducción a la Programación con Python',
          descripcion: 'Aprende los fundamentos de la programación con uno de los lenguajes más populares.',
          area: 'tecnologia',
          nivel: 'principiante',
          modalidad: 'online',
          duracion: '6 semanas',
          proveedor: 'CodeAcademy',
          rating: 4.8,
          imagen: '/img/curso-python.jpg',
          url: 'https://example.com/python-course',
          skills: ['Python', 'Programación', 'Variables', 'Funciones'],
          certificado: true,
          // Datos de inscripción del usuario
          fechaInscripcion: '2024-09-15',
          progreso: 75,
          completado: false,
          ultimaActividad: '2024-10-08',
          tiempoInvertido: '18 horas',
          leccionActual: 'Lección 12 de 16',
          proximaLeccion: 'Funciones avanzadas'
        },
        {
          id: 2,
          titulo: 'Diseño UX/UI para Principiantes',
          descripcion: 'Domina los principios del diseño de experiencia de usuario y interfaces.',
          area: 'diseño',
          nivel: 'principiante',
          modalidad: 'online',
          duracion: '4 semanas',
          proveedor: 'DesignHub',
          rating: 4.6,
          imagen: '/img/curso-ux.jpg',
          url: 'https://example.com/ux-course',
          skills: ['UX Design', 'UI Design', 'Figma', 'Prototipado'],
          certificado: true,
          // Datos de inscripción
          fechaInscripcion: '2024-08-01',
          progreso: 100,
          completado: true,
          fechaCompletado: '2024-09-20',
          ultimaActividad: '2024-09-20',
          tiempoInvertido: '32 horas',
          leccionActual: 'Completado',
          certificadoObtenido: true
        },
        {
          id: 5,
          titulo: 'Excel Avanzado para Negocios',
          descripcion: 'Domina Excel con fórmulas complejas, macros y análisis de datos.',
          area: 'negocios',
          nivel: 'intermedio',
          modalidad: 'online',
          duracion: '5 semanas',
          proveedor: 'BusinessPro',
          rating: 4.5,
          imagen: '/img/curso-excel.jpg',
          url: 'https://example.com/excel-course',
          skills: ['Excel', 'Macros', 'Análisis de datos', 'VBA'],
          certificado: true,
          // Datos de inscripción
          fechaInscripcion: '2024-10-01',
          progreso: 45,
          completado: false,
          ultimaActividad: '2024-10-09',
          tiempoInvertido: '8 horas',
          leccionActual: 'Lección 6 de 12',
          proximaLeccion: 'Tablas dinámicas avanzadas'
        },
        {
          id: 8,
          titulo: 'Fundamentos de Marketing Digital',
          descripcion: 'Aprende las bases del marketing digital y redes sociales.',
          area: 'marketing',
          nivel: 'principiante',
          modalidad: 'online',
          duracion: '3 semanas',
          proveedor: 'MarketingPro',
          rating: 4.7,
          imagen: '/img/curso-marketing.jpg',
          url: 'https://example.com/marketing-course',
          skills: ['SEO', 'Redes Sociales', 'Google Ads', 'Analytics'],
          certificado: false,
          // Datos de inscripción
          fechaInscripcion: '2024-09-28',
          progreso: 30,
          completado: false,
          ultimaActividad: '2024-10-07',
          tiempoInvertido: '5 horas',
          leccionActual: 'Lección 3 de 9',
          proximaLeccion: 'Estrategias de contenido'
        }
      ]);
    });
  };

  const filtrarCursos = () => {
    switch (filtroEstado) {
      case 'en-progreso':
        return cursosInscritos.filter(curso => !curso.completado && curso.progreso > 0);
      case 'completados':
        return cursosInscritos.filter(curso => curso.completado);
      default:
        return cursosInscritos;
    }
  };

  const handleContinuarCurso = (curso) => {
    // En producción: abrir el curso en la plataforma del proveedor
    window.open(curso.url, '_blank');
  };

  const handleDescargarCertificado = (curso) => {
    // En producción: generar y descargar certificado
    alert(`Descargando certificado de: ${curso.titulo}`);
  };

  const handleExploreMasCursos = () => {
    navigate('/cursos');
  };

  if (loading) {
    return (
      <div className={styles['mis-cursos-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando tus cursos...</p>
        </div>
      </div>
    );
  }

  const cursosFiltrados = filtrarCursos();
  const estadisticas = {
    total: cursosInscritos.length,
    enProgreso: cursosInscritos.filter(c => !c.completado && c.progreso > 0).length,
    completados: cursosInscritos.filter(c => c.completado).length,
    horasTotales: cursosInscritos.reduce((acc, c) => acc + parseInt(c.tiempoInvertido), 0)
  };

  return (
    <div className={styles['mis-cursos-page']}>
      <main className={styles['mis-cursos-content']}>
        {/* Header */}
        <div className={styles['page-header']}>
          <div className={styles['header-content']}>
            <h1>📚 Mis Cursos</h1>
            <p>Continúa tu aprendizaje y alcanza tus metas profesionales</p>
          </div>
          <button 
            className={styles['btn-explorar']}
            onClick={handleExploreMasCursos}
          >
            + Explorar más cursos
          </button>
        </div>

        {/* Estadísticas */}
  <div className={styles['estadisticas-cursos']}>
          <div className={styles['stat-card']}>
            <span className={styles['stat-icon']}>📖</span>
            <div className={styles['stat-info']}>
              <strong>{estadisticas.total}</strong>
              <span>Cursos inscritos</span>
            </div>
          </div>
          <div className={styles['stat-card']}>
            <span className={styles['stat-icon']}>⏳</span>
            <div className={styles['stat-info']}>
              <strong>{estadisticas.enProgreso}</strong>
              <span>En progreso</span>
            </div>
          </div>
          <div className={styles['stat-card']}>
            <span className={styles['stat-icon']}>✅</span>
            <div className={styles['stat-info']}>
              <strong>{estadisticas.completados}</strong>
              <span>Completados</span>
            </div>
          </div>
          <div className={styles['stat-card']}>
            <span className={styles['stat-icon']}>⏰</span>
            <div className={styles['stat-info']}>
              <strong>{estadisticas.horasTotales}h</strong>
              <span>Tiempo invertido</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className={styles['filtros-section']}>
          <button 
            className={`${styles['filtro-btn']} ${filtroEstado === 'todos' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('todos')}
          >
            Todos ({cursosInscritos.length})
          </button>
          <button 
            className={`${styles['filtro-btn']} ${filtroEstado === 'en-progreso' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('en-progreso')}
          >
            En progreso ({estadisticas.enProgreso})
          </button>
          <button 
            className={`${styles['filtro-btn']} ${filtroEstado === 'completados' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('completados')}
          >
            Completados ({estadisticas.completados})
          </button>
        </div>

        {/* Lista de cursos */}
        {cursosFiltrados.length === 0 ? (
          <div className={styles['empty-state']}>
            <span className={styles['empty-icon']}>📚</span>
            <h3>No hay cursos en esta categoría</h3>
            <p>Explora nuestro catálogo y inscríbete en un curso</p>
            <button className={styles['btn-explorar']} onClick={handleExploreMasCursos}>
              Explorar cursos
            </button>
          </div>
        ) : (
          <div className={styles['cursos-list']}>
            {cursosFiltrados.map(curso => (
              <div key={curso.id} className={styles['curso-inscrito-card']}>
                <div className={styles['curso-image']}>
                  <img 
                    src={curso.imagen} 
                    alt={curso.titulo}
                    onError={(e) => {
                      e.target.src = '/img/default-course.png';
                    }}
                  />
                  {curso.completado && (
                    <div className={styles['completion-badge']}>
                      <span>✓</span>
                      Completado
                    </div>
                  )}
                </div>

                <div className={styles['curso-content']}>
                  <div className={styles['curso-header']}>
                    <div>
                      <h3>{curso.titulo}</h3>
                      <p className={styles['curso-proveedor']}>
                        {curso.proveedor} • {curso.duracion} • {curso.nivel}
                      </p>
                    </div>
                    <div className={styles['curso-rating']}>⭐ {curso.rating}</div>
                  </div>

                  <p className={styles['curso-descripcion']}>{curso.descripcion}</p>

                  {/* Progreso */}
                  <div className={styles['progreso-section']}>
                    <div className={styles['progreso-header']}>
                      <span className={styles['progreso-label']}>
                        {curso.completado ? 'Completado' : curso.leccionActual}
                      </span>
                      <span className={styles['progreso-porcentaje']}>{curso.progreso}%</span>
                    </div>
                    <div className={styles['progress-bar']}>
                      <div 
                        className={styles['progress-fill']} 
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className={styles['curso-meta']}>
                    <span>⏰ {curso.tiempoInvertido}</span>
                    <span>📅 Última actividad: {curso.ultimaActividad}</span>
                    {curso.certificado && curso.completado && (
                      <span className={styles['certificado-disponible']}><GraduationCap size={14} /> Certificado disponible</span>
                    )}
                  </div>

                  {/* Skills */}
                  <div className={styles['skills-list']}>
                    {curso.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className={styles['skill-tag']}>{skill}</span>
                    ))}
                    {curso.skills.length > 3 && (
                      <span className={`${styles['skill-tag']} ${styles.more}`}>+{curso.skills.length - 3}</span>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className={styles['curso-actions']}>
                    {curso.completado ? (
                      <>
                        <button 
                          className={styles['btn-repasar']}
                          onClick={() => handleContinuarCurso(curso)}
                        >
                          Repasar curso
                        </button>
                        {curso.certificadoObtenido && (
                          <button 
                            className={styles['btn-certificado']}
                            onClick={() => handleDescargarCertificado(curso)}
                          >
                            <GraduationCap size={16} /> Descargar certificado
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button 
                          className={styles['btn-continuar']}
                          onClick={() => handleContinuarCurso(curso)}
                        >
                          Continuar aprendiendo
                        </button>
                        {curso.proximaLeccion && (
                          <span className={styles['proxima-leccion']}>
                            Siguiente: {curso.proximaLeccion}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MisCursos;
