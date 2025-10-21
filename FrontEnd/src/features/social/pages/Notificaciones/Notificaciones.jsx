import { useState } from 'react';
import { Bell, Check, MessageSquare, Heart, UserPlus, Briefcase, Filter } from 'lucide-react';
import styles from './Notificaciones.module.css';

/**
 * Página Notificaciones - Sistema de notificaciones
 * Lista de actividades y alertas del usuario
 */
const Notificaciones = () => {
  const [filter, setFilter] = useState('TODAS');

  // Mock data - preparado para backend
  const notificaciones = [
    { id: 1, tipo: 'LIKE', usuario: 'María González', accion: 'le dio like a tu post', tiempo: 'Hace 5 min', leida: false },
    { id: 2, tipo: 'COMENTARIO', usuario: 'Carlos Pérez', accion: 'comentó en tu publicación', tiempo: 'Hace 1 hora', leida: false },
    { id: 3, tipo: 'CONEXION', usuario: 'Ana Martínez', accion: 'aceptó tu solicitud de conexión', tiempo: 'Hace 2 horas', leida: true },
    { id: 4, tipo: 'OFERTA', usuario: 'Globant', accion: 'publicó una nueva oferta que te puede interesar', tiempo: 'Hace 3 horas', leida: true },
    { id: 5, tipo: 'POSTULACION', usuario: 'MercadoLibre', accion: 'actualizó el estado de tu postulación', tiempo: 'Ayer', leida: true }
  ];

  const getIcon = (tipo) => {
    switch(tipo) {
      case 'LIKE': return <Heart size={20} />;
      case 'COMENTARIO': return <MessageSquare size={20} />;
      case 'CONEXION': return <UserPlus size={20} />;
      case 'OFERTA': return <Briefcase size={20} />;
      case 'POSTULACION': return <Briefcase size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getColor = (tipo) => {
    switch(tipo) {
      case 'LIKE': return '#ff6b6b';
      case 'COMENTARIO': return '#4ecdc4';
      case 'CONEXION': return '#667eea';
      case 'OFERTA': return '#f9ca24';
      case 'POSTULACION': return '#95e1d3';
      default: return '#999';
    }
  };

  const filteredNotificaciones = filter === 'TODAS' 
    ? notificaciones 
    : filter === 'NO_LEIDAS'
      ? notificaciones.filter(n => !n.leida)
      : notificaciones.filter(n => n.tipo === filter);

  const unreadCount = notificaciones.filter(n => !n.leida).length;

  return (
    <div className={styles.notificacionesPage}>
      <header className={styles.header}>
        <div>
          <h1><Bell size={32} /> Notificaciones</h1>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount} sin leer</span>
          )}
        </div>
        <button className={styles.btnMarkAll}>
          <Check size={18} /> Marcar todas como leídas
        </button>
      </header>

      <div className={styles.filters}>
        <button 
          className={filter === 'TODAS' ? styles.active : ''}
          onClick={() => setFilter('TODAS')}
        >
          <Filter size={16} /> Todas
        </button>
        <button 
          className={filter === 'NO_LEIDAS' ? styles.active : ''}
          onClick={() => setFilter('NO_LEIDAS')}
        >
          No leídas
        </button>
        <button 
          className={filter === 'LIKE' ? styles.active : ''}
          onClick={() => setFilter('LIKE')}
        >
          <Heart size={16} /> Likes
        </button>
        <button 
          className={filter === 'COMENTARIO' ? styles.active : ''}
          onClick={() => setFilter('COMENTARIO')}
        >
          <MessageSquare size={16} /> Comentarios
        </button>
        <button 
          className={filter === 'CONEXION' ? styles.active : ''}
          onClick={() => setFilter('CONEXION')}
        >
          <UserPlus size={16} /> Conexiones
        </button>
      </div>

      <div className={styles.notificationsList}>
        {filteredNotificaciones.length === 0 ? (
          <div className={styles.empty}>
            <Bell size={48} />
            <h3>No hay notificaciones</h3>
            <p>Cuando tengas notificaciones aparecerán aquí</p>
          </div>
        ) : (
          filteredNotificaciones.map(notif => (
            <div 
              key={notif.id} 
              className={`${styles.notificationCard} ${!notif.leida ? styles.unread : ''}`}
            >
              <div 
                className={styles.icon}
                style={{ background: getColor(notif.tipo) }}
              >
                {getIcon(notif.tipo)}
              </div>
              <div className={styles.content}>
                <p>
                  <strong>{notif.usuario}</strong> {notif.accion}
                </p>
                <span className={styles.time}>{notif.tiempo}</span>
              </div>
              {!notif.leida && <div className={styles.unreadDot} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notificaciones;
