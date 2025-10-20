import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { Target, AlertTriangle, Star, Lightbulb, Clock, Users, Calendar, Trophy, DollarSign } from 'lucide-react';
import styles from './Desafios.module.css';
// import './Desafios.css'; // backup preserved

/**
 * Página de Desafíos
 * Accesible para todos los usuarios (menores y mayores de 18)
 * Los menores pueden participar pero con recompensas limitadas
 * 
 * ⚠️ ESTADO MVP: Esta página usa datos de ejemplo (mock data)
 * Los desafíos NO están conectados al backend en esta versión MVP
 * Funcionalidad completa se implementará en fase 2
 */
const Desafios = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [desafios, setDesafios] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    dificultad: 'todas',
    estado: 'disponibles'
  });

  useEffect(() => {
    loadDesafios();
  }, [user]);

  const loadDesafios = async () => {
    await withMinLoadingTime(async () => {
      // Simular carga de desafíos desde API
      setDesafios([
        {
          id: 1,
          titulo: 'Crea un Logo para StartUp Tech',
          empresa: 'InnovateTech',
          categoria: 'diseño',
          dificultad: 'facil',
          descripcion: 'Diseña un logo moderno para una startup de tecnología. Debe ser minimalista y memorable.',
          recompensa: {
            puntos: 150,
            dinero: user?.edad >= 18 ? '$5,000' : null,
            tipo: 'diseño'
          },
          tiempo_estimado: '2-4 horas',
          participantes: 23,
          fecha_limite: '2025-10-20',
          estado: 'disponible',
          tags: ['logo', 'branding', 'diseño gráfico']
        },
        {
          id: 2,
          titulo: 'Investigación de Mercado: Hábitos Gen Z',
          empresa: 'MarketingPro',
          categoria: 'investigacion',
          dificultad: 'medio',
          descripcion: 'Realiza una encuesta a 50 personas de 16-25 años sobre sus hábitos de consumo digital.',
          recompensa: {
            puntos: 200,
            dinero: user?.edad >= 18 ? '$8,000' : null,
            tipo: 'investigación'
          },
          tiempo_estimado: '1 semana',
          participantes: 12,
          fecha_limite: '2025-10-25',
          estado: 'disponible',
          tags: ['encuestas', 'marketing', 'análisis']
        },
        {
          id: 3,
          titulo: 'Video Tutorial: Introducción a React',
          empresa: 'EduTech',
          categoria: 'contenido',
          dificultad: 'medio',
          descripcion: 'Crea un video tutorial de 10-15 minutos explicando los conceptos básicos de React.',
          recompensa: {
            puntos: 300,
            dinero: user?.edad >= 18 ? '$12,000' : null,
            tipo: 'educativo'
          },
          tiempo_estimado: '3-5 días',
          participantes: 8,
          fecha_limite: '2025-10-30',
          estado: 'disponible',
          tags: ['video', 'programación', 'tutorial']
        },
        {
          id: 4,
          titulo: 'Optimización de Página Web',
          empresa: 'WebSolutions',
          categoria: 'desarrollo',
          dificultad: 'dificil',
          descripcion: 'Mejora la velocidad de carga de una página web. Requiere conocimientos de optimización web.',
          recompensa: {
            puntos: 500,
            dinero: user?.edad >= 18 ? '$20,000' : null,
            tipo: 'técnico'
          },
          tiempo_estimado: '1-2 semanas',
          participantes: 5,
          fecha_limite: '2025-11-05',
          estado: 'disponible',
          tags: ['optimización', 'performance', 'web development']
        }
      ]);
    });
  };

  const filtrarDesafios = () => {
    return desafios.filter(desafio => {
      const coincideCategoria = filtros.categoria === 'todos' || desafio.categoria === filtros.categoria;
      const coincideDificultad = filtros.dificultad === 'todas' || desafio.dificultad === filtros.dificultad;
      const coincideEstado = filtros.estado === 'todos' || desafio.estado === filtros.estado;
      
      return coincideCategoria && coincideDificultad && coincideEstado;
    });
  };

  const handleParticipar = (desafioId) => {
    navigate(`/desafios/${desafioId}`);
  };

  const getDificultadColor = (dificultad) => {
    switch(dificultad) {
      case 'facil': return '#28a745';
      case 'medio': return '#ffc107';
      case 'dificil': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getDificultadIcon = (dificultad) => {
    switch(dificultad) {
      case 'facil': return <Star size={16} fill="currentColor" />;
      case 'medio': return <><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></>;
      case 'dificil': return <><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></>;
      default: return <Star size={16} fill="currentColor" />;
    }
  };

  if (loading) {
    return (
      <div className={styles['desafios-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando desafíos...</p>
        </div>
      </div>
    );
  }

  const desafiosFiltrados = filtrarDesafios();

  return (
    <div className={styles['desafios-page']}>
      <main className={styles['desafios-content']}>
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
          <AlertTriangle size={24} color="#856404" />
          <div>
            <strong style={{ color: '#856404', display: 'block', marginBottom: '4px' }}>
              Versión MVP - Datos de Ejemplo
            </strong>
            <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
              Esta página muestra desafíos de ejemplo. La funcionalidad de participación real 
              se implementará en una futura actualización. Por ahora, puedes explorar la interfaz 
              y ver cómo funcionará el sistema de desafíos.
            </p>
          </div>
        </div>

  <div className={styles['desafios-header']}>
          <h1><Target size={32} /> Desafíos y Encargos</h1>
          <p>Completa tareas reales de empresas y gana puntos y experiencia</p>
          
          {user?.edad < 18 && (
            <div className={styles['age-info']}>
              <Lightbulb size={16} /> Como menor de 18 años, puedes participar en todos los desafíos y ganar puntos. 
              Las recompensas monetarias estarán disponibles cuando cumplas 18 años.
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className={styles['filtros-container']}>
          <div className={styles['filtro-grupo']}>
            <label>Categoría:</label>
            <select 
              value={filtros.categoria} 
              onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            >
              <option value="todos">Todas las categorías</option>
              <option value="diseño">Diseño</option>
              <option value="desarrollo">Desarrollo</option>
              <option value="marketing">Marketing</option>
              <option value="investigacion">Investigación</option>
              <option value="contenido">Contenido</option>
              <option value="traduccion">Traducción</option>
            </select>
          </div>

          <div className={styles['filtro-grupo']}>
            <label>Dificultad:</label>
            <select 
              value={filtros.dificultad} 
              onChange={(e) => setFiltros({...filtros, dificultad: e.target.value})}
            >
              <option value="todas">Todas</option>
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>

          <div className={styles['filtro-grupo']}>
            <label>Estado:</label>
            <select 
              value={filtros.estado} 
              onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
            >
              <option value="disponibles">Disponibles</option>
              <option value="todos">Todos</option>
              <option value="completados">Completados</option>
            </select>
          </div>
        </div>

        {/* Grid de desafíos */}
        <div className={styles['desafios-grid']}>
          {desafiosFiltrados.length === 0 ? (
            <div className={styles['no-desafios']}>
              <h3>No hay desafíos disponibles</h3>
              <p>Intenta con otros filtros o revisa más tarde</p>
            </div>
          ) : (
            desafiosFiltrados.map(desafio => (
              <div key={desafio.id} className={styles['desafio-card']}>
                <div className={styles['desafio-header']}>
                  <div className={styles['desafio-empresa']}>{desafio.empresa}</div>
                  <div 
                    className={styles['desafio-dificultad']}
                    style={{ color: getDificultadColor(desafio.dificultad) }}
                  >
                    {getDificultadIcon(desafio.dificultad)} {desafio.dificultad}
                  </div>
                </div>

                <h3 className={styles['desafio-titulo']}>{desafio.titulo}</h3>
                <p className={styles['desafio-descripcion']}>{desafio.descripcion}</p>

                <div className={styles['desafio-tags']}>
                  {desafio.tags.map(tag => (
                    <span key={tag} className={styles['tag']}>#{tag}</span>
                  ))}
                </div>

                <div className={styles['desafio-info']}>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Clock size={16} /> Tiempo:</span>
                    <span>{desafio.tiempo_estimado}</span>
                  </div>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Users size={16} /> Participantes:</span>
                    <span>{desafio.participantes}</span>
                  </div>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Calendar size={16} /> Límite:</span>
                    <span>{new Date(desafio.fecha_limite).toLocaleDateString('es-AR')}</span>
                  </div>
                </div>

                <div className={styles['desafio-recompensa']}>
                  <div className={styles['recompensa-puntos']}>
                    <Trophy size={16} /> {desafio.recompensa.puntos} puntos
                  </div>
                  {desafio.recompensa.dinero && (
                    <div className={styles['recompensa-dinero']}>
                      <DollarSign size={16} /> {desafio.recompensa.dinero}
                    </div>
                  )}
                  {!desafio.recompensa.dinero && user?.edad < 18 && (
                    <div className={styles['recompensa-futura']}>
                      <DollarSign size={16} /> Recompensa monetaria disponible a los 18+
                    </div>
                  )}
                </div>

                <button 
                  className={styles['btn-participar']}
                  onClick={() => handleParticipar(desafio.id)}
                >
                  Ver Desafío
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Desafios;