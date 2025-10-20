import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

/**
 * Componente Button reutilizable
 * Usa las clases del sistema unificado de botones en App.css
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  block = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const blockClass = block ? 'btn-block' : '';
  const iconOnlyClass = !children && icon ? 'btn-icon' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    blockClass,
    iconOnlyClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-sm" />
          {children && <span>Cargando...</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span style={{ marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === 'right' && <span style={{ marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
    'warning',
    'success',
    'back'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
