import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { getDesafios } from '../../services/desafiosService';
import { Target, Star, Lightbulb, Clock, Users, Calendar, Trophy, DollarSign } from 'lucide-react';
import styles from './Desafios.module.css';
// import './Desafios.css'; // backup preserved

/**
 * Página de Desafíos
 * Accesible para todos los usuarios (menores y mayores de 18)
 * Los menores pueden participar pero con recompensas limitadas
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDesafios = async () => {
    await withMinLoadingTime(async () => {
      try {
        const filtrosAPI = {
          categoria: filtros.categoria !== 'todos' ? filtros.categoria : undefined,
          dificultad: filtros.dificultad !== 'todas' ? filtros.dificultad : undefined,
          estado: filtros.estado !== 'todos' ? filtros.estado : undefined
        };
        
        const data = await getDesafios(filtrosAPI);
        setDesafios(data);
      } catch (error) {
        console.error('Error al cargar desafíos:', error);
        setDesafios([]);
      }
    });
  };

  const filtrarDesafios = () => {
    return desafios.filter(desafio => {
      // Normalizar valores para comparación (lowercase, sin acentos)
      const normalize = (str) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      const coincideCategoria = filtros.categoria === 'todos' || 
        normalize(desafio.categoria) === normalize(filtros.categoria);
      const coincideDificultad = filtros.dificultad === 'todas' || 
        normalize(desafio.dificultad) === normalize(filtros.dificultad);
      const coincideEstado = filtros.estado === 'todos' || 
        (filtros.estado === 'disponibles' && desafio.activo);
      
      return coincideCategoria && coincideDificultad && coincideEstado;
    });
  };

  const handleParticipar = (desafioId) => {
    navigate(`/desafio/${desafioId}`);
  };

  const getDificultadColor = (dificultad) => {
    const normalized = dificultad?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    switch(normalized) {
      case 'facil': return '#28a745';
      case 'medio': return '#ffc107';
      case 'dificil': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getDificultadIcon = (dificultad) => {
    const normalized = dificultad?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    switch(normalized) {
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
                  <div className={styles['desafio-empresa']}>{desafio.empresa?.nombre || 'Empresa'}</div>
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
                  <span className={styles['tag']}>#{desafio.categoria}</span>
                </div>

                <div className={styles['desafio-info']}>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Clock size={16} /> Categoría:</span>
                    <span>{desafio.categoria}</span>
                  </div>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Trophy size={16} /> Recompensa:</span>
                    <span>{desafio.recompensa}</span>
                  </div>
                  <div className={styles['info-item']}>
                    <span className={styles['label']}><Calendar size={16} /> Creado:</span>
                    <span>{new Date(desafio.fechaCreacion).toLocaleDateString('es-AR')}</span>
                  </div>
                </div>

                <div className={styles['desafio-recompensa']}>
                  <div className={styles['recompensa-puntos']}>
                    <Trophy size={16} /> {desafio.recompensa}
                  </div>
                  {user?.edad < 18 && (
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