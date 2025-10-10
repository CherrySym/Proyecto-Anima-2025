import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

/**
 * Componente Card reutilizable
 * Tarjeta con estilos consistentes para ofertas, cursos, etc.
 * 
 * @example
 * <Card hoverable shadow="md">
 *   <h3>Título</h3>
 *   <p>Contenido de la tarjeta</p>
 * </Card>
 */
const Card = ({
  children,
  hoverable = false,
  shadow = 'sm',
  padding = 'lg',
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  const baseClass = 'card';
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const shadowClass = shadow !== 'sm' ? `card-shadow-${shadow}` : '';
  const paddingClass = padding !== 'lg' ? `p-${padding}` : '';

  const classes = [
    baseClass,
    hoverClass,
    shadowClass,
    paddingClass,
    className
  ].filter(Boolean).join(' ');

  const cardStyle = {
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      style={cardStyle}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
  shadow: PropTypes.oneOf(['sm', 'md', 'lg']),
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Card;
