import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import { Palette, Code, PenTool, Search, TrendingUp, Video, Clock, Send, CheckCircle, XCircle, BarChart3, Building2, Play, Eye, Target } from 'lucide-react';
import './MisDesafios.css';

/**
 * Página Mis Desafíos
 * Muestra SOLO los desafíos en los que el usuario está participando
 * Diferente de /desafios que muestra TODOS los desafíos disponibles
 */
const MisDesafios = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [desafiosParticipando, setDesafiosParticipando] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [filtroEstado, setFiltroEstado] = useState('todos'); // todos, en-progreso, enviados, completados

  useEffect(() => {
    loadMisDesafios();
  }, []);

  const loadMisDesafios = async () => {
    await withMinLoadingTime(async () => {
      // Simular carga de desafíos del usuario desde API
      // En producción: fetch(`/api/users/${user.id}/challenges`)
      setDesafiosParticipando([
        {
          id: 1,
          titulo: 'Crea un Logo para StartUp Tech',
          empresa: 'InnovateTech',
          categoria: 'diseño',
          dificultad: 'facil',
          descripcion: 'Diseña un logo moderno para una startup de tecnología.',
          recompensa: {
            puntos: 150,
            dinero: user?.edad >= 18 ? '$5,000' : null,
            tipo: 'diseño'
          },
          tiempo_estimado: '2-4 horas',
          fecha_limite: '2025-10-20',
          tags: ['logo', 'branding', 'diseño gráfico'],
          // Datos de participación
          fechaInscripcion: '2024-10-05',
          estado: 'en-progreso',
          progreso: 60,
          ultimaActividad: '2024-10-08',
          tiempoInvertido: '2.5 horas',
          archivosSubidos: 3,
          comentarios: 2
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
          tiempo_estimado: '1 semana',
          fecha_limite: '2025-10-28',
          tags: ['video', 'programación', 'educación'],
          // Datos de participación
          fechaInscripcion: '2024-09-28',
          estado: 'enviado',
          progreso: 100,
          fechaEnvio: '2024-10-07',
          ultimaActividad: '2024-10-07',
          tiempoInvertido: '12 horas',
          archivosSubidos: 1,
          comentarios: 5,
          enRevision: true
        },
        {
          id: 7,
          titulo: 'Desarrolla un Chatbot con IA',
          empresa: 'AIStartup',
          categoria: 'tecnologia',
          dificultad: 'dificil',
          descripcion: 'Crea un chatbot inteligente usando APIs de IA para atención al cliente.',
          recompensa: {
            puntos: 500,
            dinero: user?.edad >= 18 ? '$25,000' : null,
            tipo: 'desarrollo'
          },
          tiempo_estimado: '2-3 semanas',
          fecha_limite: '2025-11-05',
          tags: ['IA', 'chatbot', 'Python', 'API'],
          // Datos de participación
          fechaInscripcion: '2024-10-02',
          estado: 'en-progreso',
          progreso: 35,
          ultimaActividad: '2024-10-09',
          tiempoInvertido: '8 horas',
          archivosSubidos: 2,
          comentarios: 1
        },
        {
          id: 15,
          titulo: 'Propuesta de Marketing para E-commerce',
          empresa: 'ShopOnline',
          categoria: 'marketing',
          dificultad: 'medio',
          descripcion: 'Desarrolla una estrategia de marketing digital completa para un e-commerce.',
          recompensa: {
            puntos: 250,
            dinero: user?.edad >= 18 ? '$10,000' : null,
            tipo: 'marketing'
          },
          tiempo_estimado: '1 semana',
          fecha_limite: '2024-09-30',
          tags: ['marketing', 'e-commerce', 'redes sociales'],
          // Datos de participación
          fechaInscripcion: '2024-09-10',
          estado: 'completado',
          progreso: 100,
          fechaEnvio: '2024-09-28',
          fechaCompletado: '2024-10-01',
          ultimaActividad: '2024-10-01',
          tiempoInvertido: '15 horas',
          archivosSubidos: 5,
          comentarios: 8,
          puntuacion: 95,
          recompensaRecibida: true,
          feedback: 'Excelente trabajo, muy completo y creativo.'
        }
      ]);
    });
  };

  const getCategoriaInfo = (categoria) => {
    const categorias = {
      diseño: { color: '#e91e63', icon: <Palette size={16} />, label: 'Diseño' },
      tecnologia: { color: '#2196f3', icon: <Code size={16} />, label: 'Tecnología' },
      contenido: { color: '#ff9800', icon: <PenTool size={16} />, label: 'Contenido' },
      investigacion: { color: '#9c27b0', icon: <Search size={16} />, label: 'Investigación' },
      marketing: { color: '#4caf50', icon: <TrendingUp size={16} />, label: 'Marketing' },
      video: { color: '#f44336', icon: <Video size={16} />, label: 'Video' }
    };
    return categorias[categoria] || categorias.tecnologia;
  };

  const getDificultadBadge = (dificultad) => {
    const badges = {
      facil: { color: '#4caf50', text: 'Fácil' },
      medio: { color: '#ff9800', text: 'Medio' },
      dificil: { color: '#f44336', text: 'Difícil' }
    };
    return badges[dificultad] || badges.medio;
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'en-progreso': { color: '#2196f3', icon: <Clock size={14} />, text: 'En Progreso' },
      enviado: { color: '#ff9800', icon: <Send size={14} />, text: 'Enviado' },
      completado: { color: '#4caf50', icon: <CheckCircle size={14} />, text: 'Completado' },
      rechazado: { color: '#f44336', icon: <XCircle size={14} />, text: 'Rechazado' }
    };
    return badges[estado] || badges['en-progreso'];
  };

  const filtrarDesafios = () => {
    if (filtroEstado === 'todos') return desafiosParticipando;
    return desafiosParticipando.filter(d => d.estado === filtroEstado);
  };

  const desafiosFiltrados = filtrarDesafios();

  const contadores = {
    total: desafiosParticipando.length,
    enProgreso: desafiosParticipando.filter(d => d.estado === 'en-progreso').length,
    enviados: desafiosParticipando.filter(d => d.estado === 'enviado').length,
    completados: desafiosParticipando.filter(d => d.estado === 'completado').length
  };

  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diferencia = Math.ceil((limite - hoy) / (1000 * 60 * 60 * 24));
    if (diferencia < 0) return 'Vencido';
    if (diferencia === 0) return 'Hoy';
    if (diferencia === 1) return 'Mañana';
    return `${diferencia} días`;
  };

  if (loading) {
    return (
      <div className="mis-desafios-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tus desafíos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-desafios-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1><Target size={32} /> Mis Desafíos</h1>
          <p>Gestiona tus desafíos activos y revisa tu progreso</p>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon"><BarChart3 size={24} /></div>
            <div className="stat-info">
              <div className="stat-value">{contadores.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card en-progreso">
            <div className="stat-icon"><Clock size={24} /></div>
            <div className="stat-info">
              <div className="stat-value">{contadores.enProgreso}</div>
              <div className="stat-label">En Progreso</div>
            </div>
          </div>
          <div className="stat-card enviado">
            <div className="stat-icon"><Send size={24} /></div>
            <div className="stat-info">
              <div className="stat-value">{contadores.enviados}</div>
              <div className="stat-label">Enviados</div>
            </div>
          </div>
          <div className="stat-card completado">
            <div className="stat-icon"><CheckCircle size={24} /></div>
            <div className="stat-info">
              <div className="stat-value">{contadores.completados}</div>
              <div className="stat-label">Completados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Filtrar por estado:</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filtroEstado === 'todos' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('todos')}
            >
              Todos ({contadores.total})
            </button>
            <button
              className={`filter-btn ${filtroEstado === 'en-progreso' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('en-progreso')}
            >
              En Progreso ({contadores.enProgreso})
            </button>
            <button
              className={`filter-btn ${filtroEstado === 'enviado' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('enviado')}
            >
              Enviados ({contadores.enviados})
            </button>
            <button
              className={`filter-btn ${filtroEstado === 'completado' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('completado')}
            >
              Completados ({contadores.completados})
            </button>
          </div>
        </div>

        <button 
          className="btn-explorar"
          onClick={() => navigate('/desafios')}
        >
          🔍 Explorar más desafíos
        </button>
      </div>

      {/* Lista de desafíos */}
      <div className="desafios-content">
        {desafiosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No tienes desafíos {filtroEstado !== 'todos' ? `en estado "${filtroEstado}"` : ''}</h3>
            <p>Explora los desafíos disponibles y comienza a participar</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/desafios')}
            >
              Ver desafíos disponibles
            </button>
          </div>
        ) : (
          <div className="desafios-grid">
            {desafiosFiltrados.map(desafio => {
              const categoriaInfo = getCategoriaInfo(desafio.categoria);
              const dificultadBadge = getDificultadBadge(desafio.dificultad);
              const estadoBadge = getEstadoBadge(desafio.estado);
              const diasRestantes = calcularDiasRestantes(desafio.fecha_limite);

              return (
                <div key={desafio.id} className={`desafio-card ${desafio.estado}`}>
                  {/* Header del desafío */}
                  <div className="desafio-header" style={{ borderLeftColor: categoriaInfo.color }}>
                    <div className="desafio-meta">
                      <span className="categoria-badge" style={{ backgroundColor: categoriaInfo.color }}>
                        {categoriaInfo.icon} {categoriaInfo.label}
                      </span>
                      <span className="dificultad-badge" style={{ backgroundColor: dificultadBadge.color }}>
                        {dificultadBadge.text}
                      </span>
                      <span className="estado-badge" style={{ backgroundColor: estadoBadge.color }}>
                        {estadoBadge.icon} {estadoBadge.text}
                      </span>
                    </div>
                    <h3>{desafio.titulo}</h3>
                    <p className="empresa">
                      <span className="empresa-icon"><Building2 size={14} /></span>
                      {desafio.empresa}
                    </p>
                  </div>

                  {/* Progreso */}
                  <div className="progreso-section">
                    <div className="progreso-header">
                      <span>Progreso</span>
                      <span className="progreso-porcentaje">{desafio.progreso}%</span>
                    </div>
                    <div className="progreso-bar">
                      <div 
                        className="progreso-fill" 
                        style={{ 
                          width: `${desafio.progreso}%`,
                          backgroundColor: categoriaInfo.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Información de participación */}
                  <div className="participacion-info">
                    <div className="info-item">
                      <span className="info-icon">📅</span>
                      <div className="info-text">
                        <span className="info-label">Inscrito</span>
                        <span className="info-value">{new Date(desafio.fechaInscripcion).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">⏰</span>
                      <div className="info-text">
                        <span className="info-label">Tiempo límite</span>
                        <span className="info-value" style={{ 
                          color: diasRestantes === 'Vencido' ? '#f44336' : 
                                 diasRestantes === 'Hoy' || diasRestantes === 'Mañana' ? '#ff9800' : '#666'
                        }}>
                          {diasRestantes}
                        </span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">⌚</span>
                      <div className="info-text">
                        <span className="info-label">Invertido</span>
                        <span className="info-value">{desafio.tiempoInvertido}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📎</span>
                      <div className="info-text">
                        <span className="info-label">Archivos</span>
                        <span className="info-value">{desafio.archivosSubidos}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recompensa */}
                  <div className="recompensa-section">
                    <span className="recompensa-label">🎁 Recompensa:</span>
                    <div className="recompensa-items">
                      <span className="puntos">{desafio.recompensa.puntos} pts</span>
                      {desafio.recompensa.dinero && (
                        <span className="dinero">{desafio.recompensa.dinero}</span>
                      )}
                    </div>
                  </div>

                  {/* Feedback si está completado */}
                  {desafio.estado === 'completado' && desafio.feedback && (
                    <div className="feedback-section">
                      <div className="feedback-header">
                        <span>💬 Feedback de la empresa</span>
                        {desafio.puntuacion && (
                          <span className="puntuacion">⭐ {desafio.puntuacion}/100</span>
                        )}
                      </div>
                      <p className="feedback-text">{desafio.feedback}</p>
                      {desafio.recompensaRecibida && (
                        <div className="recompensa-recibida">
                          ✅ Recompensa recibida
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mensaje de revisión si está enviado */}
                  {desafio.estado === 'enviado' && desafio.enRevision && (
                    <div className="revision-message">
                      <span className="revision-icon">👀</span>
                      <span>Tu trabajo está siendo revisado por la empresa</span>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="desafio-actions">
                    {desafio.estado === 'en-progreso' && (
                      <>
                        <button className="btn-continue">
                          <Play size={16} /> Continuar trabajando
                        </button>
                        <button className="btn-submit">
                          <Send size={16} /> Enviar trabajo
                        </button>
                      </>
                    )}
                    {desafio.estado === 'enviado' && (
                      <button className="btn-view">
                        <Eye size={16} /> Ver detalles
                      </button>
                    )}
                    {desafio.estado === 'completado' && (
                      <button className="btn-view">
                        <CheckCircle size={16} /> Ver resultados
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisDesafios;
