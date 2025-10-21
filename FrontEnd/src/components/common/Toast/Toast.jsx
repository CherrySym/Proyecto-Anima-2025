import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

/**
 * Componente Toast para mostrar notificaciones temporales
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de toast: 'success' | 'error' | 'info'
 * @param {function} onClose - Función para cerrar el toast
 * @param {number} duration - Duración en ms antes de auto-cerrar (default: 3000)
 */
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      default:
        return <CheckCircle size={20} />;
    }
  };

  return (
    <div className={`${styles['toast']} ${styles[type]}`}>
      <div className={styles['toast-content']}>
        <span className={styles['toast-icon']}>{getIcon()}</span>
        <span className={styles['toast-message']}>{message}</span>
      </div>
      <button 
        className={styles['toast-close']}
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
