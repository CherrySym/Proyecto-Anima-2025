import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import PropTypes from 'prop-types';
import styles from './LanguageSelector.module.css';
// import './LanguageSelector.css'; // backup preserved as LanguageSelector.css (commented)

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

  const variantClass = variant !== 'default' ? styles[`language-selector-${variant}`] : '';
  const classes = [styles['language-selector'], variantClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <button
        onClick={() => changeLanguage('es')}
        className={language === 'es' ? styles['active'] : ''}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={language === 'en' ? styles['active'] : ''}
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
