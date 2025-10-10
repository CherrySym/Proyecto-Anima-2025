import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

/**
 * Página Landing (Principal) - Migrado desde index.html
 * VERSIÓN MEJORADA: Ofrece navegación explícita + auto-scroll opcional
 * - Botón principal visible para navegación clara
 * - Auto-scroll activado solo después de interacción significativa
 * - Mejor UX y accesibilidad
 */
const Landing = () => {
  const navigate = useNavigate();

  // Navegación manual con el botón
  const goToHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    let done = false;
    let scrollAttempts = 0;

    // Auto-scroll mejorado: solo después de scroll significativo (no accidental)
    const fireOnce = () => {
      if (done) return;
      scrollAttempts++;
      
      // Requiere 2 intentos de scroll para evitar disparos accidentales
      if (scrollAttempts >= 2) {
        done = true;
        navigate('/home');
      }
    };

    // Event listeners para scroll significativo
    const handleScroll = () => {
      // Solo si scroll > 50px
      if (window.scrollY > 50) {
        fireOnce();
      }
    };

    const handleWheel = (e) => {
      // Solo scroll hacia abajo
      if (e.deltaY > 0) {
        fireOnce();
      }
    };

    const handleKeyDown = (e) => {
      // Solo teclas de navegación hacia abajo
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        done = true;
        navigate('/home');
      }
    };

    // Agregar listeners (removemos touchmove para evitar falsos positivos en mobile)
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="title">JobPath</h1>
        <div className="arrow animate-bounce">&#8595;</div>
        <button onClick={goToHome} className="enter-button">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Landing;
