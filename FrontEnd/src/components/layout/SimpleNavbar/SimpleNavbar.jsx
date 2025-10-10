import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import './SimpleNavbar.css';

/**
 * SimpleNavbar - Navbar compartido con diseño del HTML original
 * Usado en las páginas públicas (Home, Jovenes, About, etc.)
 */
const SimpleNavbar = ({ title = 'Job Path' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const { user } = useAuth();
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  const texts = {
    es: {
      principal: 'Principal',
      inicio: 'Inicio',
      jovenes: 'Jóvenes',
      companias: 'Compañías',
      about: 'Acerca De',
      orientacion: 'Orientación',
      recursos: 'Recursos',
      consejos: 'Consejos',
      cvCarta: 'CV y Carta',
      entrevistas: 'Entrevistas',
      curriculum: 'Curriculum',
      contacto: 'Contacto',
      suscripciones: 'Suscripciones',
      login: 'Iniciar Sesión',
      profile: 'Mi Perfil',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      principal: 'Main',
      inicio: 'Home',
      jovenes: 'Young People',
      companias: 'Companies',
      about: 'About Us',
      orientacion: 'Guidance',
      recursos: 'Resources',
      consejos: 'Tips',
      cvCarta: 'CV & Letter',
      entrevistas: 'Interviews',
      curriculum: 'Resume',
      contacto: 'Contact',
      suscripciones: 'Subscriptions',
      login: 'Login',
      profile: 'My Profile',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  const isActive = (path) => location.pathname === path;

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowResourcesMenu(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowResourcesMenu(false);
    }, 300); // 300ms de delay antes de cerrar
    setHideTimeout(timeout);
  };

  return (
    <header className="simple-navbar">
      <h1 className="simple-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        {title}
      </h1>
      <nav className="simple-nav">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/home'); }}
          className={isActive('/home') ? 'active' : ''}
        >
          {t.inicio}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/jovenes'); }}
          className={isActive('/jovenes') ? 'active' : ''}
        >
          {t.jovenes}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/companias'); }}
          className={isActive('/companias') ? 'active' : ''}
        >
          {t.companias}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/about'); }}
          className={isActive('/about') ? 'active' : ''}
        >
          {t.about}
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/orientacion-vocacional'); }}
          className={isActive('/orientacion-vocacional') ? 'active' : ''}
        >
          {t.orientacion}
        </a>
        
        {/* Menú desplegable de Recursos */}
        <div 
          className="simple-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            className="dropdown-trigger"
          >
            {t.recursos} ▼
          </a>
          {showResourcesMenu && (
            <div 
              className="simple-dropdown-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/consejos'); setShowResourcesMenu(false); }}>
                📝 {t.consejos}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cv-y-carta'); setShowResourcesMenu(false); }}>
                📄 {t.cvCarta}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/entrevistas'); setShowResourcesMenu(false); }}>
                💼 {t.entrevistas}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/curriculum'); setShowResourcesMenu(false); }}>
                📋 {t.curriculum}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contacto'); setShowResourcesMenu(false); }}>
                📞 {t.contacto}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/suscripciones'); setShowResourcesMenu(false); }}>
                ⭐ {t.suscripciones}
              </a>
            </div>
          )}
        </div>
        
        {user ? (
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/feed'); }}
            className={isActive('/feed') ? 'active' : ''}
          >
            {t.profile}
          </a>
        ) : (
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/login'); }}
            className={isActive('/login') ? 'active' : ''}
          >
            {t.login}
          </a>
        )}
      </nav>
      <nav className="language-nav">
        <button onClick={() => changeLanguage('es')}>{t.spanish}</button>
        <button onClick={() => changeLanguage('en')}>{t.english}</button>
      </nav>
    </header>
  );
};

export default SimpleNavbar;
