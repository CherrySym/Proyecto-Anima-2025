import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

/**
 * Componente LoadingSpinner reutilizable
 * Spinner de carga consistente en toda la app
 * 
 * @example
 * <LoadingSpinner size="md" message="Cargando ofertas..." />
 */
const LoadingSpinner = ({
  size = 'md',
  message = '',
  centered = true,
  className = '',
}) => {
  const sizeClass = size !== 'md' ? `spinner-${size}` : '';
  const spinnerClasses = ['spinner', sizeClass].filter(Boolean).join(' ');

  const content = (
    <>
      <div className={`${spinnerClasses} ${className}`} />
      {message && <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{message}</p>}
    </>
  );

  if (centered) {
    return (
      <div className="loading-state">
        {content}
      </div>
    );
  }

  return content;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  message: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default LoadingSpinner;
