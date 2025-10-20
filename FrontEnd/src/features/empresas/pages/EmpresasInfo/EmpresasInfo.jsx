import { useNavigate } from 'react-router-dom';
import { Building2, Users, Target, TrendingUp, Award, Search } from 'lucide-react';
import styles from './EmpresasInfo.module.css';
// import './EmpresasInfo.css'; // respaldo: comentado para migración a CSS Modules

/**
 * Página informativa para empresas
 * Presenta los beneficios y características de JobPath
 */
const EmpresasInfo = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register-empresa');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles['empresas-info-page']}>
      {/* Header */}
      <header className={styles['info-header']}>
        <h1 className={styles['logo']} onClick={() => navigate('/')}>JobPath</h1>
      </header>

      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-content']}>
          <h2>Encuentra el talento que necesitas</h2>
          <p className={styles['hero-subtitle']}>Conecta con jóvenes profesionales talentosos y motivados</p>
          <button onClick={handleRegister} className={styles['cta-primary']}>
            Registrar mi Empresa
          </button>
        </div>
      </section>

      {/* Beneficios compactos */}
      <section className={styles['benefits-section']}>
        <h3>¿Qué ofrece JobPath a tu empresa?</h3>
        <div className={styles['benefits-grid']}>
          <div className={styles['benefit-card']}>
            <Search size={32} className={styles['benefit-icon']} />
            <h4>Reclutamiento</h4>
            <p>Publica ofertas laborales</p>
          </div>
          <div className={styles['benefit-card']}>
            <Target size={32} className={styles['benefit-icon']} />
            <h4>Desafíos</h4>
            <p>Crea proyectos para talentos</p>
          </div>
          <div className={styles['benefit-card']}>
            <Users size={32} className={styles['benefit-icon']} />
            <h4>Talento Joven</h4>
            <p>Accede a perfiles verificados</p>
          </div>
          <div className={styles['benefit-card']}>
            <Building2 size={32} className={styles['benefit-icon']} />
            <h4>Visibilidad</h4>
            <p>Muestra tu marca empleadora</p>
          </div>
          <div className={styles['benefit-card']}>
            <TrendingUp size={32} className={styles['benefit-icon']} />
            <h4>Estadísticas</h4>
            <p>Analiza tus publicaciones</p>
          </div>
          <div className={styles['benefit-card']}>
            <Award size={32} className={styles['benefit-icon']} />
            <h4>Reputación</h4>
            <p>Construye tu comunidad</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles['cta-section']}>
        <h3>¿Lista tu empresa?</h3>
        <p>Únete a empresas que están encontrando talento en JobPath</p>
        <button onClick={handleRegister} className={styles['cta-large']}>
          Registrar empresa ahora
        </button>
        <p className={styles['login-hint']}>
          ¿Ya tienes cuenta? <span onClick={handleLogin} className={styles['link-text']}>Inicia sesión aquí</span>
        </p>
      </section>
    </div>
  );
};

export default EmpresasInfo;
