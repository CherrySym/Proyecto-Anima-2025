import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import { FileText, BarChart3, AlertTriangle, MapPin, PartyPopper } from 'lucide-react';
import styles from './MisPostulaciones.module.css';
// import './MisPostulaciones.css'; // comentado: archivo original inactivado como backup

/**
 * Página Mis Postulaciones
 * Muestra todas las postulaciones del usuario actual
 * con sus estados: PENDIENTE, ACEPTADA, RECHAZADA
 */
const MisPostulaciones = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [postulaciones, setPostulaciones] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('TODAS');

  useEffect(() => {
    loadPostulaciones();
  }, []);

  const loadPostulaciones = async () => {
    await withMinLoadingTime(async () => {
      try {
        setError(null);
        const data = await ofertasService.getMisPostulaciones();
        setPostulaciones(data);
      } catch (err) {
        setError('No se pudieron cargar tus postulaciones. Intenta de nuevo más tarde.');
      }
    });
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      PENDIENTE: { color: '#ffc107', icon: '⏳', text: 'Pendiente' },
      ACEPTADA: { color: '#28a745', icon: '✅', text: 'Aceptada' },
      RECHAZADA: { color: '#dc3545', icon: '❌', text: 'Rechazada' }
    };
    return badges[estado] || { color: '#6c757d', icon: '❓', text: estado };
  };

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  const postulacionesFiltradas = filtroEstado === 'TODAS' 
    ? postulaciones 
    : postulaciones.filter(p => p.estado === filtroEstado);

  const contadores = {
    total: postulaciones.length,
    pendientes: postulaciones.filter(p => p.estado === 'PENDIENTE').length,
    aceptadas: postulaciones.filter(p => p.estado === 'ACEPTADA').length,
    rechazadas: postulaciones.filter(p => p.estado === 'RECHAZADA').length
  };

  if (loading) {
    return (
      <div className={styles['mis-postulaciones-page']}>
        <div className={styles['loading-container']}>
          <div className="loading-spinner"></div>
          <p>Cargando tus postulaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['mis-postulaciones-page']}>
      <div className={styles['page-header']}>
        <div className={styles['header-content']}>
          <h1><FileText size={32} /> Mis Postulaciones</h1>
          <p>Gestiona y da seguimiento a todas tus solicitudes de empleo</p>
        </div>

        {/* Estadísticas */}
        <div className={styles['stats-grid']}>
          <div className={`${styles['stat-card']} ${styles.total}`}>
            <div className={styles['stat-icon']}><BarChart3 size={24} /></div>
            <div className={styles['stat-info']}>
              <div className={styles['stat-value']}>{contadores.total}</div>
              <div className={styles['stat-label']}>Total</div>
            </div>
          </div>
          <div className={`${styles['stat-card']} ${styles.pendiente}`}>
            <div className={styles['stat-icon']}>⏳</div>
            <div className={styles['stat-info']}>
              <div className={styles['stat-value']}>{contadores.pendientes}</div>
              <div className={styles['stat-label']}>Pendientes</div>
            </div>
          </div>
          <div className={`${styles['stat-card']} ${styles.aceptada}`}>
            <div className={styles['stat-icon']}>✅</div>
            <div className={styles['stat-info']}>
              <div className={styles['stat-value']}>{contadores.aceptadas}</div>
              <div className={styles['stat-label']}>Aceptadas</div>
            </div>
          </div>
          <div className={`${styles['stat-card']} ${styles.rechazada}`}>
            <div className={styles['stat-icon']}>❌</div>
            <div className={styles['stat-info']}>
              <div className={styles['stat-value']}>{contadores.rechazadas}</div>
              <div className={styles['stat-label']}>Rechazadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className={styles['filters-bar']}>
        <div className={styles['filter-buttons']}>
          <button 
            className={`${styles['filter-btn']} ${filtroEstado === 'TODAS' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('TODAS')}
          >
            Todas ({contadores.total})
          </button>
          <button 
            className={`${styles['filter-btn']} ${filtroEstado === 'PENDIENTE' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('PENDIENTE')}
          >
            Pendientes ({contadores.pendientes})
          </button>
          <button 
            className={`${styles['filter-btn']} ${filtroEstado === 'ACEPTADA' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('ACEPTADA')}
          >
            Aceptadas ({contadores.aceptadas})
          </button>
          <button 
            className={`${styles['filter-btn']} ${filtroEstado === 'RECHAZADA' ? styles.active : ''}`}
            onClick={() => setFiltroEstado('RECHAZADA')}
          >
            Rechazadas ({contadores.rechazadas})
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className={styles['postulaciones-content']}>
        {error && (
          <div className={styles['error-message']}>
            <span className={styles['error-icon']}><AlertTriangle size={24} /></span>
            <p>{error}</p>
            <button onClick={loadPostulaciones} className={styles['retry-btn']}>
              Reintentar
            </button>
          </div>
        )}

        {!error && postulacionesFiltradas.length === 0 && (
          <div className={styles['empty-state']}>
            <div className={styles['empty-icon']}>📭</div>
            <h3>No hay postulaciones</h3>
            <p>
              {filtroEstado === 'TODAS' 
                ? 'Aún no te has postulado a ninguna oferta. ¡Explora las ofertas disponibles!'
                : `No tienes postulaciones con estado "${getEstadoBadge(filtroEstado).text}"`
              }
            </p>
            <button 
              onClick={() => navigate('/ofertas')}
              className={styles['btn-primary']}
            >
              Ver Ofertas Disponibles
            </button>
          </div>
        )}

        {!error && postulacionesFiltradas.length > 0 && (
          <div className={styles['postulaciones-list']}>
            {postulacionesFiltradas.map((postulacion) => {
              const badge = getEstadoBadge(postulacion.estado);
              const oferta = postulacion.oferta || {};
              const empresa = oferta.empresa || {};

              return (
                <div key={postulacion.id} className={styles['postulacion-card']}>
                  <div className={styles['card-header']}>
                    <div className={styles['empresa-info']}>
                      <div className={styles['empresa-logo']}>
                        <img 
                          src={empresa.logo || '/img/usuario.png'} 
                          alt={empresa.nombre || 'Empresa'}
                        />
                      </div>
                      <div className={styles['empresa-details']}>
                        <h3>{oferta.titulo || 'Oferta sin título'}</h3>
                        <p className={styles['empresa-nombre']}>{empresa.nombre || 'Empresa'}</p>
                      </div>
                    </div>
                    <div 
                      className={styles['estado-badge']}
                      style={{ backgroundColor: badge.color }}
                    >
                      <span className={styles['badge-icon']}>{badge.icon}</span>
                      <span className={styles['badge-text']}>{badge.text}</span>
                    </div>
                  </div>

                  <div className={styles['card-body']}>
                    <div className={styles['info-grid']}>
                      <div className={styles['info-item']}>
                        <span className={styles['info-label']}>📅 Fecha de postulación:</span>
                        <span className={styles['info-value']}>{formatFecha(postulacion.createdAt)}</span>
                      </div>
                      <div className={styles['info-item']}>
                        <span className={styles['info-label']}>💼 Tipo:</span>
                        <span className={styles['info-value']}>{oferta.tipo || 'No especificado'}</span>
                      </div>
                      <div className={styles['info-item']}>
                        <span className={styles['info-label']}><MapPin size={14} /> Ubicación:</span>
                        <span className={styles['info-value']}>{oferta.ubicacion || 'No especificada'}</span>
                      </div>
                      {oferta.salario && (
                        <div className={styles['info-item']}>
                          <span className={styles['info-label']}>💰 Salario:</span>
                          <span className={styles['info-value']}>{oferta.salario}</span>
                        </div>
                      )}
                    </div>

                    {oferta.descripcion && (
                      <div className={styles['oferta-descripcion']}>
                        <p>{oferta.descripcion.substring(0, 150)}...</p>
                      </div>
                    )}
                  </div>

                  <div className={styles['card-footer']}>
                    <button 
                      onClick={() => navigate(`/ofertas/${oferta.id}`)}
                      className={styles['btn-secondary']}
                    >
                      Ver Oferta Completa
                    </button>
                    
                    {postulacion.estado === 'ACEPTADA' && (
                      <div className={styles['success-message']}>
                        <span className={styles['success-icon']}><PartyPopper size={18} /></span>
                        <span>¡Felicidades! La empresa se pondrá en contacto contigo.</span>
                      </div>
                    )}
                    
                    {postulacion.estado === 'RECHAZADA' && (
                      <div className={styles['info-message']}>
                        <span className={styles['info-icon']}>💡</span>
                        <span>No te desanimes. Sigue postulándote a más ofertas.</span>
                      </div>
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

export default MisPostulaciones;
