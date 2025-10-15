import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Cerrar dropdown cuando cambia la ruta (navegación)
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Textos en diferentes idiomas
  const texts = {
    es: {
      search: 'Buscar personas, empresas, cursos...',
      home: 'Inicio',
      network: 'Red',
      jobs: 'Empleos',
      courses: 'Cursos',
      challenges: 'Desafíos',
      messages: 'Mensajes',
      notifications: 'Notificaciones',
      profile: 'Perfil',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      logout: 'Cerrar Sesión',
      backToPublic: 'Volver al sitio público'
    },
    en: {
      search: 'Search people, companies, courses...',
      home: 'Home',
      network: 'Network',
      jobs: 'Jobs',
      courses: 'Courses',
      challenges: 'Challenges',
      messages: 'Messages',
      notifications: 'Notifications',
      profile: 'Profile',
      login: 'Log In',
      register: 'Sign Up',
      logout: 'Log Out',
      backToPublic: 'Back to public site'
    }
  };

  const t = texts[language];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to={user ? "/feed" : "/"} className="logo">
          <img src="/img/logo.png" alt="JobPath" />
          <span>JobPath</span>
        </Link>

        {/* Barra de búsqueda */}
        {user && (
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        )}

        {/* Navegación principal para usuarios autenticados */}
        {user ? (
          <nav className="main-nav">
            <Link 
              to="/feed" 
              className={`nav-item ${isActivePath('/feed') ? 'active' : ''}`}
              title={t.home}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-label">{t.home}</span>
            </Link>
            
            <Link 
              to="/red" 
              className={`nav-item ${isActivePath('/red') ? 'active' : ''}`}
              title={t.network}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">{t.network}</span>
            </Link>
            
            {user.edad >= 18 && (
              <Link 
                to="/ofertas" 
                className={`nav-item ${isActivePath('/ofertas') ? 'active' : ''}`}
                title={t.jobs}
              >
                <span className="nav-icon">💼</span>
                <span className="nav-label">{t.jobs}</span>
              </Link>
            )}
            
            <Link 
              to="/cursos" 
              className={`nav-item ${isActivePath('/cursos') ? 'active' : ''}`}
              title={t.courses}
            >
              <span className="nav-icon">📚</span>
              <span className="nav-label">{t.courses}</span>
            </Link>
            
            <Link 
              to="/desafios" 
              className={`nav-item ${isActivePath('/desafios') ? 'active' : ''}`}
              title={t.challenges}
            >
              <span className="nav-icon">🎯</span>
              <span className="nav-label">{t.challenges}</span>
            </Link>
            
            <Link 
              to="/mensajes" 
              className={`nav-item ${isActivePath('/mensajes') ? 'active' : ''}`}
              title={t.messages}
            >
              <span className="nav-icon">💬</span>
              <span className="nav-label">{t.messages}</span>
            </Link>
            
            <Link 
              to="/notificaciones" 
              className={`nav-item ${isActivePath('/notificaciones') ? 'active' : ''}`}
              title={t.notifications}
            >
              <span className="nav-icon">🔔</span>
              <span className="nav-label">{t.notifications}</span>
              <span className="notification-badge">3</span>
            </Link>
          </nav>
        ) : (
          // Navegación para usuarios no autenticados
          <nav className={`guest-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/about" className="nav-link">Nosotros</Link>
            <Link to="/companias" className="nav-link">Empresas</Link>
            <Link to="/jovenes" className="nav-link">Jóvenes</Link>
          </nav>
        )}

        {/* Acciones del usuario */}
        <div className="header-actions">
          <button 
            className="language-toggle"
            onClick={toggleLanguage}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {language === 'es' ? '🇺🇸' : '🇪🇸'}
          </button>

          {user ? (
            <div className="user-menu" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="profile-link">
                <img 
                  src={user.avatar || "/img/usuario.png"} 
                  alt={user.name || "Usuario"} 
                  className="user-avatar"
                />
                <span className="user-name">{user.name || t.profile}</span>
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? 'dropdown-open' : ''}`}>
                <Link to="/perfil" className="dropdown-item" onClick={closeDropdown}>
                  <span>👤</span>
                  <span>Ver perfil</span>
                </Link>
                <Link to="/configuracion" className="dropdown-item" onClick={closeDropdown}>
                  <span>⚙️</span>
                  <span>Configuración</span>
                </Link>
                <Link to="/mis-cursos" className="dropdown-item" onClick={closeDropdown}>
                  <span>📚</span>
                  <span>Mis cursos</span>
                </Link>
                <Link to="/desafios" className="dropdown-item" onClick={closeDropdown}>
                  <span>🎯</span>
                  <span>Desafíos</span>
                </Link>
                <hr className="dropdown-divider" />
                <Link to="/orientacion-vocacional" className="dropdown-item" onClick={closeDropdown}>
                  <span>🧭</span>
                  <span>Orientación vocacional</span>
                </Link>
                <Link to="/consejos" className="dropdown-item" onClick={closeDropdown}>
                  <span>💡</span>
                  <span>Consejos</span>
                </Link>
                <Link to="/suscripciones" className="dropdown-item" onClick={closeDropdown}>
                  <span>⭐</span>
                  <span>Suscripciones</span>
                </Link>
                <hr className="dropdown-divider" />
                <button onClick={handleLogout} className="dropdown-item logout">
                  <span>🚪</span>
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">{t.login}</Link>
              <Link to="/register" className="register-btn">{t.register}</Link>
            </div>
          )}
        </div>

        {/* Menú móvil toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
