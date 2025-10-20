import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../context/LanguageContext';
import SimpleNavbar from '../../../../components/layout/SimpleNavbar/SimpleNavbar';
import { Sparkles } from 'lucide-react';
import styles from './OrientacionVocacional.module.css';
// import './OrientacionVocacional.css'; // backup of original global styles

/**
 * Página Orientación Vocacional - Migrado desde OrientacionV/Vac.html
 * Información sobre orientación vocacional y recursos disponibles
 */
const OrientacionVocacional = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    es: {
      title: 'Orientación Vocacional',
      principal: 'Principal',
      inicio: 'Inicio',
      jovenes: 'Jóvenes',
      companias: 'Compañías',
      about: 'Acerca De..',
      whatIs: '¿Que es la OV?',
      whatIsDesc: 'La Orientación Vocacional (OV) es un proceso de acompañamiento cuyo objetivo es ayudarte a identificar y elegir la carrera, profesión o camino laboral que mejor se alinea con tus intereses, habilidades, aptitudes y valores personales. No se trata solo de saber qué estudiar, sino de construir un proyecto de vida satisfactorio y con propósito.',
      whyImportant: '¿Por qué es importante?',
      whyImportantDesc: 'La Orientación Vocacional es crucial porque reduce la incertidumbre y el riesgo de tomar decisiones impulsivas que puedan llevar a la frustración profesional.',
      benefits: 'AL PARTICIPAR DE ESTE PROCESO, LOGRAS:',
      benefit1: '1-Alineación Personal y Profesional: Aseguras que la carrera elegida armonice con quién eres realmente, aumentando las posibilidades de disfrutar tu trabajo y mantenerte motivado a largo plazo.',
      benefit2: '2-Inversión Eficiente: Evitas la pérdida de tiempo y recursos financieros que implica iniciar estudios que luego abandonarás por falta de interés o aptitud.',
      benefit3: '3-Mejor Rendimiento: Al elegir un campo donde tus talentos naturales son una ventaja, tu aprendizaje y desempeño serán más fluidos y exitosos.',
      adviceBtn: 'Consejos sobre cómo identificar fortalezas.',
      cvBtn: 'Cómo armar un CV y carta de presentación',
      interviewBtn: 'Preparación para entrevistas',
      supportBtn: 'Contacto / Apoyo personalizado',
      spanish: 'Español',
      english: 'English'
    },
    en: {
      title: 'Vocational Guidance',
      principal: 'Main',
      inicio: 'Home',
      jovenes: 'Young People',
      companias: 'Companies',
      about: 'About Us..',
      whatIs: 'What is VG?',
      whatIsDesc: 'Vocational Guidance (VG) is a process of accompaniment whose objective is to help you identify and choose the career, profession or work path that best aligns with your interests, abilities, skills and personal values. It is not just about knowing what to study, but about building a satisfying and purposeful life project.',
      whyImportant: 'Why is it important?',
      whyImportantDesc: 'Vocational Guidance is crucial because it reduces uncertainty and the risk of making impulsive decisions that can lead to professional frustration.',
      benefits: 'BY PARTICIPATING IN THIS PROCESS, YOU ACHIEVE:',
      benefit1: '1-Personal and Professional Alignment: You ensure that the chosen career harmonizes with who you really are, increasing the chances of enjoying your work and staying motivated in the long term.',
      benefit2: '2-Efficient Investment: You avoid the loss of time and financial resources that starting studies that you will later abandon due to lack of interest or aptitude implies.',
      benefit3: '3-Better Performance: By choosing a field where your natural talents are an advantage, your learning and performance will be more fluid and successful.',
      adviceBtn: 'Tips on how to identify strengths.',
      cvBtn: 'How to build a CV and cover letter',
      interviewBtn: 'Interview preparation',
      supportBtn: 'Contact / Personalized support',
      spanish: 'Spanish',
      english: 'English'
    }
  };

  const t = texts[language];

  return (
    <div className={styles['orientacion-page']}>
      <SimpleNavbar title="Job Path" />

      <main className={styles['content-container']}>
        <div className={styles['main-layout']}>
          <div className={styles['left-column']}>
            <section className={styles['section-box']}>
              <h1>{t.whatIs}</h1>
              <p>{t.whatIsDesc}</p>
            </section>
            <section className={styles['section-box']}>
              <h1>{t.whyImportant}</h1>
              <p>{t.whyImportantDesc}</p>
            </section>
            <section className={styles['section-box']}>
              <h3>{t.benefits}</h3>
              <p>{t.benefit1}</p>
              <p>{t.benefit2}</p>
              <p>{t.benefit3}</p>
            </section>
          </div>

          <div className={styles['center-column']}>
            <div className={styles['stars']}><Sparkles size={32} /></div>
            <div className={styles['button-list']}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/consejos'); }} className={styles['action-button']}>
                {t.adviceBtn}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cv-y-carta'); }} className={styles['action-button']}>
                {t.cvBtn}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/entrevistas'); }} className={styles['action-button']}>
                {t.interviewBtn}
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/orientacion-personalizada'); }} className={styles['action-button']}>
                {t.supportBtn}
              </a>
            </div>
          </div>

          <div className={styles['right-column']}>
            <div className={`${styles['image-card']} ${styles['top-image']}`}>
              <img src="/img/entrevistaT.png" alt="Entrevista de trabajo" />
            </div>
            <div className={`${styles['image-card']} ${styles['bottom-image']}`}>
              <img src="/img/JovenesT.jpg" alt="Grupo de jóvenes trabajando" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrientacionVocacional;
