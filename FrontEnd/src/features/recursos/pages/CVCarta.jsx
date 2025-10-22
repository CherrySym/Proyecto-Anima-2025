import { FileText, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import styles from '../Recursos.module.css';

function CVCarta() {
  const cvSections = [
    { title: 'Datos Personales', content: 'Nombre completo, teléfono, email profesional, LinkedIn (opcional)' },
    { title: 'Perfil Profesional', content: '2-3 líneas que resuman tu experiencia y objetivos profesionales' },
    { title: 'Experiencia Laboral', content: 'Empresas, cargos, fechas y logros principales (orden cronológico inverso)' },
    { title: 'Educación', content: 'Títulos, instituciones, fechas de graduación y logros académicos' },
    { title: 'Habilidades', content: 'Técnicas (software, idiomas) y blandas (trabajo en equipo, liderazgo)' },
    { title: 'Información Adicional', content: 'Certificaciones, voluntariados, proyectos relevantes' }
  ];

  const cvTips = [
    'Mantén el CV en 1-2 páginas máximo',
    'Usa verbos de acción (dirigí, implementé, aumenté)',
    'Cuantifica logros (aumenté ventas en 30%)',
    'Personaliza para cada puesto',
    'Revisa ortografía y gramática cuidadosamente',
    'Usa formato limpio y profesional'
  ];

  const cartaSections = [
    { title: 'Encabezado', content: 'Fecha, datos del destinatario, saludo formal' },
    { title: 'Introducción', content: 'Presenta quién eres y el puesto al que aplicas' },
    { title: 'Cuerpo Principal', content: 'Destaca 2-3 logros relevantes y por qué encajas en el puesto' },
    { title: 'Motivación', content: 'Explica por qué te interesa la empresa y el rol específico' },
    { title: 'Cierre', content: 'Expresa interés en una entrevista, agradecimiento y despedida' }
  ];

  const cartaTips = [
    'Máximo 1 página',
    'Investiga sobre la empresa antes de escribir',
    'Sé específico, evita generalidades',
    'Muestra entusiasmo pero mantén profesionalismo',
    'Personaliza para cada aplicación',
    'Pide a alguien que la revise antes de enviar'
  ];

  const erroresComunes = [
    'Errores ortográficos o gramaticales',
    'Información desactualizada o incorrecta',
    'Email poco profesional (usa nombre@dominio.com)',
    'Foto inapropiada (si la incluyes, que sea formal)',
    'Diseño recargado o difícil de leer',
    'Información irrelevante para el puesto',
    'Mentir sobre habilidades o experiencia',
    'CV o carta genéricos no personalizados'
  ];

  return (
    <div className={styles['recursos-page']}>
      <div className={styles['page-header']}>
        <FileText className={styles['header-icon']} />
        <h1>Cómo armar tu CV y Carta de Presentación</h1>
        <p className={styles['subtitle']}>Aprende a crear documentos profesionales que destaquen</p>
      </div>

      <div className={styles['content-sections']}>
        {/* SECCIÓN CV */}
        <section className={styles['dual-section']}>
          <div className={styles['section-main']}>
            <div className={styles['advice-card']}>
              <h2>
                <FileText size={24} />
                Curriculum Vitae (CV)
              </h2>
              <p className={styles['intro-text']}>
                Tu CV es tu primera impresión. Debe ser claro, conciso y profesional.
              </p>
              
              <div className={styles['subsections']}>
                <h3>Estructura del CV:</h3>
                {cvSections.map((section, index) => (
                  <div key={index} className={styles['subsection']}>
                    <h4>{section.title}</h4>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ejemplo de CV */}
            <div className={styles['example-image']}>
              <img src="/img/ejCV.png" alt="Ejemplo de CV" />
              <p className={styles['image-caption']}>Ejemplo de CV profesional</p>
            </div>
          </div>

          <div className={styles['section-side']}>
            <div className={styles['tip-card']}>
              <h3>
                <CheckCircle size={20} />
                Tips para tu CV
              </h3>
              <ul>
                {cvTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECCIÓN CARTA DE PRESENTACIÓN */}
        <section className={styles['dual-section']}>
          <div className={styles['section-main']}>
            <div className={styles['advice-card']}>
              <h2>
                <Mail size={24} />
                Carta de Presentación
              </h2>
              <p className={styles['intro-text']}>
                La carta es el complemento de tu CV. Debe ser <strong>breve</strong> (una cuartilla como máximo) 
                e ir <strong>directo al grano</strong>. Utiliza un <strong>tono profesional</strong> pero que refleje tu entusiasmo.
              </p>

              <div className={styles['subsections']}>
                <h3>Estructura de la Carta:</h3>
                {cartaSections.map((section, index) => (
                  <div key={index} className={styles['subsection']}>
                    <h4>{section.title}</h4>
                    <p>{section.content}</p>
                  </div>
                ))}
              </div>

              <p className={styles['highlight-text']}>
                En el cuerpo, resalta tus <strong>habilidades clave</strong> y <strong>experiencias</strong> más relevantes. 
                Muestra que has <strong>personalizado</strong> la carta y finaliza con una <strong>llamada a la acción</strong>.
              </p>
            </div>

            {/* Ejemplo de Carta */}
            <div className={styles['example-image']}>
              <img src="/img/ejCarta.png" alt="Ejemplo de Carta de Presentación" />
              <p className={styles['image-caption']}>Ejemplo de Carta de Presentación</p>
            </div>
          </div>

          <div className={styles['section-side']}>
            <div className={styles['tip-card']}>
              <h3>
                <CheckCircle size={20} />
                Tips para tu Carta
              </h3>
              <ul>
                {cartaTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ERRORES COMUNES */}
        <section className={styles['errors-section']}>
          <h2>
            <AlertCircle size={24} />
            Errores Comunes a Evitar
          </h2>
          <div className={styles['errors-grid']}>
            {erroresComunes.map((error, index) => (
              <div key={index} className={styles['error-item']}>
                <span className={styles['error-icon']}>❌</span>
                {error}
              </div>
            ))}
          </div>
        </section>

        {/* RECURSOS Y PLANTILLAS */}
        <section className={styles['resources-actions']}>
          <h2>📄 Plantillas y Recursos</h2>
          <p>Descarga plantillas profesionales para crear tu CV y carta de presentación</p>
          <div className={styles['action-buttons']}>
            <button className={`${styles['action-btn']} ${styles['primary']}`}>
              📄 Descargar Plantilla CV
            </button>
            <button className={`${styles['action-btn']} ${styles['primary']}`}>
              📝 Descargar Plantilla Carta
            </button>
            <button className={`${styles['action-btn']} ${styles['secondary']}`}>
              📚 Ver Más Ejemplos
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CVCarta;
