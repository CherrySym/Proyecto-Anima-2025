import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { getCursos, guardarCurso, quitarCursoGuardado } from '../../services/cursosService';
import { BookOpen, Sprout, Leaf, TreePine, ScrollText, Clock, Monitor, DollarSign, Star, Building2, Bookmark, BookmarkCheck } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './Cursos.module.css';
// import './Cursos.css'; // backup preserved as commented file

/**
 * Página de Cursos y Talleres
 * Accesible para todos los usuarios
 * Muestra cursos externos y capacitaciones
 */
const Cursos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [toast, setToast] = useState(null);
  const [filtros, setFiltros] = useState({
    area: 'todas',
    nivel: 'todos',
    proveedor: 'todos'
  });

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    await withMinLoadingTime(async () => {
      try {
        const filtrosAPI = {
          area: filtros.area !== 'todas' ? filtros.area : undefined,
          nivel: filtros.nivel !== 'todos' ? filtros.nivel : undefined,
          proveedor: filtros.proveedor !== 'todos' ? filtros.proveedor : undefined
        };
        
        const data = await getCursos(filtrosAPI);
        setCursos(data);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
        setCursos([]);
      }
    });
  };

  const filtrarCursos = () => {
    return cursos.filter(curso => {
      const coincideArea = filtros.area === 'todas' || curso.area === filtros.area;
      // Normalizar nivel para comparación (case-insensitive)
      const coincideNivel = filtros.nivel === 'todos' || 
        curso.nivel?.toLowerCase() === filtros.nivel.toLowerCase();
      const coincideProveedor = filtros.proveedor === 'todos' || curso.proveedor === filtros.proveedor;
      
      return coincideArea && coincideNivel && coincideProveedor;
    });
  };

  const handleVerCurso = (curso) => {
    // Abrir en nueva pestaña
    window.open(curso.url, '_blank');
  };

  const handleToggleGuardar = async (cursoId, yaGuardado) => {
    if (!user) {
      alert('Debes iniciar sesión para guardar cursos');
      return;
    }

    try {
      if (yaGuardado) {
        await quitarCursoGuardado(cursoId);
        setToast({ message: 'Curso eliminado del perfil', type: 'success' });
      } else {
        await guardarCurso(cursoId);
        setToast({ message: 'Curso guardado en tu perfil', type: 'success' });
      }
      
      // Actualizar solo el estado del curso sin recargar toda la lista
      setCursos(prevCursos => 
        prevCursos.map(curso => 
          curso.id === cursoId 
            ? { ...curso, guardado: !yaGuardado }
            : curso
        )
      );
    } catch (error) {
      console.error('Error al guardar/quitar curso:', error);
      setToast({ 
        message: error.error || 'Error al procesar la solicitud', 
        type: 'error' 
      });
    }
  };

  const getNivelColor = (nivel) => {
    const normalized = nivel?.toLowerCase();
    switch(normalized) {
      case 'principiante': return '#28a745';
      case 'intermedio': return '#ffc107';
      case 'avanzado': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getNivelIcon = (nivel) => {
    const normalized = nivel?.toLowerCase();
    switch(normalized) {
      case 'principiante': return <Sprout size={16} />;
      case 'intermedio': return <Leaf size={16} />;
      case 'avanzado': return <TreePine size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  if (loading) {
    return (
      <div className={styles['cursos-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando cursos disponibles...</p>
        </div>
      </div>
    );
  }

  const cursosFiltrados = filtrarCursos();

    return (
      <div className={styles['cursos-page']}>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <main className={styles['cursos-content']}>
  <div className={styles['cursos-header']}>
          <h1><BookOpen size={32} /> Cursos y Talleres</h1>
          <p>Desarrolla nuevas habilidades con cursos seleccionados para jóvenes profesionales</p>
          
          <div className={styles['stats-banner']}>
            <div className={styles['stat-item']}>
              <strong>{cursos.length}</strong>
              <span>Cursos disponibles</span>
            </div>
            <div className={styles['stat-item']}>
              <strong>15+</strong>
              <span>Áreas de estudio</span>
            </div>
            <div className={styles['stat-item']}>
              <strong>Gratuitos</strong>
              <span>y de pago</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className={styles['filtros-container']}>
          <div className={styles['filtro-grupo']}>
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

          <div className={styles['filtro-grupo']}>
            <label>Nivel:</label>
            <select 
              value={filtros.nivel} 
              onChange={(e) => setFiltros({...filtros, nivel: e.target.value})}
            >
              <option value="todos">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <div className={styles['filtro-grupo']}>
            <label>Proveedor:</label>
            <select 
              value={filtros.proveedor} 
              onChange={(e) => setFiltros({...filtros, proveedor: e.target.value})}
            >
              <option value="todos">Todos</option>
              <option value="freeCodeCamp">freeCodeCamp</option>
              <option value="Codecademy">Codecademy</option>
              <option value="Udemy">Udemy</option>
              <option value="Coursera">Coursera</option>
              <option value="Google">Google</option>
              <option value="HubSpot">HubSpot</option>
              <option value="Kaggle">Kaggle</option>
            </select>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className={styles['cursos-grid']}>
          {cursosFiltrados.length === 0 ? (
            <div className={styles['no-cursos']}>
              <h3>No se encontraron cursos</h3>
              <p>Intenta con otros filtros para encontrar el curso perfecto para ti</p>
            </div>
          ) : (
            cursosFiltrados.map(curso => (
              <div key={curso.id} className={styles['curso-card']}>
                <div className={styles['curso-image']}>
                  {curso.imagen ? (
                    <img 
                      src={curso.imagen} 
                      alt={curso.titulo}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={styles['curso-image-placeholder']}
                    style={{ display: curso.imagen ? 'none' : 'flex' }}
                  >
                    <BookOpen size={48} />
                  </div>
                  <div className={styles['curso-badges']}>
                    {(!curso.costo || curso.costo === 0) && (
                      <span className={`${styles['badge']} ${styles['gratuito']}`}>GRATIS</span>
                    )}
                  </div>
                </div>

                <div className={styles['curso-content']}>
                  <div className={styles['curso-header']}>
                    <h3>{curso.titulo}</h3>
                    <div className={styles['curso-proveedor']}>{curso.proveedor}</div>
                  </div>

                  <p className={styles['curso-descripcion']}>{curso.descripcion}</p>

                  <div className={styles['curso-info']}>
                    <div className={styles['info-row']}>
                      <span className={styles['info-label']}>
                        {getNivelIcon(curso.nivel)} Nivel:
                      </span>
                      <span 
                        className={`${styles['info-value']} ${styles['nivel']}`}
                        style={{ color: getNivelColor(curso.nivel) }}
                      >
                        {curso.nivel}
                      </span>
                    </div>
                    
                    <div className={styles['info-row']}>
                      <span className={styles['info-label']}><Clock size={16} /> Duración:</span>
                      <span className={styles['info-value']}>{curso.duracion || 'Variable'}</span>
                    </div>
                    
                    <div className={styles['info-row']}>
                      <span className={styles['info-label']}><BookOpen size={16} /> Área:</span>
                      <span className={styles['info-value']}>{curso.area}</span>
                    </div>
                    
                    {curso.costo && curso.costo > 0 && (
                      <div className={styles['info-row']}>
                        <span className={styles['info-label']}><DollarSign size={16} /> Precio:</span>
                        <span className={`${styles['info-value']} ${styles['precio']}`}>${curso.costo}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles['curso-actions']}>
                    <button 
                      className={styles['btn-ver-curso']}
                      onClick={() => handleVerCurso(curso)}
                    >
                      Ver Curso
                    </button>
                    
                    {user && (
                      <button 
                        className={`${styles['btn-guardar']} ${curso.guardado ? styles['guardado'] : ''}`}
                        onClick={() => handleToggleGuardar(curso.id, curso.guardado)}
                        title={curso.guardado ? 'Quitar de guardados' : 'Guardar curso'}
                      >
                        {curso.guardado ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      </button>
                    )}
                  </div>
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