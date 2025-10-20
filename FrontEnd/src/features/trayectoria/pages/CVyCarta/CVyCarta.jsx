import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../context/LanguageContext';
import SimpleNavbar from '../../../../components/layout/SimpleNavbar/SimpleNavbar';
import styles from './CVyCarta.module.css';
// import './CVyCarta.css'; // comentado: backup

/**
 * Página CVyCarta - Guía para crear CV y cartas de presentación
 * Migrado desde OrientacionV/CVyCarta/CVyCarta.html
 */
const CVyCarta = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    es: {
      title: 'CV y Carta de Presentación',
      subtitle: 'Aprende a crear documentos profesionales que destaquen',
      
      cv: {
        title: 'Curriculum Vitae (CV)',
        intro: 'Tu CV es tu primera impresión. Debe ser claro, conciso y profesional.',
        sections: [
          {
            title: 'Datos Personales',
            content: 'Nombre completo, teléfono, email profesional, LinkedIn (opcional)'
          },
          {
            title: 'Perfil Profesional',
            content: '2-3 líneas que resuman tu experiencia y objetivos profesionales'
          },
          {
            title: 'Experiencia Laboral',
            content: 'Empresas, cargos, fechas y logros principales (orden cronológico inverso)'
          },
          {
            title: 'Educación',
            content: 'Títulos, instituciones, fechas de graduación y logros académicos'
          },
          {
            title: 'Habilidades',
            content: 'Técnicas (software, idiomas) y blandas (trabajo en equipo, liderazgo)'
          },
          {
            title: 'Información Adicional',
            content: 'Certificaciones, voluntariados, proyectos relevantes'
          }
        ],
        tips: [
          'Mantén el CV en 1-2 páginas máximo',
          'Usa verbos de acción (dirigí, implementé, aumenté)',
          'Cuantifica logros (aumenté ventas en 30%)',
          'Personaliza para cada puesto',
          'Revisa ortografía y gramática cuidadosamente',
          'Usa formato limpio y profesional'
        ],
        example: 'Ejemplo de CV'
      },

      carta: {
        title: 'Carta de Presentación',
        intro: 'La carta complementa tu CV y muestra tu interés genuino en el puesto.',
        sections: [
          {
            title: 'Encabezado',
            content: 'Fecha, datos del destinatario, saludo formal'
          },
          {
            title: 'Introducción',
            content: 'Presenta quién eres y el puesto al que aplicas'
          },
          {
            title: 'Cuerpo Principal',
            content: 'Destaca 2-3 logros relevantes y por qué encajas en el puesto'
          },
          {
            title: 'Motivación',
            content: 'Explica por qué te interesa la empresa y el rol específico'
          },
          {
            title: 'Cierre',
            content: 'Expresa interés en una entrevista, agradecimiento y despedida'
          }
        ],
        tips: [
          'Máximo 1 página',
          'Investiga sobre la empresa antes de escribir',
          'Sé específico, evita generalidades',
          'Muestra entusiasmo pero mantén profesionalismo',
          'Personaliza para cada aplicación',
          'Pide a alguien que la revise antes de enviar'
        ],
        example: 'Ejemplo de Carta'
      },

      errors: {
        title: 'Errores Comunes a Evitar',
        items: [
          '❌ Errores ortográficos o gramaticales',
          '❌ Información desactualizada o incorrecta',
          '❌ Email poco profesional (usa nombre@dominio.com)',
          '❌ Foto inapropiada (si la incluyes, que sea formal)',
          '❌ Diseño recargado o difícil de leer',
          '❌ Información irrelevante para el puesto',
          '❌ Mentir sobre habilidades o experiencia',
          '❌ CV o carta genéricos no personalizados'
        ]
      },

      resources: {
        title: 'Plantillas y Recursos',
        button1: 'Descargar Plantilla CV',
        button2: 'Descargar Plantilla Carta',
        button3: 'Ver Más Ejemplos',
        button4: 'Asesoría Personalizada'
      }
    },
    en: {
      title: 'CV and Cover Letter',
      subtitle: 'Learn to create professional documents that stand out',
      
      cv: {
        title: 'Curriculum Vitae (CV)',
        intro: 'Your CV is your first impression. It should be clear, concise, and professional.',
        sections: [
          {
            title: 'Personal Information',
            content: 'Full name, phone, professional email, LinkedIn (optional)'
          },
          {
            title: 'Professional Profile',
            content: '2-3 lines summarizing your experience and professional goals'
          },
          {
            title: 'Work Experience',
            content: 'Companies, positions, dates, and main achievements (reverse chronological order)'
          },
          {
            title: 'Education',
            content: 'Degrees, institutions, graduation dates, and academic achievements'
          },
          {
            title: 'Skills',
            content: 'Technical (software, languages) and soft (teamwork, leadership)'
          },
          {
            title: 'Additional Information',
            content: 'Certifications, volunteering, relevant projects'
          }
        ],
        tips: [
          'Keep CV to 1-2 pages maximum',
          'Use action verbs (led, implemented, increased)',
          'Quantify achievements (increased sales by 30%)',
          'Customize for each position',
          'Carefully review spelling and grammar',
          'Use clean and professional format'
        ],
        example: 'CV Example'
      },

      carta: {
        title: 'Cover Letter',
        intro: 'The letter complements your CV and shows your genuine interest in the position.',
        sections: [
          {
            title: 'Header',
            content: 'Date, recipient\'s information, formal greeting'
          },
          {
            title: 'Introduction',
            content: 'Introduce yourself and the position you\'re applying for'
          },
          {
            title: 'Main Body',
            content: 'Highlight 2-3 relevant achievements and why you fit the position'
          },
          {
            title: 'Motivation',
            content: 'Explain why you\'re interested in the company and specific role'
          },
          {
            title: 'Closing',
            content: 'Express interest in an interview, thanks, and farewell'
          }
        ],
        tips: [
          'Maximum 1 page',
          'Research the company before writing',
          'Be specific, avoid generalities',
          'Show enthusiasm but maintain professionalism',
          'Customize for each application',
          'Have someone review it before sending'
        ],
        example: 'Letter Example'
      },

      errors: {
        title: 'Common Mistakes to Avoid',
        items: [
          '❌ Spelling or grammar errors',
          '❌ Outdated or incorrect information',
          '❌ Unprofessional email (use name@domain.com)',
          '❌ Inappropriate photo (if included, make it formal)',
          '❌ Cluttered or hard-to-read design',
          '❌ Information irrelevant to the position',
          '❌ Lying about skills or experience',
          '❌ Generic, non-customized CV or letter'
        ]
      },

      resources: {
        title: 'Templates and Resources',
        button1: 'Download CV Template',
        button2: 'Download Letter Template',
        button3: 'See More Examples',
        button4: 'Personalized Advice'
      }
    }
  };

  const t = texts[language];

  return (
    <div className={styles['cvycarta-page']}>
      <SimpleNavbar title="Job Path" />

      <main className={styles['cvycarta-content']}>
        {/* Header */}
        <div className={styles['header-section']}>
          <h1>{t.title}</h1>
          <p className={styles['subtitle']}>{t.subtitle}</p>
        </div>

        <div className={styles['main-grid']}>
          {/* CV Section */}
          <div className={`${styles['document-section']} ${styles['cv-section']}`}>
            <h2 className={styles['section-title']}>{t.cv.title}</h2>
            <p className={styles['section-intro']}>{t.cv.intro}</p>

            <div className={styles['subsections']}>
              {t.cv.sections.map((section, index) => (
                <div key={index} className={styles['subsection']}>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>

            <div className={styles['tips-box']}>
              <h4>💡 Consejos Clave:</h4>
              <ul>
                {t.cv.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className={styles['example-image']}>
              <img src="/img/ejCV.png" alt={t.cv.example} />
              <p className={styles['image-caption']}>{t.cv.example}</p>
            </div>
          </div>

          {/* Carta Section */}
          <div className={`${styles['document-section']} ${styles['carta-section']}`}>
            <h2 className={styles['section-title']}>{t.carta.title}</h2>
            <p className={styles['section-intro']}>{t.carta.intro}</p>

            <div className={styles['subsections']}>
              {t.carta.sections.map((section, index) => (
                <div key={index} className={styles['subsection']}>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>

            <div className={styles['tips-box']}>
              <h4>💡 Consejos Clave:</h4>
              <ul>
                {t.carta.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className={styles['example-image']}>
              <img src="/img/ejCarta.png" alt={t.carta.example} />
              <p className={styles['image-caption']}>{t.carta.example}</p>
            </div>
          </div>
        </div>

        {/* Errors Section */}
        <div className={styles['errors-section']}>
          <h2>{t.errors.title}</h2>
          <div className={styles['errors-grid']}>
            {t.errors.items.map((error, index) => (
              <div key={index} className={styles['error-item']}>
                {error}
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className={styles['resources-section']}>
          <h2>{t.resources.title}</h2>
          <div className={styles['resources-buttons']}>
            <button onClick={() => alert('Plantilla CV descargada')} className={`${styles['resource-btn']} ${styles['primary']}`}>
              📄 {t.resources.button1}
            </button>
            <button onClick={() => alert('Plantilla Carta descargada')} className={`${styles['resource-btn']} ${styles['primary']}`}>
              📝 {t.resources.button2}
            </button>
            <button onClick={() => navigate('/consejos')} className={`${styles['resource-btn']} ${styles['secondary']}`}>
              📚 {t.resources.button3}
            </button>
            <button onClick={() => navigate('/contacto')} className={`${styles['resource-btn']} ${styles['tertiary']}`}>
              💬 {t.resources.button4}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CVyCarta;
