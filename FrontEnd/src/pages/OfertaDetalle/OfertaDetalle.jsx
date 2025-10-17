import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import './OfertaDetalle.css';

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
      alert('Debes iniciar sesión para postularte');
      navigate('/login');
      return;
    }

    if (user.edad < 18) {
      alert('Debes ser mayor de 18 años para postularte a ofertas laborales.');
      return;
    }

    if (user.tipoUsuario === 'EMPRESA') {
      alert('Las empresas no pueden postularse a ofertas.');
      return;
    }

    setPostulando(true);
    
    try {
      await ofertasService.postularseOferta(oferta.id);
      setYaPostulado(true);
      alert('¡Postulación enviada exitosamente! La empresa revisará tu perfil y se pondrá en contacto contigo.');
    } catch (err) {
      alert(err.error || 'Error al postularse. Puede que ya te hayas postulado antes.');
    } finally {
      setPostulando(false);
    }
  };

  const handleGuardarOferta = () => {
    // Funcionalidad para guardar oferta para más tarde
    alert('Oferta guardada en tus favoritos');
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
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="oferta-detalle-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles de la oferta...</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className="oferta-detalle-page">
        <div className="error-container">
          <h2>❌ Oferta no encontrada</h2>
          <p>La oferta que buscas no existe o ya no está disponible.</p>
          <button onClick={() => navigate('/ofertas')} className="btn-volver">
            Ver todas las ofertas
          </button>
        </div>
      </div>
    );
  }

  const diasRestantes = Math.ceil((new Date(oferta.fechaVencimiento) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="oferta-detalle-page">
      <main className="oferta-detalle-content">
        <div className="oferta-detalle-container">
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
              <span style={{ fontSize: '24px' }}>⚠️</span>
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
          <div className="oferta-header">
            <button onClick={() => navigate('/ofertas')} className="btn-back">
              ← Volver a ofertas
            </button>
            
            <div className="oferta-title-section">
              <h1>{oferta.titulo}</h1>
              <div className="empresa-info">
                <h2>{oferta.empresa}</h2>
                <p>📍 {oferta.ubicacion}</p>
              </div>
            </div>

            <div className="oferta-badges">
              <span className="badge tipo">{oferta.tipo}</span>
              <span className="badge modalidad">{oferta.modalidad}</span>
              <span className="badge area">{oferta.area}</span>
              {diasRestantes > 0 && (
                <span className="badge tiempo">
                  {diasRestantes} días restantes
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="oferta-main-content">
            <div className="oferta-details">
              <section className="descripcion-section">
                <h3>📋 Descripción del puesto</h3>
                <p>{oferta.descripcion}</p>
                {oferta.descripcionCompleta && (
                  <div 
                    className="descripcion-completa"
                    dangerouslySetInnerHTML={{ __html: oferta.descripcionCompleta }}
                  />
                )}
              </section>

              <section className="requisitos-section">
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

              <section className="empresa-section">
                <h3>🏢 Sobre la empresa</h3>
                <div className="empresa-card">
                  <h4>{oferta.empresa_info.nombre}</h4>
                  <p>{oferta.empresa_info.descripcion}</p>
                  <div className="empresa-stats">
                    <span>👥 {oferta.empresa_info.empleados} empleados</span>
                    {oferta.empresa_info.sitio_web && (
                      <a href={oferta.empresa_info.sitio_web} target="_blank" rel="noopener noreferrer">
                        🌐 Sitio web
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar con acciones */}
            <div className="oferta-sidebar">
              <div className="postulacion-card">
                <div className="salario-info">
                  <h4>💰 Salario</h4>
                  <p>{oferta.salario}</p>
                </div>

                {user?.edad < 18 ? (
                  <div className="age-restriction">
                    <p>🚫 Esta oferta requiere ser mayor de 18 años</p>
                    <p className="age-tip">
                      Mientras tanto, puedes:
                    </p>
                    <ul>
                      <li>Explorar cursos y talleres</li>
                      <li>Completar desafíos</li>
                      <li>Usar orientación vocacional</li>
                    </ul>
                  </div>
                ) : yaPostulado ? (
                  <div className="ya-postulado">
                    <p>✅ Ya te postulaste a esta oferta</p>
                    <small>La empresa revisará tu perfil y se pondrá en contacto contigo.</small>
                  </div>
                ) : (
                  <button 
                    className="btn-postularse-main"
                    onClick={handlePostularse}
                    disabled={postulando}
                  >
                    {postulando ? 'Enviando...' : '🚀 Postularse ahora'}
                  </button>
                )}

                <div className="acciones-secundarias">
                  <button onClick={handleGuardarOferta} className="btn-guardar">
                    ⭐ Guardar oferta
                  </button>
                  <button onClick={handleCompartir} className="btn-compartir">
                    📤 Compartir
                  </button>
                </div>

                <div className="fecha-info">
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