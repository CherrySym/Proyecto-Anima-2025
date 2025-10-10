import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './Jovenes.css';

/**
 * Página Jóvenes - Migrado desde jovenes.html
 * Información sobre la plataforma para jóvenes
 */
const Jovenes = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

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
      title: '✨ Encuentra a Jóvenes como empresa',
      description: 'En un mercado laboral en constante evolución, las empresas necesitan una inyección constante de energía, nuevas perspectivas y talento fresco. Y es precisamente en los jóvenes donde reside esa fuente de innovación y crecimiento. Más que simples empleados, los jóvenes de hoy son motores de cambio, con una mentalidad digital innata, una pasión por aprender y una adaptabilidad que define la era moderna.',
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
      title: '✨ Find Young Talent as a Company',
      description: 'In a constantly evolving labor market, companies need a constant injection of energy, new perspectives and fresh talent. And it is precisely in young people where that source of innovation and growth resides. More than just employees, today\'s young people are engines of change, with an innate digital mindset, a passion for learning and an adaptability that defines the modern era.',
      button: 'Go to Subscriptions',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  return (
    <div className="jovenes-page">
      <SimpleNavbar title="Job Path" />

      <main className="main-content">
        <section className="text-section">
          <h2>{t.title}</h2>
          <p>{t.description}</p>
          <button onClick={goToSubscriptions} className="subscribe-btn">
            {t.button}
          </button>
        </section>

        <section className="image-section">
          <img src="/img/jovenes.png" alt="Profesionales jóvenes" className="img-large" />
        </section>
      </main>
    </div>
  );
};

export default Jovenes;
