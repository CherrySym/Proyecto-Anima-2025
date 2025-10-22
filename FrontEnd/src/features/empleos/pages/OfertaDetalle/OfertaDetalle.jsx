import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import { MapPin, FileText, Building2, Rocket, AlertTriangle, Star, Share2, Users, Globe, DollarSign, Ban, CheckCircle } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './OfertaDetalle.module.css';
// import './OfertaDetalle.css'; // comentado: archivo original inactivado como backup

/**
 * Página de detalle de oferta laboral
 * Muestra información completa y permite postularse
 */
const OfertaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [oferta, setOferta] = useState(null);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [error, setError] = useState(null);
  const [postulando, setPostulando] = useState(false);
  const [yaPostulado, setYaPostulado] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadOferta();
  }, [id]);

  const loadOferta = async () => {
    await withMinLoadingTime(async () => {
      try {
        setError(null);
        const data = await ofertasService.getOfertaById(id);
        setOferta(data);
        
        // Verificar si ya se postuló (esta info vendría en el objeto de oferta del backend)
        setYaPostulado(data.yaPostulado || false);
      } catch (err) {
        setError('No se pudo cargar la oferta. Mostrando contenido de ejemplo.');
        loadMockOferta();
      }
    });
  };

  const loadMockOferta = () => {
    // Mock data - fallback si falla la API
    const mockOferta = {
      id: parseInt(id),
      titulo: 'Desarrollador Frontend Junior',
      empresa: 'TechCorp',
      ubicacion: 'Buenos Aires, Argentina',
      descripcion: 'Estamos buscando un desarrollador frontend junior apasionado por la tecnología para unirse a nuestro equipo dinámico. Trabajarás en proyectos emocionantes usando las últimas tecnologías.',
      descripcionCompleta: `
        <h3>Responsabilidades:</h3>
        <ul>
          <li>Desarrollar interfaces de usuario atractivas y funcionales</li>
          <li>Colaborar con diseñadores UX/UI para implementar mockups</li>
          <li>Escribir código limpio, mantenible y bien documentado</li>
          <li>Participar en revisiones de código y reuniones de equipo</li>
          <li>Aprender nuevas tecnologías y metodologías de desarrollo</li>
          <li>Optimizar el rendimiento de aplicaciones web</li>
          <li>Implementar pruebas unitarias y de integración</li>
          <li>Mantener documentación técnica actualizada</li>
          <li>Trabajar en equipo usando metodologías ágiles</li>
          <li>Resolver bugs y problemas técnicos</li>
        </ul>
        
        <h3>Requisitos Técnicos:</h3>
        <ul>
          <li>Experiencia mínima de 1 año en desarrollo frontend</li>
          <li>Dominio de HTML5, CSS3 y JavaScript ES6+</li>
          <li>Conocimiento sólido de React y sus ecosistemas</li>
          <li>Familiaridad con herramientas de build (Webpack, Vite)</li>
          <li>Experiencia con sistemas de control de versiones (Git)</li>
          <li>Conocimientos de responsive design y mobile-first</li>
          <li>Comprensión de principios de accesibilidad web</li>
          <li>Experiencia con APIs RESTful</li>
        </ul>
        
        <h3>Beneficios:</h3>
        <ul>
          <li>Horarios flexibles y trabajo remoto opcional</li>
          <li>Capacitaciones y cursos pagos por la empresa</li>
          <li>Ambiente de trabajo joven y dinámico</li>
          <li>Posibilidades de crecimiento profesional</li>
          <li>Snacks y almuerzo en la oficina</li>
          <li>Seguro médico privado</li>
          <li>Días de vacaciones adicionales</li>
          <li>Budget para equipamiento y home office</li>
          <li>Eventos y actividades de team building</li>
          <li>Acceso a conferencias y meetups tecnológicos</li>
        </ul>
        
        <h3>Proceso de Selección:</h3>
        <ul>
          <li>Entrevista inicial con RRHH (30 minutos)</li>
          <li>Prueba técnica para resolver en casa (2-3 horas)</li>
          <li>Entrevista técnica con el equipo de desarrollo (1 hora)</li>
          <li>Entrevista final con el CTO (30 minutos)</li>
          <li>Propuesta y onboarding</li>
        </ul>
      `,
      requisitos: [
        'HTML5, CSS3 y JavaScript moderno',
        'Conocimientos en React o Vue.js',
        'Git y metodologías ágiles',
        'Inglés básico/intermedio',
        'Ganas de aprender y crecer'
      ],
      salario: '$80,000 - $120,000',
      tipo: 'Tiempo completo',
      modalidad: 'Híbrido',
      fechaPublicacion: '2025-10-05',
      fechaVencimiento: '2025-11-05',
      area: 'tecnologia',
      empresa_info: {
        nombre: 'TechCorp',
        descripcion: 'Empresa líder en desarrollo de software con más de 10 años en el mercado.',
        empleados: '50-100',
        sitio_web: 'https://techcorp.example.com'
      }
    };
    
    setOferta(mockOferta);
    setYaPostulado(false);
  };

  const handlePostularse = async () => {
    if (!user) {
      setToast({ message: 'Debes iniciar sesión para postularte', type: 'error' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (user.edad < 18) {
      setToast({ message: 'Debes ser mayor de 18 años para postularte a ofertas laborales', type: 'error' });
      return;
    }

    if (user.tipoUsuario === 'EMPRESA') {
      setToast({ message: 'Las empresas no pueden postularse a ofertas', type: 'error' });
      return;
    }

    setPostulando(true);
    
    try {
      const result = await ofertasService.postularseOferta(oferta.id);
      setYaPostulado(true);
      setToast({ 
        message: '¡Postulación enviada exitosamente! La empresa revisará tu perfil', 
        type: 'success' 
      });
      setPostulando(false);
    } catch (err) {
      console.error('Error al postularse:', err);
      
      // Manejar diferentes tipos de errores
      let errorMessage = 'Error al postularse. Por favor intenta nuevamente.';
      if (err.error) {
        errorMessage = err.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setToast({ message: errorMessage, type: 'error' });
      setPostulando(false);
    }
  };

  const handleGuardarOferta = () => {
    // Funcionalidad deshabilitada - no hay sección de favoritos
  };

  const handleCompartir = () => {
    // Compartir oferta
    if (navigator.share) {
      navigator.share({
        title: oferta.titulo,
        text: `Mira esta oferta laboral: ${oferta.titulo} en ${oferta.empresa}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
      setToast({ message: 'Enlace copiado al portapapeles', type: 'success' });
    }
  };

  if (loading) {
    return (
      <div className={styles['oferta-detalle-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando detalles de la oferta...</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className={styles['oferta-detalle-page']}>
        <div className={styles['error-container']}>
          <h2>❌ Oferta no encontrada</h2>
          <p>La oferta que buscas no existe o ya no está disponible.</p>
          <button onClick={() => navigate('/ofertas')} className={styles['btn-volver']}>
            Ver todas las ofertas
          </button>
        </div>
      </div>
    );
  }

  const diasRestantes = Math.ceil((new Date(oferta.fechaVencimiento) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles['oferta-detalle-page']}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <main className={styles['oferta-detalle-content']}>
        <div className={styles['oferta-detalle-container']}>
          {/* Banner de error si hubo problema */}
          {error && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <AlertTriangle size={24} color="#856404" />
              <div>
                <strong style={{ color: '#856404', display: 'block', marginBottom: '4px' }}>
                  Aviso
                </strong>
                <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
                  {error} Mostrando datos de ejemplo.
                </p>
              </div>
            </div>
          )}

          {/* Header de la oferta */}
          <div className={styles['oferta-header']}>
            <button onClick={() => navigate('/ofertas')} className={styles['btn-back']}>
              ← Volver a ofertas
            </button>
            
            <div className={styles['oferta-title-section']}>
              <h1>{oferta.titulo}</h1>
              <div className={styles['empresa-info']}>
                <h2>{oferta.empresa}</h2>
                <p><MapPin size={16} /> {oferta.ubicacion}</p>
              </div>
            </div>

            <div className={styles['oferta-badges']}>
              <span className={styles['badge'] + ' ' + styles['tipo']}>{oferta.tipo}</span>
              <span className={styles['badge'] + ' ' + styles['modalidad']}>{oferta.modalidad}</span>
              <span className={styles['badge'] + ' ' + styles['area']}>{oferta.area}</span>
              {diasRestantes > 0 && (
                <span className={styles['badge'] + ' ' + styles['tiempo']}>
                  {diasRestantes} días restantes
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
    <div className={styles['oferta-main-content']}>
      <div className={styles['oferta-details']}>
              <section className={styles['descripcion-section']}>
                <h3><FileText size={20} /> Descripción del puesto</h3>
                <p>{oferta.descripcion}</p>
                {oferta.descripcionCompleta && (
                  <div 
                    className={styles['descripcion-completa']}
                    dangerouslySetInnerHTML={{ __html: oferta.descripcionCompleta }}
                  />
                )}
              </section>

              <section className={styles['requisitos-section']}>
                <h3>✅ Requisitos</h3>
                <ul>
                  {Array.isArray(oferta.requisitos) ? (
                    oferta.requisitos.map((requisito, index) => (
                      <li key={index}>{requisito}</li>
                    ))
                  ) : (
                    <li>{oferta.requisitos}</li>
                  )}
                </ul>
              </section>

              <section className={styles['empresa-section']}>
                <h3><Building2 size={20} /> Sobre la empresa</h3>
                <div className={styles['empresa-card']}>
                  <h4>{oferta.empresa_info.nombre}</h4>
                  <p>{oferta.empresa_info.descripcion}</p>
                  <div className={styles['empresa-stats']}>
                    <span><Users size={16} /> {oferta.empresa_info.empleados} empleados</span>
                    {oferta.empresa_info.sitio_web && (
                      <a href={oferta.empresa_info.sitio_web} target="_blank" rel="noopener noreferrer">
                        <Globe size={16} /> Sitio web
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar con acciones */}
            <div className={styles['oferta-sidebar']}>
              <div className={styles['postulacion-card']}>
                <div className={styles['salario-info']}>
                  <h4><DollarSign size={20} /> Salario</h4>
                  <p>{oferta.salario}</p>
                </div>

                {user?.edad < 18 ? (
                  <div className={styles['age-restriction']}>
                    <p><Ban size={16} /> Esta oferta requiere ser mayor de 18 años</p>
                    <p className={styles['age-tip']}>
                      Mientras tanto, puedes:
                    </p>
                    <ul>
                      <li>Explorar cursos y talleres</li>
                      <li>Completar desafíos</li>
                      <li>Usar orientación vocacional</li>
                    </ul>
                  </div>
                ) : yaPostulado ? (
                  <div className={styles['ya-postulado']}>
                    <p><CheckCircle size={18} /> Ya te postulaste a esta oferta</p>
                    <small>La empresa revisará tu perfil y se pondrá en contacto contigo.</small>
                  </div>
                ) : (
                  <button 
                    className={styles['btn-postularse-main']}
                    onClick={handlePostularse}
                    disabled={postulando}
                  >
                    {postulando ? 'Enviando...' : <><Rocket size={18} /> Postularse ahora</>}
                  </button>
                )}

                <div className={styles['acciones-secundarias']}>
                  <button onClick={handleGuardarOferta} className={styles['btn-guardar']}>
                    <Star size={18} /> Guardar oferta
                  </button>
                  <button onClick={handleCompartir} className={styles['btn-compartir']}>
                    <Share2 size={18} /> Compartir
                  </button>
                </div>

                <div className={styles['fecha-info']}>
                  <p>
                    <strong>Publicado:</strong> {new Date(oferta.fechaPublicacion).toLocaleDateString('es-AR')}
                  </p>
                  <p>
                    <strong>Vence:</strong> {new Date(oferta.fechaVencimiento).toLocaleDateString('es-AR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default OfertaDetalle;