import { useState } from 'react';
import { Mic, Video, MessageSquare, Play, StopCircle, Sparkles, Map, HelpCircle, Search, FileText, Briefcase, Shirt, MessageCircle, Handshake, Target, Zap, CheckCircle, CheckCircle2, Laptop } from 'lucide-react';
import styles from '../Recursos.module.css';

function EntrevistaIA() {
  const [isRecording, setIsRecording] = useState(false);
  const [showPracticeMode, setShowPracticeMode] = useState(false);

  const preguntasComunes = [
    "Háblame sobre ti",
    "¿Cuáles son tus fortalezas?",
    "¿Dónde te ves en 5 años?",
    "¿Por qué quieres trabajar aquí?",
    "Cuéntame sobre un desafío que hayas superado",
    "¿Cuál es tu mayor debilidad?"
  ];

  const preparacionItems = [
    { icon: <Search size={20} />, title: 'Investiga la Empresa', desc: 'Conoce su misión, valores y noticias recientes' },
    { icon: <FileText size={20} />, title: 'Revisa el Puesto', desc: 'Identifica habilidades clave requeridas' },
    { icon: <Briefcase size={20} />, title: 'Prepara Documentos', desc: 'CV, carta, portfolio y certificados' },
    { icon: <Shirt size={20} />, title: 'Vestimenta Apropiada', desc: 'Formal o business casual según la empresa' },
    { icon: <Map size={20} />, title: 'Planifica tu Llegada', desc: 'Llega 10-15 minutos antes' },
    { icon: <MessageSquare size={20} />, title: 'Método STAR', desc: 'Situación, Tarea, Acción, Resultado' }
  ];

  const duranteItems = [
    { icon: <Handshake size={20} />, title: 'Primera Impresión', desc: 'Saluda con confianza y mantén contacto visual' },
    { icon: <Target size={20} />, title: 'Escucha Activa', desc: 'Presta atención antes de responder' },
    { icon: <MessageCircle size={20} />, title: 'Comunica Claramente', desc: 'Sé específico y usa ejemplos' },
    { icon: <Zap size={20} />, title: 'Muestra Entusiasmo', desc: 'Demuestra interés genuino' },
    { icon: <HelpCircle size={20} />, title: 'Haz Preguntas', desc: 'Prepara preguntas inteligentes' },
    { icon: <CheckCircle size={20} />, title: 'Sé Honesto', desc: 'No exageres tus habilidades' }
  ];

  const virtualTips = [
    'Prueba tu tecnología (cámara, micrófono, conexión) con anticipación',
    'Elige un lugar tranquilo con buena iluminación y fondo neutral',
    'Viste profesionalmente de arriba a abajo',
    'Mira a la cámara para mantener "contacto visual"',
    'Ten tus documentos a mano pero fuera de cámara',
    'Cierra otras aplicaciones para evitar notificaciones'
  ];

  const handleStartPractice = () => {
    setIsRecording(true);
    setShowPracticeMode(true);
    // TODO: Implementar integración con IA
    console.log('Iniciando práctica de entrevista...');
  };

  const handleStopPractice = () => {
    setIsRecording(false);
    console.log('Deteniendo práctica...');
  };

  return (
    <div className={styles['recursos-page']}>
      <div className={styles['page-header']}>
        <Sparkles className={styles['header-icon']} />
        <h1>Preparación para Entrevistas</h1>
        <p className={styles['subtitle']}>Consejos prácticos y entrenamiento con IA para destacar</p>
      </div>

      {/* Introducción */}
      <div className={styles['intro-section']}>
        <h2>¿Qué es una Entrevista Laboral?</h2>
        <p>
          La entrevista es tu oportunidad para demostrar que eres el candidato ideal. 
          Es una conversación bidireccional donde tanto tú como el empleador evalúan si hay un buen ajuste.
        </p>
      </div>

      {/* Antes de la Entrevista */}
      <section className={styles['phase-section']}>
        <h2>📋 Antes de la Entrevista</h2>
        <div className={styles['cards-grid']}>
          {preparacionItems.map((item, index) => (
            <div key={index} className={styles['info-card-small']}>
              <div className={styles['card-icon']}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Durante la Entrevista */}
      <section className={styles['phase-section']}>
        <h2>💼 Durante la Entrevista</h2>
        <div className={styles['cards-grid']}>
          {duranteItems.map((item, index) => (
            <div key={index} className={styles['info-card-small']}>
              <div className={styles['card-icon']}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Entrevistas Virtuales */}
      <section className={styles['virtual-tips-section']}>
        <h2>
          <Laptop size={24} />
          Tips para Entrevistas Virtuales
        </h2>
        <div className={styles['tips-grid']}>
          {virtualTips.map((tip, index) => (
            <div key={index} className={styles['tip-item']}>
              <CheckCircle2 size={18} className={styles['check-icon']} />
              {tip}
            </div>
          ))}
        </div>
      </section>

      {/* CTA para practicar */}
      <div className={styles['cta-practice']}>
        <Sparkles size={32} />
        <h2>¿Listo para practicar?</h2>
        <p>Usa nuestra herramienta de entrenamiento con IA para mejorar tus respuestas</p>
        <button 
          className={styles['cta-button']} 
          onClick={handleStartPractice}
          disabled={showPracticeMode}
        >
          <Play size={20} />
          {showPracticeMode ? 'Modo Práctica Activado' : 'Comenzar Entrenamiento con IA'}
        </button>
      </div>

      {/* Modo práctica - Se muestra DEBAJO del contenido */}
      {showPracticeMode && (
        <div className={styles['practice-mode-section']}>
          <div className={styles['practice-header']}>
            <h2>
              <Target size={24} />
              Modo Práctica Activo
            </h2>
            <button 
              className={styles['close-practice']} 
              onClick={() => setShowPracticeMode(false)}
            >
              ✕ Cerrar Modo Práctica
            </button>
          </div>

          <div className={styles['interview-layout']}>
            {/* Panel de Práctica */}
            <section className={styles['practice-panel']}>
              <div className={styles['video-placeholder']}>
                <Video size={64} strokeWidth={1.5} />
                <p>Vista previa de cámara</p>
                {isRecording && <div className={styles['recording-indicator']}>● GRABANDO</div>}
              </div>

              <div className={styles['controls']}>
                {!isRecording ? (
                  <button className={styles['start-button']} onClick={handleStartPractice}>
                    <Play size={20} />
                    Comenzar Grabación
                  </button>
                ) : (
                  <button className={styles['stop-button']} onClick={handleStopPractice}>
                    <StopCircle size={20} />
                    Detener
                  </button>
                )}
              </div>

              <div className={styles['features-info']}>
                <h3>Características:</h3>
                <ul>
                  <li><Mic size={16} /> Análisis de voz y fluidez</li>
                  <li><Video size={16} /> Evaluación de lenguaje corporal</li>
                  <li><MessageSquare size={16} /> Feedback en tiempo real</li>
                  <li><Sparkles size={16} /> Sugerencias de mejora personalizadas</li>
                </ul>
              </div>
            </section>

            {/* Panel de Chat/Preguntas */}
            <aside className={styles['chat-panel']}>
              <div className={styles['tip-card']}>
                <h3>Preguntas Frecuentes en Entrevistas</h3>
                <div className={styles['questions-list']}>
                  {preguntasComunes.map((pregunta, index) => (
                    <button key={index} className={styles['question-button']}>
                      {pregunta}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles['tip-card']}>
                <h3>Método STAR</h3>
                <p>Usa este método para responder preguntas de comportamiento:</p>
                <ul>
                  <li><strong>S</strong>ituación: Describe el contexto</li>
                  <li><strong>T</strong>area: Explica tu responsabilidad</li>
                  <li><strong>A</strong>cción: Detalla lo que hiciste</li>
                  <li><strong>R</strong>esultado: Comparte el impacto</li>
                </ul>
              </div>

              <div className={styles['coming-soon']}>
                <Sparkles size={24} />
                <p>La integración completa con IA estará disponible próximamente</p>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntrevistaIA;
