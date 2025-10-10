import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import PropTypes from 'prop-types';
import './LanguageSelector.css';

/**
 * Componente LanguageSelector reutilizable
 * Selector de idioma unificado para toda la aplicación
 * 
 * @example
 * <LanguageSelector />
 * <LanguageSelector variant="compact" />
 */
const LanguageSelector = ({
  variant = 'default',
  className = '',
}) => {
  const { language, changeLanguage } = useLanguage();

  const variantClass = variant !== 'default' ? `language-selector-${variant}` : '';
  const classes = ['language-selector', variantClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <button
        onClick={() => changeLanguage('es')}
        className={language === 'es' ? 'active' : ''}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={language === 'en' ? 'active' : ''}
        aria-label="Change to English"
      >
        EN
      </button>
    </div>
  );
};

LanguageSelector.propTypes = {
  variant: PropTypes.oneOf(['default', 'compact', 'pills']),
  className: PropTypes.string,
};

export default LanguageSelector;
