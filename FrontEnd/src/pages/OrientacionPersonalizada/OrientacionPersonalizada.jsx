import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './OrientacionPersonalizada.css';

/**
 * OrientacionPersonalizada - Contacto y apoyo personalizado
 * Migrado desde OrientacionV/perzonalizado/perzonalizado.html
 */
const OrientacionPersonalizada = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    es: {
      backBtn: 'Volver Atrás',
      vocationalOrientation: 'Orientación Profesional',
      mainTitle: 'Contacto y Apoyo Personalizado',
      
      section1Title: '¡Hablemos de tu futuro!',
      section1Desc1: 'En JobPath, entendemos que tu camino profesional es único. Por eso, te ofrecemos apoyo personalizado con un equipo de orientadores listos para ayudarte a navegar el mercado laboral. Agenda una sesión individual para revisar tu perfil y planificar tus próximos pasos.',
      section1Desc2: 'Nuestros servicios incluyen: Revisión experta de CV y Carta de Presentación, Simulación de Entrevistas con feedback constructivo, y Asesoría en Búsqueda de Empleo para identificar las mejores oportunidades.',
      
      contactTitle: 'Canales de Contacto Directo',
      contactEmail: 'Email:',
      contactEmailValue: 'jobpathanima@gmail.com',
      contactEmailNote: '(Respuesta en 24h)',
      contactPhone: 'Teléfono:',
      contactPhoneValue: '2909 3640-JOBP',
      contactPhoneNote: '(Lun-Vie de 8 a 17 hs.)',
      contactLocation: 'Ubicación:',
      contactLocationValue: 'Canelones 1162, 11100 Montevideo, Departamento de Montevideo, Uruguay',
      
      section2Title: 'Reserva tu Sesión de Asesoramiento',
      section2Desc1: 'Elige el tipo de apoyo que necesitas. Nuestras sesiones tienen una duración de 45 minutos y se realizan por videollamada. Nos adaptamos a tu horario para ofrecerte la mejor experiencia de consultoría.',
      section2Desc2: 'Nuestro objetivo es darte las herramientas y la confianza para conseguir el trabajo que deseas. No importa en qué etapa de tu carrera te encuentres, estamos aquí para guiarte.',
      
      adviceTypesTitle: 'Tipos de Asesoría',
      adviceType1: 'Asesoría CV/Carta:',
      adviceType1Desc: 'Optimización de documentos a tu perfil.',
      adviceType2: 'Simulación de Entrevista:',
      adviceType2Desc: 'Práctica con un experto en RR.HH.',
      adviceType3: 'Plan de Carrera:',
      adviceType3Desc: 'Definición de objetivos a largo plazo.',
      adviceType4: 'Networking Efectivo:',
      adviceType4Desc: 'Consejos para ampliar tu red de contactos.'
    },
    en: {
      backBtn: 'Go Back',
      vocationalOrientation: 'Professional Guidance',
      mainTitle: 'Contact and Personalized Support',
      
      section1Title: "Let's talk about your future!",
      section1Desc1: 'At JobPath, we understand that your career path is unique. That\'s why we offer personalized support with a team of counselors ready to help you navigate the job market. Schedule an individual session to review your profile and plan your next steps.',
      section1Desc2: 'Our services include: Expert CV and Cover Letter Review, Interview Simulation with constructive feedback, and Job Search Counseling to identify the best opportunities.',
      
      contactTitle: 'Direct Contact Channels',
      contactEmail: 'Email:',
      contactEmailValue: 'jobpathanima@gmail.com',
      contactEmailNote: '(Response within 24h)',
      contactPhone: 'Phone:',
      contactPhoneValue: '2909 3640-JOBP',
      contactPhoneNote: '(Mon-Fri 8am-5pm)',
      contactLocation: 'Location:',
      contactLocationValue: 'Canelones 1162, 11100 Montevideo, Montevideo Department, Uruguay',
      
      section2Title: 'Book Your Counseling Session',
      section2Desc1: 'Choose the type of support you need. Our sessions last 45 minutes and are conducted via video call. We adapt to your schedule to offer you the best consulting experience.',
      section2Desc2: 'Our goal is to give you the tools and confidence to get the job you want. No matter what stage of your career you are in, we are here to guide you.',
      
      adviceTypesTitle: 'Types of Counseling',
      adviceType1: 'CV/Cover Letter Advice:',
      adviceType1Desc: 'Document optimization for your profile.',
      adviceType2: 'Interview Simulation:',
      adviceType2Desc: 'Practice with an HR expert.',
      adviceType3: 'Career Plan:',
      adviceType3Desc: 'Long-term goal definition.',
      adviceType4: 'Effective Networking:',
      adviceType4Desc: 'Tips to expand your contact network.'
    }
  };

  const t = texts[language];

  return (
    <div className="orientacion-personalizada-page">
      <SimpleNavbar title="Job Path" />

      <main className="main-container-op">
        <div className="top-bar-op">
          <button onClick={() => navigate('/orientacion-vocacional')} className="btn-volver-atras">
            {t.backBtn}
          </button>
          <h2 className="vocational-orientation-op">{t.vocationalOrientation}</h2>
        </div>

        <section className="title-section-op">
          <h1 className="main-title-op">{t.mainTitle}</h1>
        </section>

        <section className="advice-pair-op">
          <div className="left-section-op full-width-op">
            <article className="advice-box-op">
              <h2>{t.section1Title}</h2>
              <p>
                {t.section1Desc1}
              </p>
              <p>
                {t.section1Desc2}
              </p>
            </article>
          </div>

          <div className="right-section-op full-width-op">
            <aside className="tips-section-op">
              <h3 className="tips-title-op">{t.contactTitle}</h3>
              <ul>
                <li>
                  <strong>{t.contactEmail}</strong>{' '}
                  <a href="mailto:jobpathanima@gmail.com">{t.contactEmailValue}</a>{' '}
                  {t.contactEmailNote}
                </li>
                <li>
                  <strong>{t.contactPhone}</strong> {t.contactPhoneValue} {t.contactPhoneNote}
                </li>
                <li>
                  <strong>{t.contactLocation}</strong> {t.contactLocationValue}
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="advice-pair-op">
          <div className="left-section-op full-width-op">
            <article className="advice-box-op">
              <h2>{t.section2Title}</h2>
              <p>
                {t.section2Desc1}
              </p>
              <p>
                {t.section2Desc2}
              </p>
            </article>
          </div>

          <div className="right-section-op full-width-op">
            <aside className="tips-section-op">
              <h3 className="tips-title-op">{t.adviceTypesTitle}</h3>
              <ul>
                <li>
                  <strong>{t.adviceType1}</strong> {t.adviceType1Desc}
                </li>
                <li>
                  <strong>{t.adviceType2}</strong> {t.adviceType2Desc}
                </li>
                <li>
                  <strong>{t.adviceType3}</strong> {t.adviceType3Desc}
                </li>
                <li>
                  <strong>{t.adviceType4}</strong> {t.adviceType4Desc}
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrientacionPersonalizada;
