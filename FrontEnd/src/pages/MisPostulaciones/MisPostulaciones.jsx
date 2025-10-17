import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import './MisPostulaciones.css';

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
      <div className="mis-postulaciones-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tus postulaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-postulaciones-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📋 Mis Postulaciones</h1>
          <p>Gestiona y da seguimiento a todas tus solicitudes de empleo</p>
        </div>

        {/* Estadísticas */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{contadores.total}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <div className="stat-card pendiente">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-value">{contadores.pendientes}</div>
              <div className="stat-label">Pendientes</div>
            </div>
          </div>
          <div className="stat-card aceptada">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{contadores.aceptadas}</div>
              <div className="stat-label">Aceptadas</div>
            </div>
          </div>
          <div className="stat-card rechazada">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <div className="stat-value">{contadores.rechazadas}</div>
              <div className="stat-label">Rechazadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-bar">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filtroEstado === 'TODAS' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('TODAS')}
          >
            Todas ({contadores.total})
          </button>
          <button 
            className={`filter-btn ${filtroEstado === 'PENDIENTE' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('PENDIENTE')}
          >
            Pendientes ({contadores.pendientes})
          </button>
          <button 
            className={`filter-btn ${filtroEstado === 'ACEPTADA' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('ACEPTADA')}
          >
            Aceptadas ({contadores.aceptadas})
          </button>
          <button 
            className={`filter-btn ${filtroEstado === 'RECHAZADA' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('RECHAZADA')}
          >
            Rechazadas ({contadores.rechazadas})
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="postulaciones-content">
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={loadPostulaciones} className="retry-btn">
              Reintentar
            </button>
          </div>
        )}

        {!error && postulacionesFiltradas.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No hay postulaciones</h3>
            <p>
              {filtroEstado === 'TODAS' 
                ? 'Aún no te has postulado a ninguna oferta. ¡Explora las ofertas disponibles!'
                : `No tienes postulaciones con estado "${getEstadoBadge(filtroEstado).text}"`
              }
            </p>
            <button 
              onClick={() => navigate('/ofertas')}
              className="btn-primary"
            >
              Ver Ofertas Disponibles
            </button>
          </div>
        )}

        {!error && postulacionesFiltradas.length > 0 && (
          <div className="postulaciones-list">
            {postulacionesFiltradas.map((postulacion) => {
              const badge = getEstadoBadge(postulacion.estado);
              const oferta = postulacion.oferta || {};
              const empresa = oferta.empresa || {};

              return (
                <div key={postulacion.id} className="postulacion-card">
                  <div className="card-header">
                    <div className="empresa-info">
                      <div className="empresa-logo">
                        <img 
                          src={empresa.logo || '/img/usuario.png'} 
                          alt={empresa.nombre || 'Empresa'}
                        />
                      </div>
                      <div className="empresa-details">
                        <h3>{oferta.titulo || 'Oferta sin título'}</h3>
                        <p className="empresa-nombre">{empresa.nombre || 'Empresa'}</p>
                      </div>
                    </div>
                    <div 
                      className="estado-badge"
                      style={{ backgroundColor: badge.color }}
                    >
                      <span className="badge-icon">{badge.icon}</span>
                      <span className="badge-text">{badge.text}</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">📅 Fecha de postulación:</span>
                        <span className="info-value">{formatFecha(postulacion.createdAt)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">💼 Tipo:</span>
                        <span className="info-value">{oferta.tipo || 'No especificado'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">📍 Ubicación:</span>
                        <span className="info-value">{oferta.ubicacion || 'No especificada'}</span>
                      </div>
                      {oferta.salario && (
                        <div className="info-item">
                          <span className="info-label">💰 Salario:</span>
                          <span className="info-value">{oferta.salario}</span>
                        </div>
                      )}
                    </div>

                    {oferta.descripcion && (
                      <div className="oferta-descripcion">
                        <p>{oferta.descripcion.substring(0, 150)}...</p>
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <button 
                      onClick={() => navigate(`/ofertas/${oferta.id}`)}
                      className="btn-secondary"
                    >
                      Ver Oferta Completa
                    </button>
                    
                    {postulacion.estado === 'ACEPTADA' && (
                      <div className="success-message">
                        <span className="success-icon">🎉</span>
                        <span>¡Felicidades! La empresa se pondrá en contacto contigo.</span>
                      </div>
                    )}
                    
                    {postulacion.estado === 'RECHAZADA' && (
                      <div className="info-message">
                        <span className="info-icon">💡</span>
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
