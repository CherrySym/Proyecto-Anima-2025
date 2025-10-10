import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Desafios.css';

/**
 * Página de Desafíos
 * Accesible para todos los usuarios (menores y mayores de 18)
 * Los menores pueden participar pero con recompensas limitadas
 */
const Desafios = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [desafios, setDesafios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    dificultad: 'todas',
    estado: 'disponibles'
  });

  useEffect(() => {
    // Simular carga de desafíos desde API
    setTimeout(() => {
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
      setLoading(false);
    }, 800);
  }, [user]);

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
      case 'facil': return '⭐';
      case 'medio': return '⭐⭐';
      case 'dificil': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  if (loading) {
    return (
      <div className="desafios-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando desafíos...</p>
        </div>
      </div>
    );
  }

  const desafiosFiltrados = filtrarDesafios();

  return (
    <div className="desafios-page">
      <main className="desafios-content">
        <div className="desafios-header">
          <h1>🎯 Desafíos y Encargos</h1>
          <p>Completa tareas reales de empresas y gana puntos y experiencia</p>
          
          {user?.edad < 18 && (
            <div className="age-info">
              💡 Como menor de 18 años, puedes participar en todos los desafíos y ganar puntos. 
              Las recompensas monetarias estarán disponibles cuando cumplas 18 años.
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtro-grupo">
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

          <div className="filtro-grupo">
            <label>Dificultad:</label>
            <select 
              value={filtros.dificultad} 
              onChange={(e) => setFiltros({...filtros, dificultad: e.target.value})}
            >
              <option value="todas">Todas</option>
              <option value="facil">⭐ Fácil</option>
              <option value="medio">⭐⭐ Medio</option>
              <option value="dificil">⭐⭐⭐ Difícil</option>
            </select>
          </div>

          <div className="filtro-grupo">
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
        <div className="desafios-grid">
          {desafiosFiltrados.length === 0 ? (
            <div className="no-desafios">
              <h3>No hay desafíos disponibles</h3>
              <p>Intenta con otros filtros o revisa más tarde</p>
            </div>
          ) : (
            desafiosFiltrados.map(desafio => (
              <div key={desafio.id} className="desafio-card">
                <div className="desafio-header">
                  <div className="desafio-empresa">{desafio.empresa}</div>
                  <div 
                    className="desafio-dificultad"
                    style={{ color: getDificultadColor(desafio.dificultad) }}
                  >
                    {getDificultadIcon(desafio.dificultad)} {desafio.dificultad}
                  </div>
                </div>

                <h3 className="desafio-titulo">{desafio.titulo}</h3>
                <p className="desafio-descripcion">{desafio.descripcion}</p>

                <div className="desafio-tags">
                  {desafio.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>

                <div className="desafio-info">
                  <div className="info-item">
                    <span className="label">⏱️ Tiempo:</span>
                    <span>{desafio.tiempo_estimado}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">👥 Participantes:</span>
                    <span>{desafio.participantes}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">📅 Límite:</span>
                    <span>{new Date(desafio.fecha_limite).toLocaleDateString('es-AR')}</span>
                  </div>
                </div>

                <div className="desafio-recompensa">
                  <div className="recompensa-puntos">
                    🏆 {desafio.recompensa.puntos} puntos
                  </div>
                  {desafio.recompensa.dinero && (
                    <div className="recompensa-dinero">
                      💰 {desafio.recompensa.dinero}
                    </div>
                  )}
                  {!desafio.recompensa.dinero && user?.edad < 18 && (
                    <div className="recompensa-futura">
                      💰 Recompensa monetaria disponible a los 18+
                    </div>
                  )}
                </div>

                <button 
                  className="btn-participar"
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