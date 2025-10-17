import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import { getAllCompanies } from '../../data/companiesData';
import './Companias.css';

/**
 * Página Compañías
 * Muestra empresas aliadas y sus ofertas/desafíos
 */
const Companias = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [empresas, setEmpresas] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [filtroSector, setFiltroSector] = useState('todos');
  const [paginaActual, setPaginaActual] = useState(0);
  const [likedCompanies, setLikedCompanies] = useState(new Set());
  const empresasPorPagina = 3;

  useEffect(() => {
    const loadCompanies = async () => {
      await withMinLoadingTime(async () => {
        const allCompanies = getAllCompanies();
        const companiesFormatted = allCompanies.map(company => ({
          id: company.id,
          nombre: company.name,
          sector: company.type.toLowerCase(),
          descripcion: company.about.description.substring(0, 150) + '...',
          empleados: '50-100',
          ubicacion: 'Uruguay / Internacional',
          logo: company.images.main,
          sitio_web: company.contact,
          ofertas_activas: Math.floor(Math.random() * 10) + 1,
          desafios_activos: Math.floor(Math.random() * 8) + 1,
          puntuacion: (4.5 + Math.random() * 0.5).toFixed(1),
          beneficios: ['Trabajo remoto', 'Capacitaciones', 'Ambiente profesional']
        }));
        setEmpresas(companiesFormatted);
      });
    };
    
    loadCompanies();
  }, []);

  const filtrarEmpresas = () => {
    if (filtroSector === 'todos') return empresas;
    return empresas.filter(empresa => empresa.sector === filtroSector);
  };

  // Reset página al cambiar filtro
  useEffect(() => {
    setPaginaActual(0);
  }, [filtroSector]);

  const empresasFiltradas = filtrarEmpresas();
  const totalPaginas = Math.ceil(empresasFiltradas.length / empresasPorPagina);
  const empresasActuales = empresasFiltradas.slice(
    paginaActual * empresasPorPagina,
    (paginaActual + 1) * empresasPorPagina
  );

  const handlePrevPage = () => {
    setPaginaActual(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPaginaActual(prev => Math.min(totalPaginas - 1, prev + 1));
  };

  const toggleLike = (empresaId) => {
    setLikedCompanies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(empresaId)) {
        newSet.delete(empresaId);
      } else {
        newSet.add(empresaId);
      }
      return newSet;
    });
  };

  const handleVerEmpresa = (empresaId) => {
    navigate(`/companias/${empresaId}`);
  };

  const handleVerOfertas = (empresaId) => {
    navigate(`/ofertas?empresa=${empresaId}`);
  };

  const handleVerDesafios = (empresaId) => {
    navigate(`/desafios?empresa=${empresaId}`);
  };

  if (loading) {
    return (
      <div className="companias-page">
        <SimpleNavbar title="Job Path" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando empresas aliadas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="companias-page">
      <SimpleNavbar title="Job Path" />
      
      <main className="companias-content">
        <div className="companias-header">
          <h1>🏢 Empresas Aliadas</h1>
          <p>Conoce las empresas que confían en jóvenes talentos y ofrecen oportunidades reales</p>
          
          <div className="header-stats">
            <div className="stat">
              <strong>{empresas.length}</strong>
              <span>Empresas aliadas</span>
            </div>
            <div className="stat">
              <strong>{empresas.reduce((total, emp) => total + emp.ofertas_activas, 0)}</strong>
              <span>Ofertas activas</span>
            </div>
            <div className="stat">
              <strong>{empresas.reduce((total, emp) => total + emp.desafios_activos, 0)}</strong>
              <span>Desafíos disponibles</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-section">
          <h3>Filtrar por sector:</h3>
          <div className="filtros-buttons">
            <button 
              className={filtroSector === 'todos' ? 'active' : ''}
              onClick={() => setFiltroSector('todos')}
            >
              Todos los sectores
            </button>
            <button 
              className={filtroSector === 'tecnologia' ? 'active' : ''}
              onClick={() => setFiltroSector('tecnologia')}
            >
              🖥️ Tecnología
            </button>
            <button 
              className={filtroSector === 'marketing' ? 'active' : ''}
              onClick={() => setFiltroSector('marketing')}
            >
              📱 Marketing
            </button>
            <button 
              className={filtroSector === 'diseño' ? 'active' : ''}
              onClick={() => setFiltroSector('diseño')}
            >
              🎨 Diseño
            </button>
            <button 
              className={filtroSector === 'finanzas' ? 'active' : ''}
              onClick={() => setFiltroSector('finanzas')}
            >
              💰 Finanzas
            </button>
          </div>
        </div>

        {/* Carrusel de empresas */}
        <div className="empresas-carousel-container">
          {empresasFiltradas.length === 0 ? (
            <div className="no-empresas">
              <h3>No hay empresas en este sector</h3>
              <p>Prueba con otro filtro o revisa más tarde</p>
            </div>
          ) : (
            <>
              {/* Flecha Anterior */}
              <button 
                className="carousel-arrow prev-arrow"
                onClick={handlePrevPage}
                disabled={paginaActual === 0}
                aria-label="Página anterior"
              >
                &#8249;
              </button>

              {/* Grid de empresas actuales */}
              <div className="empresas-grid">
                {empresasActuales.map(empresa => (
                  <div key={empresa.id} className="empresa-card">
                <div className="empresa-header">
                  <div className="empresa-logo">
                    <img 
                      src={empresa.logo} 
                      alt={`${empresa.nombre} logo`}
                      onError={(e) => {
                        e.target.src = '/img/default-company.png';
                      }}
                    />
                  </div>
                  <div className="empresa-header-actions">
                    <button 
                      className={`like-button ${likedCompanies.has(empresa.id) ? 'liked' : ''}`}
                      onClick={() => toggleLike(empresa.id)}
                      aria-label={likedCompanies.has(empresa.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      {likedCompanies.has(empresa.id) ? '❤️' : '🤍'}
                    </button>
                    <div className="empresa-rating">
                      ⭐ {empresa.puntuacion}
                    </div>
                  </div>
                </div>

                <div className="empresa-info">
                  <h3>{empresa.nombre}</h3>
                  <p className="empresa-descripcion">{empresa.descripcion}</p>
                  
                  <div className="empresa-detalles">
                    <div className="detalle-item">
                      <span className="label">👥 Empleados:</span>
                      <span>{empresa.empleados}</span>
                    </div>
                    <div className="detalle-item">
                      <span className="label">📍 Ubicación:</span>
                      <span>{empresa.ubicacion}</span>
                    </div>
                    <div className="detalle-item">
                      <span className="label">🌐 Sector:</span>
                      <span className="sector-badge">{empresa.sector}</span>
                    </div>
                  </div>

                  <div className="empresa-beneficios">
                    <h4>Beneficios:</h4>
                    <div className="beneficios-list">
                      {empresa.beneficios.map((beneficio, index) => (
                        <span key={index} className="beneficio-tag">
                          {beneficio}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="empresa-opportunities">
                  <div className="opportunities-stats">
                    <div className="opportunity-stat">
                      <strong>{empresa.ofertas_activas}</strong>
                      <span>Ofertas activas</span>
                    </div>
                    <div className="opportunity-stat">
                      <strong>{empresa.desafios_activos}</strong>
                      <span>Desafíos activos</span>
                    </div>
                  </div>

                  <div className="empresa-actions">
                    {empresa.ofertas_activas > 0 && (
                      <button 
                        onClick={() => handleVerOfertas(empresa.id)}
                        className="btn-ofertas"
                        disabled={user?.edad < 18}
                      >
                        {user?.edad < 18 ? 'Ver Ofertas (18+)' : 'Ver Ofertas'}
                      </button>
                    )}
                    
                    {empresa.desafios_activos > 0 && (
                      <button 
                        onClick={() => handleVerDesafios(empresa.id)}
                        className="btn-desafios"
                      >
                        Ver Desafíos
                      </button>
                    )}
                    
                    {empresa.sitio_web && (
                      <a 
                        href={empresa.sitio_web} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-sitio-web"
                      >
                        🌐 Sitio Web
                      </a>
                    )}
                  </div>
                </div>
              </div>
                ))}
              </div>

              {/* Flecha Siguiente */}
              <button 
                className="carousel-arrow next-arrow"
                onClick={handleNextPage}
                disabled={paginaActual >= totalPaginas - 1}
                aria-label="Página siguiente"
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {/* Indicador de páginas */}
        {empresasFiltradas.length > empresasPorPagina && (
          <div className="carousel-indicators">
            <span className="page-info">
              Página {paginaActual + 1} de {totalPaginas}
            </span>
            <div className="dots">
              {Array.from({ length: totalPaginas }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === paginaActual ? 'active' : ''}`}
                  onClick={() => setPaginaActual(index)}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="llamada-accion">
          <div className="cta-content">
            <h2>¿Eres una empresa?</h2>
            <p>Únete a nuestra red de empresas aliadas y encuentra jóvenes talentos</p>
            <button 
              onClick={() => navigate('/register')}
              className="btn-cta"
            >
              Registrar mi Empresa
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Companias;
