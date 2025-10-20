import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import { 
  Home, Users, Briefcase, BookOpen, Target, MessageCircle, Bell, Search,
  User, Settings, FileText, Compass, Lightbulb, Star, LogOut
} from 'lucide-react';
import styles from './Header.module.css';
// import './Header.css'; // antiguo: comentado tras migración a CSS Modules

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
      search: 'Buscar...',
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
      search: 'Search...',
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
    <header className={styles.header}>
      <div className={styles['header-container']}>
        {/* Logo */}
        <Link to={user ? "/feed" : "/"} className={styles.logo}>
          <img src="/img/logo.png" alt="JobPath" />
          <span>JobPath</span>
        </Link>

        {/* Barra de búsqueda */}
        {user && (
          <form className={styles['search-form']} onSubmit={handleSearch}>
            <div className={styles['search-container']}>
              <span className={styles['search-icon']}><Search size={16} /></span>
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles['search-input']}
              />
            </div>
          </form>
        )}

        {/* Navegación principal para usuarios autenticados */}
        {user ? (
          <nav className={styles['main-nav']}>
            <Link 
              to="/feed" 
              className={`${styles['nav-item']} ${isActivePath('/feed') ? styles.active : ''}`}
              title={t.home}
            >
              <span className={styles['nav-icon']}><Home size={20} /></span>
              <span className={styles['nav-label']}>{t.home}</span>
            </Link>
            
            <Link 
              to="/red" 
              className={`${styles['nav-item']} ${isActivePath('/red') ? styles.active : ''}`}
              title={t.network}
            >
              <span className={styles['nav-icon']}><Users size={20} /></span>
              <span className={styles['nav-label']}>{t.network}</span>
            </Link>
            
            {user.edad >= 18 && (
              <Link 
                to="/ofertas" 
                className={`${styles['nav-item']} ${isActivePath('/ofertas') ? styles.active : ''}`}
                title={t.jobs}
              >
                <span className={styles['nav-icon']}><Briefcase size={20} /></span>
                <span className={styles['nav-label']}>{t.jobs}</span>
              </Link>
            )}
            
            <Link 
              to="/cursos" 
              className={`${styles['nav-item']} ${isActivePath('/cursos') ? styles.active : ''}`}
              title={t.courses}
            >
              <span className={styles['nav-icon']}><BookOpen size={20} /></span>
              <span className={styles['nav-label']}>{t.courses}</span>
            </Link>
            
            <Link 
              to="/desafios" 
              className={`${styles['nav-item']} ${isActivePath('/desafios') ? styles.active : ''}`}
              title={t.challenges}
            >
              <span className={styles['nav-icon']}><Target size={20} /></span>
              <span className={styles['nav-label']}>{t.challenges}</span>
            </Link>
            
            <Link 
              to="/mensajes" 
              className={`${styles['nav-item']} ${isActivePath('/mensajes') ? styles.active : ''}`}
              title={t.messages}
            >
              <span className={styles['nav-icon']}><MessageCircle size={20} /></span>
              <span className={styles['nav-label']}>{t.messages}</span>
            </Link>
            
            <Link 
              to="/notificaciones" 
              className={`${styles['nav-item']} ${isActivePath('/notificaciones') ? styles.active : ''}`}
              title={t.notifications}
            >
              <span className={styles['nav-icon']}><Bell size={20} /></span>
              <span className={styles['nav-label']}>{t.notifications}</span>
              <span className={styles['notification-badge']}>3</span>
            </Link>
          </nav>
        ) : (
          // Navegación para usuarios no autenticados
          <nav className={`${styles['guest-nav']} ${isMenuOpen ? styles['nav-open'] : ''}`}>
            <Link to="/" className={styles['nav-link']}>Inicio</Link>
            <Link to="/about" className={styles['nav-link']}>Nosotros</Link>
            <Link to="/companias" className={styles['nav-link']}>Empresas</Link>
            <Link to="/jovenes" className={styles['nav-link']}>Jóvenes</Link>
          </nav>
        )}

        {/* Acciones del usuario */}
        <div className={styles['header-actions']}>
          <button
            className={styles['language-toggle']}
            onClick={toggleLanguage}
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            {language === 'es' ? '\ud83c\uddfa\ud83c\uddf8' : '\ud83c\uddea\ud83c\uddf8'}
          </button>

          {user ? (
            <div className={styles['user-menu']} ref={dropdownRef}>
              <button onClick={toggleDropdown} className={styles['profile-link']}>
                <img
                  src={user.avatar || '/img/usuario.png'}
                  alt={user.name || 'Usuario'}
                  className={styles['user-avatar']}
                />
                <span className={styles['user-name']}>{user.name || t.profile}</span>
              </button>
              <div className={`${styles['dropdown-menu']} ${isDropdownOpen ? styles['dropdown-open'] : ''}`}>
                <Link to="/perfil" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <User size={18} />
                  <span>Ver perfil</span>
                </Link>
                <Link to="/configuracion" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <Settings size={18} />
                  <span>Configuración</span>
                </Link>
                <Link to="/mis-cursos" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <BookOpen size={18} />
                  <span>Mis cursos</span>
                </Link>
                <Link to="/mis-desafios" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <Target size={18} />
                  <span>Mis desafíos</span>
                </Link>
                {user.edad >= 18 && (
                  <Link to="/mis-postulaciones" className={styles['dropdown-item']} onClick={closeDropdown}>
                    <FileText size={18} />
                    <span>Mis postulaciones</span>
                  </Link>
                )}
                <hr className={styles['dropdown-divider']} />
                <Link to="/orientacion-vocacional" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <Compass size={18} />
                  <span>Orientación vocacional</span>
                </Link>
                <Link to="/consejos" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <Lightbulb size={18} />
                  <span>Consejos</span>
                </Link>
                <Link to="/suscripciones" className={styles['dropdown-item']} onClick={closeDropdown}>
                  <Star size={18} />
                  <span>Suscripciones</span>
                </Link>
                <hr className={styles['dropdown-divider']} />
                <button onClick={handleLogout} className={`${styles['dropdown-item']} ${styles.logout}`}>
                  <LogOut size={18} />
                  <span>{t.logout}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={styles['auth-buttons']}>
              <Link to="/login" className={styles['login-btn']}>{t.login}</Link>
              <Link to="/register" className={styles['register-btn']}>{t.register}</Link>
            </div>
          )}
        </div>

        {/* Menú móvil toggle */}
        <button className={styles['mobile-menu-toggle']} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
