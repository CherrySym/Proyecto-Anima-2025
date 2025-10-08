import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './Header.css';

/**
 * Componente Header - Barra de navegación principal
 * Migrado desde el header HTML original
 * Usa React Router para la navegación en lugar de enlaces directos
 */
const Header = ({ showFullNav = false, title = "Anima" }) => {
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();

  // Función para determinar si un enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="logo">
        <img src="/img/logo.png" alt="Anima logo" />
        {title}
      </div>
      
      {showFullNav && (
        <nav>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Principal
          </Link>
          <Link to="/home" className={isActive('/home') ? 'active' : ''}>
            Inicio
          </Link>
          <Link to="/jovenes" className={isActive('/jovenes') ? 'active' : ''}>
            Jóvenes
          </Link>
          <Link to="/companias" className={isActive('/companias') ? 'active' : ''}>
            Compañías
          </Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>
            Hacerca De..
          </Link>
          <Link to="/perfil" className={isActive('/perfil') ? 'active' : ''}>
            Perfil
          </Link>
        </nav>
      )}

      {!showFullNav && (
        <nav>
          <Link to="/home" className={isActive('/home') ? 'active' : ''}>
            PRINCIPAL
          </Link>
          <Link to="/login" className={isActive('/login') ? 'active' : ''}>
            INICIAR SESIÓN
          </Link>
          <Link to="/orientacion" className={isActive('/orientacion') ? 'active' : ''}>
            ORIENTACIÓN VOCACIONAL
          </Link>
        </nav>
      )}

      {/* Botones de idioma - Migrado de la funcionalidad translate.js */}
      <nav className="language-nav">
        <button 
          onClick={() => changeLanguage('es')}
          className={language === 'es' ? 'active-lang' : ''}
        >
          Español
        </button>
        <button 
          onClick={() => changeLanguage('en')}
          className={language === 'en' ? 'active-lang' : ''}
        >
          English
        </button>
      </nav>
    </header>
  );
};

export default Header;
