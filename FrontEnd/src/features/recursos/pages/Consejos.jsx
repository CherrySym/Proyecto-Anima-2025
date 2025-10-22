import { Star, CheckCircle, BarChart3, Search, MessageCircle, Target, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';
import styles from '../Recursos.module.css';

function Consejos() {
  const sections = [
    {
      title: '1. Autoevaluación Honesta',
      icon: <Search size={24} />,
      content: 'Reflexiona sobre tus experiencias pasadas. ¿Qué tareas disfrutas hacer? ¿En qué actividades pierdes la noción del tiempo? Estas son señales de tus fortalezas naturales.',
      tips: [
        'Haz una lista de tus logros personales y académicos',
        'Identifica patrones en las actividades que más disfrutas',
        'Pregúntate qué harías si el dinero no fuera un problema'
      ]
    },
    {
      title: '2. Pide Retroalimentación',
      icon: <MessageCircle size={24} />,
      content: 'Pregunta a amigos, familiares y profesores qué creen que haces bien. A menudo, otros pueden ver fortalezas que nosotros no reconocemos.',
      tips: [
        'Pide ejemplos específicos de cuándo demostraste esa fortaleza',
        'Pregunta a diferentes personas para obtener perspectivas variadas',
        'Acepta los comentarios positivos sin restarles importancia'
      ]
    },
    {
      title: '3. Prueba Cosas Nuevas',
      icon: <Target size={24} />,
      content: 'Experimenta con diferentes actividades y roles. La única forma de descubrir nuevas fortalezas es salir de tu zona de confort.',
      tips: [
        'Participa en proyectos extracurriculares',
        'Prueba voluntariados en diferentes áreas',
        'Toma cursos de temas que te interesen pero no domines'
      ]
    },
    {
      title: '4. Tests de Personalidad',
      icon: <BarChart3 size={24} />,
      content: 'Utiliza herramientas de evaluación profesional como el test de fortalezas VIA, el MBTI o el StrengthsFinder para obtener insights objetivos.',
      tips: [
        'Responde honestamente, no como quisieras ser',
        'Combina resultados de varios tests para una visión completa',
        'Usa los resultados como punto de partida, no como verdad absoluta'
      ]
    },
    {
      title: '5. Observa tus Emociones',
      icon: <Lightbulb size={24} />,
      content: 'Presta atención a qué actividades te energizan y cuáles te drenan. Tus fortalezas generalmente coinciden con lo que te hace sentir bien.',
      tips: [
        'Lleva un diario de actividades y emociones durante una semana',
        'Identifica patrones de energía alta y baja',
        'Las fortalezas auténticas te dan energía, no te la quitan'
      ]
    },
    {
      title: '6. Desarrolla tus Fortalezas',
      icon: <TrendingUp size={24} />,
      content: 'Una vez identificadas, invierte tiempo en desarrollar tus fortalezas. Es más efectivo mejorar en lo que ya eres bueno que intentar arreglar debilidades.',
      tips: [
        'Busca oportunidades para usar tus fortalezas diariamente',
        'Encuentra mentores que tengan fortalezas similares',
        'Combina tus fortalezas de formas creativas'
      ]
    }
  ];

  const resources = [
    'Test de Fortalezas VIA (gratuito)',
    'Libro: "StrengthsFinder 2.0" por Tom Rath',
    'TED Talk: "Tus fortalezas, tu camino" por Marcus Buckingham',
    'Artículo: "Cómo convertir tus fortalezas en tu carrera"'
  ];

  return (
    <div className={styles['recursos-page']}>
      <div className={styles['page-header']}>
        <Star className={styles['header-icon']} />
        <h1>Consejos para Identificar tus Fortalezas</h1>
        <p className={styles['subtitle']}>Descubre tus talentos y potencial profesional</p>
      </div>

      <div className={styles['intro-box']}>
        <p>
          Conocer tus fortalezas es el primer paso para construir una carrera exitosa. 
          Aquí te ayudamos a identificarlas y desarrollarlas de manera efectiva.
        </p>
      </div>

      <div className={styles['content-sections']}>
        {/* Main Content - Sections */}
        <div className={styles['sections-container']}>
          {sections.map((section, index) => (
            <div key={index} className={styles['section-card']}>
              <div className={styles['section-icon']}>{section.icon}</div>
              <h2>{section.title}</h2>
              <p className={styles['section-content']}>{section.content}</p>
              <ul className={styles['tips-list']}>
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className={styles['resources-section']}>
        <h3>
          <BookOpen size={24} />
          Recursos Adicionales
        </h3>
        <ul className={styles['resources-list']}>
          {resources.map((item, index) => (
            <li key={index}>
              <CheckCircle size={16} className={styles['resource-icon']} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Final Tips */}
      <div className={styles['final-tips']}>
        <div className={styles['tip-card']}>
          <h3>
            <CheckCircle size={20} />
            Tips Prácticos de Aplicación
          </h3>
          <ul>
            <li>Pensá en qué actividades disfrutás sin que te lo pidan.</li>
            <li>Recordá los logros de los que más orgulloso estés.</li>
            <li>Preguntá a tus amigos o familia qué creen que hacés bien.</li>
            <li>Fijate en qué materias o temas aprendés más rápido.</li>
            <li>Observá en qué momento sentís motivación y energía.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Consejos;
