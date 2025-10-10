import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import './Consejos.css';

/**
 * Página Consejos - Guía para identificar fortalezas personales
 * Migrado desde Consejos/Consejos.html
 */
const Consejos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const texts = {
    es: {
      title: 'Consejos para Identificar tus Fortalezas',
      subtitle: 'Descubre tus talentos y potencial profesional',
      intro: 'Conocer tus fortalezas es el primer paso para construir una carrera exitosa. Aquí te ayudamos a identificarlas y desarrollarlas.',
      
      sections: [
        {
          title: '1. Autoevaluación Honesta',
          icon: '🔍',
          content: 'Reflexiona sobre tus experiencias pasadas. ¿Qué tareas disfrutas hacer? ¿En qué actividades pierdes la noción del tiempo? Estas son señales de tus fortalezas naturales.',
          tips: [
            'Haz una lista de tus logros personales y académicos',
            'Identifica patrones en las actividades que más disfrutas',
            'Pregúntate qué harías si el dinero no fuera un problema'
          ]
        },
        {
          title: '2. Pide Retroalimentación',
          icon: '💬',
          content: 'Pregunta a amigos, familiares y profesores qué creen que haces bien. A menudo, otros pueden ver fortalezas que nosotros no reconocemos.',
          tips: [
            'Pide ejemplos específicos de cuándo demostraste esa fortaleza',
            'Pregunta a diferentes personas para obtener perspectivas variadas',
            'Acepta los comentarios positivos sin restarles importancia'
          ]
        },
        {
          title: '3. Prueba Cosas Nuevas',
          icon: '🎯',
          content: 'Experimenta con diferentes actividades y roles. La única forma de descubrir nuevas fortalezas es salir de tu zona de confort.',
          tips: [
            'Participa en proyectos extracurriculares',
            'Prueba voluntariados en diferentes áreas',
            'Toma cursos de temas que te interesen pero no domines'
          ]
        },
        {
          title: '4. Tests de Personalidad',
          icon: '📊',
          content: 'Utiliza herramientas de evaluación profesional como el test de fortalezas VIA, el MBTI o el StrengthsFinder para obtener insights objetivos.',
          tips: [
            'Responde honestamente, no como quisieras ser',
            'Combina resultados de varios tests para una visión completa',
            'Usa los resultados como punto de partida, no como verdad absoluta'
          ]
        },
        {
          title: '5. Observa tus Emociones',
          icon: '💡',
          content: 'Presta atención a qué actividades te energizan y cuáles te drenan. Tus fortalezas generalmente coinciden con lo que te hace sentir bien.',
          tips: [
            'Lleva un diario de actividades y emociones durante una semana',
            'Identifica patrones de energía alta y baja',
            'Las fortalezas auténticas te dan energía, no te la quitan'
          ]
        },
        {
          title: '6. Desarrolla tus Fortalezas',
          icon: '📈',
          content: 'Una vez identificadas, invierte tiempo en desarrollar tus fortalezas. Es más efectivo mejorar en lo que ya eres bueno que intentar arreglar debilidades.',
          tips: [
            'Busca oportunidades para usar tus fortalezas diariamente',
            'Encuentra mentores que tengan fortalezas similares',
            'Combina tus fortalezas de formas creativas'
          ]
        }
      ],

      cta: {
        title: '¿Listo para el siguiente paso?',
        subtitle: 'Explora más recursos para tu desarrollo profesional',
        button1: 'Ver Cursos',
        button2: 'Orientación Vocacional',
        button3: 'Contactar Asesor'
      },

      resources: {
        title: 'Recursos Adicionales',
        items: [
          'Test de Fortalezas VIA (gratuito)',
          'Libro: "StrengthsFinder 2.0" por Tom Rath',
          'TED Talk: "Tus fortalezas, tu camino" por Marcus Buckingham',
          'Artículo: "Cómo convertir tus fortalezas en tu carrera"'
        ]
      }
    },
    en: {
      title: 'Tips to Identify Your Strengths',
      subtitle: 'Discover your talents and professional potential',
      intro: 'Knowing your strengths is the first step to building a successful career. Here we help you identify and develop them.',
      
      sections: [
        {
          title: '1. Honest Self-Assessment',
          icon: '🔍',
          content: 'Reflect on your past experiences. What tasks do you enjoy doing? In which activities do you lose track of time? These are signs of your natural strengths.',
          tips: [
            'Make a list of your personal and academic achievements',
            'Identify patterns in the activities you enjoy most',
            'Ask yourself what you would do if money were no object'
          ]
        },
        {
          title: '2. Ask for Feedback',
          icon: '💬',
          content: 'Ask friends, family, and teachers what they think you do well. Often, others can see strengths we don\'t recognize.',
          tips: [
            'Ask for specific examples of when you demonstrated that strength',
            'Ask different people for varied perspectives',
            'Accept positive comments without downplaying them'
          ]
        },
        {
          title: '3. Try New Things',
          icon: '🎯',
          content: 'Experiment with different activities and roles. The only way to discover new strengths is to step out of your comfort zone.',
          tips: [
            'Participate in extracurricular projects',
            'Try volunteering in different areas',
            'Take courses on topics that interest you but you don\'t master'
          ]
        },
        {
          title: '4. Personality Tests',
          icon: '📊',
          content: 'Use professional assessment tools like the VIA Strengths test, MBTI, or StrengthsFinder for objective insights.',
          tips: [
            'Answer honestly, not as you wish to be',
            'Combine results from multiple tests for a complete view',
            'Use results as a starting point, not as absolute truth'
          ]
        },
        {
          title: '5. Observe Your Emotions',
          icon: '💡',
          content: 'Pay attention to which activities energize you and which drain you. Your strengths generally align with what makes you feel good.',
          tips: [
            'Keep a journal of activities and emotions for a week',
            'Identify patterns of high and low energy',
            'Authentic strengths give you energy, they don\'t take it away'
          ]
        },
        {
          title: '6. Develop Your Strengths',
          icon: '📈',
          content: 'Once identified, invest time in developing your strengths. It\'s more effective to improve what you\'re already good at than trying to fix weaknesses.',
          tips: [
            'Look for opportunities to use your strengths daily',
            'Find mentors who have similar strengths',
            'Combine your strengths in creative ways'
          ]
        }
      ],

      cta: {
        title: 'Ready for the next step?',
        subtitle: 'Explore more resources for your professional development',
        button1: 'View Courses',
        button2: 'Vocational Guidance',
        button3: 'Contact Advisor'
      },

      resources: {
        title: 'Additional Resources',
        items: [
          'VIA Strengths Test (free)',
          'Book: "StrengthsFinder 2.0" by Tom Rath',
          'TED Talk: "Your strengths, your path" by Marcus Buckingham',
          'Article: "How to turn your strengths into your career"'
        ]
      }
    }
  };

  const t = texts[language];

  return (
    <div className="consejos-page">
      <SimpleNavbar title="Job Path" />

      <main className="consejos-content">
        {/* Header */}
        <div className="header-section">
          <h1>{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
          <p className="intro">{t.intro}</p>
        </div>

        {/* Main Content - Sections */}
        <div className="sections-container">
          {t.sections.map((section, index) => (
            <div key={index} className="section-card">
              <div className="section-icon">{section.icon}</div>
              <h2>{section.title}</h2>
              <p className="section-content">{section.content}</p>
              <ul className="tips-list">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="resources-section">
          <h3>{t.resources.title}</h3>
          <ul className="resources-list">
            {t.resources.items.map((item, index) => (
              <li key={index}>
                <span className="resource-icon">📚</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.subtitle}</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/cursos')} className="cta-button primary">
              {t.cta.button1}
            </button>
            <button onClick={() => navigate('/orientacion-vocacional')} className="cta-button secondary">
              {t.cta.button2}
            </button>
            <button onClick={() => navigate('/contacto')} className="cta-button tertiary">
              {t.cta.button3}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consejos;
