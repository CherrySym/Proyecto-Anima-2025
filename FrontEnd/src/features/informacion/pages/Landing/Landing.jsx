import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
// Nota: mantenemos `Landing.css` en el proyecto como fallback y registro visual.
// Una vez validado el módulo, se puede eliminar el CSS antiguo.
// import './Landing.css';

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
    <div className={styles['landing-page']}>
      <a onClick={goToLogin} className={styles['login-link']}>
        Iniciar Sesión
      </a>
      <div className={styles.container}>
        <h1 className={styles.title}>JobPath</h1>
        <p className={styles.tagline}>Descubre, conecta y aprende.</p>
        <div className={styles['button-group']}>
          <button onClick={goToYoungPeople} className={`${styles['user-type-button']} ${styles.young}`}>
            Soy Joven
          </button>
          <button onClick={goToCompanies} className={`${styles['user-type-button']} ${styles.company}`}>
            Soy Empresa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
