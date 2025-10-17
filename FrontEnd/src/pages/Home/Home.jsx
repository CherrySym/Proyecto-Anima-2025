import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import { Sparkles } from 'lucide-react';
import './Home.css';

/**
 * Página Home - Migrado desde home/home.html
 * Muestra el contenido principal con imagen y botón de suscripción
 */
const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Función para ir a suscripciones - migrado del onclick del botón
  const goToSubscriptions = () => {
    navigate('/suscripciones');
  };

  const texts = {
    es: {
      principal: 'Principal',
      inicio: 'Inicio',
      jovenes: 'Jóvenes',
      companias: 'Compañías',
      about: 'Acerca De..',
      title: <><Sparkles size={20} /> Conozca el futuro de los jóvenes</>,
      description: 'A través de experiencias laborales desafiantes, los jóvenes aprenden a innovar y a crecer. Cada proyecto y cada meta alcanzada les enseña a prosperar en un entorno dinámico, forjando el camino hacia una carrera exitosa y llena de oportunidades.',
      button: 'Ir a Suscripciones',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      principal: 'Main',
      inicio: 'Home',
      jovenes: 'Young People',
      companias: 'Companies',
      about: 'About Us..',
      title: <><Sparkles size={20} /> Discover the future of young people</>,
      description: 'Through challenging work experiences, young people learn to innovate and grow. Each project and each goal achieved teaches them to thrive in a dynamic environment, forging the path to a successful career full of opportunities.',
      button: 'Go to Subscriptions',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  return (
    <div className="home-page">
      <SimpleNavbar title="Job Path" />

      <main className="main-content">
        <section className="text-section">
          <h2>{t.title}</h2>
          <p>{t.description}</p>
          <br />
          <br />
          <button onClick={goToSubscriptions} className="subscribe-btn">
            {t.button}
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
