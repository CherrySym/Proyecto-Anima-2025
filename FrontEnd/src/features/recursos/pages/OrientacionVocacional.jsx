import { Sparkles, Lightbulb, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../Recursos.module.css';

function OrientacionVocacional() {
  const navigate = useNavigate();

  return (
    <div className={styles['recursos-page']}>
      <div className={styles['page-header']}>
        <Sparkles className={styles['header-icon']} />
        <h1>Orientación Vocacional</h1>
      </div>

      <div className={styles['content-grid']}>
        <section className={styles['main-section']}>
          <div className={styles['info-card']}>
            <h2>
              <Lightbulb size={24} />
              ¿Qué es la Orientación Vocacional?
            </h2>
            <p>
              La Orientación Vocacional (OV) es un proceso de acompañamiento cuyo objetivo es ayudarte a
              identificar y elegir la carrera, profesión o camino laboral que mejor se alinea con tus
              intereses, habilidades, aptitudes y valores personales. No se trata solo de saber qué estudiar,
              sino de construir un proyecto de vida satisfactorio y con propósito.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h2>
              <Target size={24} />
              ¿Por qué es importante?
            </h2>
            <p>
              La Orientación Vocacional es crucial porque reduce la incertidumbre y el riesgo de tomar
              decisiones impulsivas que puedan llevar a la frustración profesional.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h3>
              <TrendingUp size={20} />
              Al participar de este proceso, lograrás:
            </h3>
            <ul className={styles['benefits-list']}>
              <li>
                <strong>Alineación Personal y Profesional:</strong> Aseguras que la carrera elegida armonice con quién eres
                realmente, aumentando las posibilidades de disfrutar tu trabajo y mantenerte motivado a largo
                plazo.
              </li>
              <li>
                <strong>Inversión Eficiente:</strong> Evitas la pérdida de tiempo y recursos financieros que implica iniciar
                estudios que luego abandonarás por falta de interés o aptitud.
              </li>
              <li>
                <strong>Mejor Rendimiento:</strong> Al elegir un campo donde tus talentos naturales son una ventaja, tu
                aprendizaje y desempeño serán más fluidos y exitosos.
              </li>
            </ul>
          </div>

          {/* Imágenes ilustrativas */}
          <div className={styles['images-section']}>
            <div className={styles['image-card']}>
              <img src="/img/entrevistaT.png" alt="Entrevista de trabajo" />
            </div>
            <div className={styles['image-card']}>
              <img src="/img/JovenesT.jpg" alt="Grupo de jóvenes trabajando" />
            </div>
          </div>
        </section>

        <aside className={styles['sidebar-tips']}>
          <div className={styles['tip-card']}>
            <h3>
              <CheckCircle2 size={20} />
              {' '}Tips Clave
            </h3>
            <ul>
              <li>Reflexiona sobre qué actividades te apasionan realmente</li>
              <li>Identifica tus fortalezas y debilidades</li>
              <li>Investiga diferentes carreras y profesiones</li>
              <li>Habla con profesionales del área que te interesa</li>
              <li>Considera tus valores personales</li>
            </ul>
          </div>

          <div className={styles['action-card']}>
            <Sparkles size={24} />
            <h4>Explora más recursos</h4>
            <p>Continúa tu camino con nuestras otras herramientas</p>
            <button 
              onClick={() => navigate('/recursos/consejos')} 
              className={styles['action-button']}
            >
              Ver Consejos →
            </button>
            <button 
              onClick={() => navigate('/recursos/cv-carta')} 
              className={styles['action-button']}
            >
              CV y Carta →
            </button>
            <button 
              onClick={() => navigate('/recursos/entrevista-ia')} 
              className={styles['action-button']}
            >
              Entrenamiento IA →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OrientacionVocacional;
