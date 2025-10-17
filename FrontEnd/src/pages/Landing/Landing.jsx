import { useEffect, useCallback } from 'react'; // Importar useCallback
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  // Función de navegación principal, envuelta en useCallback
  const goToHome = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  useEffect(() => {
    let hasInteracted = false;

    // Función que navega y se asegura de que solo se ejecute una vez
    const fireNavigation = () => {
      if (hasInteracted) return;
      hasInteracted = true;
      goToHome();
    };

    // 1. Manejo de Scroll (para movimientos grandes)
    const handleScroll = () => {
      // Un solo scroll significativo (ej: > 100px)
      if (window.scrollY > 100) {
        fireNavigation();
      }
    };

    // 2. Manejo de Rueda/Mouse (para movimientos intencionales)
    const handleWheel = (e) => {
      // Solo scroll hacia abajo con una cierta intensidad (ej: > 5)
      if (e.deltaY > 5) {
        fireNavigation();
      }
    };
    
    // 3. Manejo de Teclado (para accesibilidad)
    const handleKeyDown = (e) => {
      // Teclas comunes para avanzar: Flecha Abajo, PageDown, Enter, Espacio
      if (['ArrowDown', 'PageDown', 'Enter', ' '].includes(e.key)) {
        fireNavigation();
      }
    };
    
    // 4. Manejo Táctil (crucial para móviles)
    // Usamos 'touchend' para capturar el final de un posible gesto de deslizamiento
    const handleTouchEnd = () => {
        // En móvil, cualquier deslizamiento vertical es una intención clara de avanzar
        // Nota: Solo se activará si hay suficiente contenido para scroll.
        // Como la página es de 100vh, el scroll natural funcionará en la mayoría de los casos.
        if (window.scrollY > 50) { 
            fireNavigation();
        }
    };

    // Agregar Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToHome]); // Dependencia del useCallback

  return (
    <div className="landing-page">
      <div className="container">
        <h1 className="title">JobPath</h1>
        
        {/* Flecha como pista visual (aria-hidden para accesibilidad) */}
        <div className="arrow animate-bounce" aria-hidden="true">
          &#8595;
        </div>
        
        <button onClick={goToHome} className="enter-button">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Landing;