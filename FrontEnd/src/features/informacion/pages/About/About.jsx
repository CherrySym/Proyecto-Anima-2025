import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useLanguage } from '../../../../context/LanguageContext';
import SimpleNavbar from '../../../../components/layout/SimpleNavbar/SimpleNavbar';
import styles from './About.module.css';
// import './About.css'; // backup of original global stylesheet

const About = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();

  // Assumption: subscription route is '/suscripciones' in this app (Spanish routes used elsewhere).
  const goToSubscriptions = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    navigate('/suscripciones');
  };

  const texts = {
    spanish: {
      joinTitle: 'Únete a JobPath',
      joinStrong: 'Construye tu futuro',
      joinDesc: 'Conecta con oportunidades y empresas que quieren ayudarte a crecer.',
      startButton: 'Comenzar',
      centerDesc1: 'Conecta con empresas que buscan talento joven.',
      centerDesc2: 'Accede a recursos, cursos y consejos para tu carrera.',
      whyTitle: '¿Por qué JobPath?',
      reason1: 'Aprender y crecer',
      reason2: 'Buscar experiencia',
      reason3: 'Investigar empresas',
      reason4: 'Investigar negocios',
      reason5: 'Contratar jóvenes',
      votes: '✅ El nombre será compartido | 0 votos',
      perfil: 'Perfil'
    },
    english: {
      joinTitle: 'Join JobPath',
      joinStrong: 'Build your future',
      joinDesc: 'Connect with opportunities and companies that help you grow.',
      startButton: 'Get started',
      centerDesc1: 'Connect with companies looking for young talent.',
      centerDesc2: 'Access resources, courses and career tips.',
      whyTitle: 'Why JobPath?',
      reason1: 'Learn and grow',
      reason2: 'Seek experience',
      reason3: 'Company research',
      reason4: 'Business research',
      reason5: 'Hire young people',
      votes: '✅ Name will be shared | 0 votes',
      perfil: 'Profile'
    }
  };

  const t = texts[language] || texts.spanish;

  return (
    <div className={styles['about-page']}>
      <SimpleNavbar title="Job Path" />

      {/* Duplicate logo bar removed: SimpleNavbar already provides site navigation and user access */}

      <main className={styles['main-content']}>
        <section className={styles['left-box']}>
          <h2>{t.joinTitle} <br /><strong>{t.joinStrong}</strong></h2>
          <p>{t.joinDesc}</p>
          <a href="#" onClick={goToSubscriptions} className={styles['get-started']}>{t.startButton}</a>
        </section>

        <section className={styles['center-box']}>
          <div className={styles['icon']}>👥</div>
          <p>{t.centerDesc1}</p>
          <p>{t.centerDesc2}</p>
        </section>

        <section className={styles['right-box']}>
          <h3>{t.whyTitle}</h3>
          <ul>
            <li>{t.reason1}</li>
            <li>{t.reason2}</li>
            <li>{t.reason3}</li>
            <li>{t.reason4}</li>
            <li>{t.reason5}</li>
          </ul>
          <small>{t.votes}</small>
        </section>
      </main>
    </div>
  );
};

export default About;
