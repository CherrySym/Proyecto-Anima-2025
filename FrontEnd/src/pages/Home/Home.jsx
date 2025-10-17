import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import { Sparkles } from 'lucide-react';
import './home.css'; // Puedes crear un CSS único o usar uno de los dos

const CombinedPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const goToSubscriptions = () => {
    navigate('/suscripciones');
  };

  const texts = {
    es: {
      home: {
        title: <><Sparkles size={20} /> Conozca el futuro de los jóvenes</>,
        description: 'A través de experiencias laborales desafiantes, los jóvenes aprenden a innovar y a crecer. Cada proyecto y cada meta alcanzada les enseña a prosperar en un entorno dinámico, forjando el camino hacia una carrera exitosa y llena de oportunidades.',
        button: 'Ir a Suscripciones',
        imgAlt: 'futuro de los jóvenes',
        imgSrc: '/img/img1.png'
      },
      jovenes: {
        title: <><Sparkles size={20} /> Encuentra a Jóvenes como empresa</>,
        description: 'En un mercado laboral en constante evolución, las empresas necesitan una inyección constante de energía, nuevas perspectivas y talento fresco. Y es precisamente en los jóvenes donde reside esa fuente de innovación y crecimiento. Más que simples empleados, los jóvenes de hoy son motores de cambio, con una mentalidad digital innata, una pasión por aprender y una adaptabilidad que define la era moderna.',
        button: 'Ir a Suscripciones',
        imgAlt: 'Profesionales jóvenes',
        imgSrc: '/img/jovenes.png'
      }
    },
    en: {
      home: {
        title: <><Sparkles size={20} /> Discover the future of young people</>,
        description: 'Through challenging work experiences, young people learn to innovate and grow. Each project and each goal achieved teaches them to thrive in a dynamic environment, forging the path to a successful career full of opportunities.',
        button: 'Go to Subscriptions',
        imgAlt: 'future of young people',
        imgSrc: '/img/img1.png'
      },
      jovenes: {
        title: <><Sparkles size={20} /> Find Young Talent as a Company</>,
        description: 'In a constantly evolving labor market, companies need a constant injection of energy, new perspectives and fresh talent. And it is precisely in young people where that source of innovation and growth resides. More than just employees, today\'s young people are engines of change, with an innate digital mindset, a passion for learning and an adaptability that defines the modern era.',
        button: 'Go to Subscriptions',
        imgAlt: 'Young professionals',
        imgSrc: '/img/jovenes.png'
      }
    }
  };

  const t = texts[language];

  return (
    <div className="combined-page">
      <SimpleNavbar title="Job Path" />

      <main className="main-content">
        {/* Sección Home */}
        <section className="text-section">
          <h2>{t.home.title}</h2>
          <p>{t.home.description}</p>
          <button onClick={goToSubscriptions} className="subscribe-btn">
            {t.home.button}
          </button>
        </section>
        <section className="image-section">
          <img src={t.home.imgSrc} alt={t.home.imgAlt} className="img-large" />
        </section>

        <hr className="divider" />

        {/* Sección Jóvenes */}
        <section className="text-section">
          <h2>{t.jovenes.title}</h2>
          <p>{t.jovenes.description}</p>
          <button onClick={goToSubscriptions} className="subscribe-btn">
            {t.jovenes.button}
          </button>
        </section>
        <section className="image-section">
          <img src={t.jovenes.imgSrc} alt={t.jovenes.imgAlt} className="img-large" />
        </section>
      </main>
    </div>
  );
};

export default CombinedPage;
