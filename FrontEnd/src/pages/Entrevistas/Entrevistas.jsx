import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './Entrevistas.css';

/**
 * Página Entrevistas - Guía de preparación para entrevistas laborales
 * Migrado desde OrientacionV/Entrevistas/Entrevistas.html
 */
const Entrevistas = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    es: {
      title: 'Preparación para Entrevistas',
      subtitle: 'Consejos y estrategias para destacar en tu próxima entrevista',
      
      intro: {
        title: '¿Qué es una Entrevista Laboral?',
        content: 'La entrevista es tu oportunidad para demostrar que eres el candidato ideal. Es una conversación bidireccional donde tanto tú como el empleador evalúan si hay un buen ajuste.'
      },

      before: {
        title: 'Antes de la Entrevista',
        items: [
          {
            icon: '🔍',
            title: 'Investiga la Empresa',
            content: 'Conoce su misión, valores, productos y noticias recientes. Visita su sitio web y redes sociales.'
          },
          {
            icon: '📝',
            title: 'Revisa la Descripción del Puesto',
            content: 'Identifica las habilidades clave requeridas y prepara ejemplos de cómo las has demostrado.'
          },
          {
            icon: '💼',
            title: 'Prepara tus Documentos',
            content: 'Lleva copias impresas de tu CV, carta de presentación, portfolio y certificados.'
          },
          {
            icon: '👔',
            title: 'Elige tu Vestimenta',
            content: 'Viste formal o business casual según la cultura de la empresa. Si dudas, mejor más formal.'
          },
          {
            icon: '🗺️',
            title: 'Planifica tu Llegada',
            content: 'Verifica la ubicación, medio de transporte y llega 10-15 minutos antes.'
          },
          {
            icon: '💭',
            title: 'Prepara tus Respuestas',
            content: 'Practica respuestas a preguntas comunes usando el método STAR (Situación, Tarea, Acción, Resultado).'
          }
        ]
      },

      during: {
        title: 'Durante la Entrevista',
        items: [
          {
            icon: '🤝',
            title: 'Primera Impresión',
            content: 'Saluda con confianza, sonríe, mantén contacto visual y da un apretón de manos firme.'
          },
          {
            icon: '🎯',
            title: 'Escucha Activamente',
            content: 'Presta atención a las preguntas, tómate un momento para pensar antes de responder.'
          },
          {
            icon: '💬',
            title: 'Comunica Claramente',
            content: 'Habla con claridad, evita muletillas, sé específico y respalda tus afirmaciones con ejemplos.'
          },
          {
            icon: '⚡',
            title: 'Muestra Entusiasmo',
            content: 'Demuestra tu interés genuino en el puesto y la empresa con tu lenguaje corporal y respuestas.'
          },
          {
            icon: '❓',
            title: 'Haz Preguntas',
            content: 'Prepara preguntas inteligentes sobre el rol, equipo, cultura y próximos pasos.'
          },
          {
            icon: '✅',
            title: 'Sé Honesto',
            content: 'No exageres tus habilidades. Es mejor admitir que no sabes algo pero estás dispuesto a aprender.'
          }
        ]
      },

      questions: {
        title: 'Preguntas Frecuentes',
        list: [
          {
            q: '¿Háblame de ti?',
            tip: 'Resume tu trayectoria profesional, destacando experiencia relevante y conectando con el puesto.'
          },
          {
            q: '¿Por qué quieres trabajar aquí?',
            tip: 'Menciona aspectos específicos de la empresa que te atraen y cómo encajan con tus objetivos.'
          },
          {
            q: '¿Cuáles son tus fortalezas?',
            tip: 'Menciona 2-3 fortalezas relevantes con ejemplos concretos de cómo las has aplicado.'
          },
          {
            q: '¿Cuál es tu mayor debilidad?',
            tip: 'Menciona una debilidad real pero muestra cómo estás trabajando para mejorarla.'
          },
          {
            q: '¿Dónde te ves en 5 años?',
            tip: 'Habla de crecimiento profesional alineado con las oportunidades en la empresa.'
          },
          {
            q: '¿Por qué dejaste tu trabajo anterior?',
            tip: 'Sé positivo, enfócate en buscar nuevos retos y crecimiento, no en aspectos negativos.'
          }
        ]
      },

      after: {
        title: 'Después de la Entrevista',
        items: [
          'Envía un email de agradecimiento dentro de 24 horas',
          'Reflexiona sobre lo que salió bien y qué mejorar',
          'Haz seguimiento si no recibes respuesta en el plazo indicado',
          'Continúa buscando otras oportunidades mientras esperas',
          'Aprende de cada experiencia para mejorar en futuras entrevistas'
        ]
      },

      virtual: {
        title: '💻 Entrevistas Virtuales',
        tips: [
          'Prueba tu tecnología (cámara, micrófono, conexión) con anticipación',
          'Elige un lugar tranquilo con buena iluminación y fondo neutral',
          'Viste profesionalmente de arriba a abajo',
          'Mira a la cámara, no a la pantalla, para mantener "contacto visual"',
          'Ten tus documentos y notas a mano pero fuera de cámara',
          'Cierra otras aplicaciones para evitar notificaciones'
        ]
      }
    },
    en: {
      title: 'Interview Preparation',
      subtitle: 'Tips and strategies to stand out in your next interview',
      
      intro: {
        title: 'What is a Job Interview?',
        content: 'The interview is your opportunity to demonstrate you\'re the ideal candidate. It\'s a two-way conversation where both you and the employer evaluate if there\'s a good fit.'
      },

      before: {
        title: 'Before the Interview',
        items: [
          {
            icon: '🔍',
            title: 'Research the Company',
            content: 'Know their mission, values, products, and recent news. Visit their website and social media.'
          },
          {
            icon: '📝',
            title: 'Review the Job Description',
            content: 'Identify key required skills and prepare examples of how you\'ve demonstrated them.'
          },
          {
            icon: '💼',
            title: 'Prepare Your Documents',
            content: 'Bring printed copies of your CV, cover letter, portfolio, and certificates.'
          },
          {
            icon: '👔',
            title: 'Choose Your Outfit',
            content: 'Dress formal or business casual depending on company culture. When in doubt, go more formal.'
          },
          {
            icon: '🗺️',
            title: 'Plan Your Arrival',
            content: 'Verify location, transportation, and arrive 10-15 minutes early.'
          },
          {
            icon: '💭',
            title: 'Prepare Your Answers',
            content: 'Practice answers to common questions using the STAR method (Situation, Task, Action, Result).'
          }
        ]
      },

      during: {
        title: 'During the Interview',
        items: [
          {
            icon: '🤝',
            title: 'First Impression',
            content: 'Greet confidently, smile, maintain eye contact, and give a firm handshake.'
          },
          {
            icon: '🎯',
            title: 'Listen Actively',
            content: 'Pay attention to questions, take a moment to think before answering.'
          },
          {
            icon: '💬',
            title: 'Communicate Clearly',
            content: 'Speak clearly, avoid filler words, be specific, and back up your statements with examples.'
          },
          {
            icon: '⚡',
            title: 'Show Enthusiasm',
            content: 'Demonstrate genuine interest in the position and company with your body language and responses.'
          },
          {
            icon: '❓',
            title: 'Ask Questions',
            content: 'Prepare smart questions about the role, team, culture, and next steps.'
          },
          {
            icon: '✅',
            title: 'Be Honest',
            content: 'Don\'t exaggerate your skills. Better to admit you don\'t know something but are willing to learn.'
          }
        ]
      },

      questions: {
        title: 'Frequent Questions',
        list: [
          {
            q: 'Tell me about yourself?',
            tip: 'Summarize your professional background, highlighting relevant experience and connecting with the position.'
          },
          {
            q: 'Why do you want to work here?',
            tip: 'Mention specific aspects of the company that attract you and how they align with your goals.'
          },
          {
            q: 'What are your strengths?',
            tip: 'Mention 2-3 relevant strengths with concrete examples of how you\'ve applied them.'
          },
          {
            q: 'What is your greatest weakness?',
            tip: 'Mention a real weakness but show how you\'re working to improve it.'
          },
          {
            q: 'Where do you see yourself in 5 years?',
            tip: 'Talk about professional growth aligned with opportunities at the company.'
          },
          {
            q: 'Why did you leave your previous job?',
            tip: 'Be positive, focus on seeking new challenges and growth, not negative aspects.'
          }
        ]
      },

      after: {
        title: 'After the Interview',
        items: [
          'Send a thank you email within 24 hours',
          'Reflect on what went well and what to improve',
          'Follow up if you don\'t receive a response within the indicated timeframe',
          'Continue looking for other opportunities while waiting',
          'Learn from each experience to improve in future interviews'
        ]
      },

      virtual: {
        title: '💻 Virtual Interviews',
        tips: [
          'Test your technology (camera, microphone, connection) in advance',
          'Choose a quiet place with good lighting and neutral background',
          'Dress professionally from top to bottom',
          'Look at the camera, not the screen, to maintain "eye contact"',
          'Have your documents and notes handy but off-camera',
          'Close other applications to avoid notifications'
        ]
      }
    }
  };

  const t = texts[language];

  return (
    <div className="entrevistas-page">
      <SimpleNavbar title="Job Path" />

      <main className="entrevistas-content">
        {/* Header */}
        <div className="header-section">
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <img src="/img/entrevistaT.png" alt="Entrevista" />
        </div>

        {/* Intro */}
        <div className="intro-section">
          <h2>{t.intro.title}</h2>
          <p>{t.intro.content}</p>
        </div>

        {/* Before Interview */}
        <section className="phase-section before-section">
          <h2 className="phase-title">{t.before.title}</h2>
          <div className="cards-grid">
            {t.before.items.map((item, index) => (
              <div key={index} className="info-card">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* During Interview */}
        <section className="phase-section during-section">
          <h2 className="phase-title">{t.during.title}</h2>
          <div className="cards-grid">
            {t.during.items.map((item, index) => (
              <div key={index} className="info-card">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Questions */}
        <section className="questions-section">
          <h2 className="phase-title">{t.questions.title}</h2>
          <div className="questions-list">
            {t.questions.list.map((item, index) => (
              <div key={index} className="question-item">
                <h3 className="question">{item.q}</h3>
                <p className="answer-tip">💡 <strong>Tip:</strong> {item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Virtual Interviews */}
        <section className="virtual-section">
          <h2 className="phase-title">{t.virtual.title}</h2>
          <div className="virtual-tips">
            {t.virtual.tips.map((tip, index) => (
              <div key={index} className="virtual-tip">
                ✓ {tip}
              </div>
            ))}
          </div>
        </section>

        {/* After Interview */}
        <section className="after-section">
          <h2 className="phase-title">{t.after.title}</h2>
          <div className="after-list">
            {t.after.items.map((item, index) => (
              <div key={index} className="after-item">
                <span className="item-number">{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="cta-section">
          <h2>{language === 'es' ? '¿Necesitas más ayuda?' : 'Need more help?'}</h2>
          <div className="cta-buttons">
            <button onClick={() => navigate('/consejos')} className="cta-btn primary">
              {language === 'es' ? 'Ver Más Consejos' : 'See More Tips'}
            </button>
            <button onClick={() => navigate('/cv-y-carta')} className="cta-btn secondary">
              {language === 'es' ? 'Crear tu CV' : 'Create your CV'}
            </button>
            <button onClick={() => navigate('/contacto')} className="cta-btn tertiary">
              {language === 'es' ? 'Asesoría Personalizada' : 'Personalized Advice'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Entrevistas;
