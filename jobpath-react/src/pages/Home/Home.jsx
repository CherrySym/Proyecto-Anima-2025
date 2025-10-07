import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import './Home.css';

/**
 * Página Home - Migrado desde home/home.html
 * Muestra el contenido principal con imagen y botón de suscripción
 * Al hacer scroll, redirige a la página de jóvenes
 */
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let done = false;

    // Función que redirige a /jovenes al detectar scroll
    // Migrado desde el script inline del HTML original
    const fireOnce = () => {
      if (done) return;
      done = true;
      navigate('/jovenes');
    };

    const handleScroll = () => fireOnce();
    const handleWheel = () => fireOnce();
    const handleTouchMove = () => fireOnce();
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        fireOnce();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // Función para ir a suscripciones - migrado del onclick del botón
  const goToSubscriptions = () => {
    navigate('/suscripciones');
  };

  return (
    <div className="home-page">
      <Header showFullNav={true} title="Job Path" />

      <main className="main-content">
        <section className="text-section">
          <h2>✨ Conozca el futuro de los jóvenes</h2>
          <p>
            A través de experiencias laborales desafiantes, los jóvenes aprenden a innovar y a crecer. 
            Cada proyecto y cada meta alcanzada les enseña a prosperar en un entorno dinámico, forjando 
            el camino hacia una carrera exitosa y llena de oportunidades.
          </p>
          <br />
          <br />
          <button onClick={goToSubscriptions} className="subscribe-btn">
            Ir a Suscripciones
          </button>
        </section>

        <section className="image-section">
          <img src="/img/img1.png" alt="futuro de los jóvenes" className="img-large" />
        </section>
      </main>
    </div>
  );
};

export default Home;
