import { useNavigate } from 'react-router-dom';
import './Landing.css';

/**
 * Página Landing (Principal) - Migrado desde index.html
 * Navegación simple con selección de tipo de usuario
 */
const Landing = () => {
  const navigate = useNavigate();

  // Navegación para empresas - va a página info
  const goToCompanies = () => {
    navigate('/empresas-info');
  };

  // Navegación para jóvenes - va a página info
  const goToYoungPeople = () => {
    navigate('/jovenes-info');
  };

  // Navegación directa a login para usuarios recurrentes
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <a onClick={goToLogin} className="login-link">
        Iniciar Sesión
      </a>
      <div className="container">
        <h1 className="title">JobPath</h1>
        <p className="tagline">Descubre, conecta y aprende.</p>
        <div className="button-group">
          <button onClick={goToYoungPeople} className="user-type-button young">
            Soy Joven
          </button>
          <button onClick={goToCompanies} className="user-type-button company">
            Soy Empresa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
