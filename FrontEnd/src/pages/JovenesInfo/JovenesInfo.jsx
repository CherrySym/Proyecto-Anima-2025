import { useNavigate } from 'react-router-dom';
import { Briefcase, Target, BookOpen, Users, TrendingUp, Award } from 'lucide-react';
import './JovenesInfo.css';

/**
 * Página informativa para jóvenes
 * Presenta los beneficios y características de JobPath
 */
const JovenesInfo = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register-joven');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="jovenes-info-page">
      {/* Header */}
      <header className="info-header">
        <h1 className="logo" onClick={() => navigate('/')}>JobPath</h1>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Construye tu futuro profesional</h2>
          <p className="hero-subtitle">Conecta con empresas, desarrolla tus habilidades y encuentra oportunidades reales</p>
          <button onClick={handleRegister} className="cta-primary">
            Registrarme Gratis
          </button>
        </div>
      </section>

      {/* Beneficios compactos */}
      <section className="benefits-section">
        <h3>¿Qué encontrarás en JobPath?</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Briefcase size={32} className="benefit-icon" />
            <h4>Ofertas Laborales</h4>
            <p>Accede a empleos verificados</p>
          </div>
          <div className="benefit-card">
            <Target size={32} className="benefit-icon" />
            <h4>Desafíos</h4>
            <p>Proyectos reales de empresas</p>
          </div>
          <div className="benefit-card">
            <BookOpen size={32} className="benefit-icon" />
            <h4>Cursos</h4>
            <p>Aprende nuevas habilidades</p>
          </div>
          <div className="benefit-card">
            <Users size={32} className="benefit-icon" />
            <h4>Networking</h4>
            <p>Conecta con profesionales</p>
          </div>
          <div className="benefit-card">
            <TrendingUp size={32} className="benefit-icon" />
            <h4>Crecimiento</h4>
            <p>Desarrolla tu carrera</p>
          </div>
          <div className="benefit-card">
            <Award size={32} className="benefit-icon" />
            <h4>Certificados</h4>
            <p>Valida tus logros</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <h3>¿Listo para comenzar?</h3>
          <p className="cta-text">Únete a jóvenes que ya están construyendo su carrera</p>
        <button onClick={handleRegister} className="cta-large">
          Crear mi cuenta ahora
        </button>
        <p className="login-hint">
          ¿Ya tienes cuenta? <span onClick={handleLogin} className="link-text">Inicia sesión aquí</span>
        </p>
      </section>
    </div>
  );
};

export default JovenesInfo;
