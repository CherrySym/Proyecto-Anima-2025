import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Componente BackButton reutilizable
 * Botón estandarizado para volver a la página anterior
 * 
 * @example
 * <BackButton />
 * <BackButton to="/home" label="Volver al inicio" />
 */
const BackButton = ({
  to = null,
  label = '← Volver',
  onClick = null,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="back"
      size="sm"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {label}
    </Button>
  );
};

BackButton.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BackButton;
