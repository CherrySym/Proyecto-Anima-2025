import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import './Landing.css';

/**
 * Página Landing (Principal) - Migrado desde index.html
 * Al hacer scroll o interactuar, redirige automáticamente a /home
 * Usa hooks de React (useEffect, useNavigate) en lugar de eventos DOM directos
 */
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let done = false;

    // Función que se ejecuta una sola vez al detectar interacción
    const fireOnce = () => {
      if (done) return;
      done = true;
      navigate('/home');
    };

    // Event listeners para diferentes tipos de interacción
    // Migrado desde el script inline del HTML original
    const handleScroll = () => fireOnce();
    const handleWheel = () => fireOnce();
    const handleTouchMove = () => fireOnce();
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        fireOnce();
      }
    };

    // Agregar listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: remover listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className="landing-page">
      <Header />
      <div className="container">
        <h1 className="title">JobPath</h1>
        <div className="arrow">&#8595;</div>
      </div>
    </div>
  );
};

export default Landing;
