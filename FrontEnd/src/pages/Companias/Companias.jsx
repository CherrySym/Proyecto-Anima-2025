import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import SimpleNavbar from '../../components/layout/SimpleNavbar/SimpleNavbar';
import { getAllCompanies } from '../../data/companiesData';
import { Building2, Monitor, Heart, MapPin } from 'lucide-react';
import styles from './Companias.module.css';
// import './Companias.css'; // comentado: backup

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
      <div className={styles['companias-page']}>
        <SimpleNavbar title="Job Path" />
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando empresas aliadas...</p>
        </div>
      </div>
    );
  }

    return (
    <div className={styles['companias-page']}>
      <SimpleNavbar title="Job Path" />
      
      <main className={styles['companias-content']}>
        <div className={styles['companias-header']}>
          <h1><Building2 size={32} /> Empresas Aliadas</h1>
          <p>Conoce las empresas que confían en jóvenes talentos y ofrecen oportunidades reales</p>
          
          <div className={styles['header-stats']}>
            <div className={styles.stat}>
              <strong>{empresas.length}</strong>
              <span>Empresas aliadas</span>
            </div>
            <div className={styles.stat}>
              <strong>{empresas.reduce((total, emp) => total + emp.ofertas_activas, 0)}</strong>
              <span>Ofertas activas</span>
            </div>
            <div className={styles.stat}>
              <strong>{empresas.reduce((total, emp) => total + emp.desafios_activos, 0)}</strong>
              <span>Desafíos disponibles</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className={styles['filtros-section']}>
          <h3>Filtrar por sector:</h3>
          <div className={styles['filtros-buttons']}>
            <button 
              className={filtroSector === 'todos' ? styles.active : ''}
              onClick={() => setFiltroSector('todos')}
            >
              Todos los sectores
            </button>
            <button 
              className={filtroSector === 'tecnologia' ? styles.active : ''}
              onClick={() => setFiltroSector('tecnologia')}
            >
              <Monitor size={16} /> Tecnología
            </button>
            <button 
              className={filtroSector === 'marketing' ? styles.active : ''}
              onClick={() => setFiltroSector('marketing')}
            >
              📱 Marketing
            </button>
            <button 
              className={filtroSector === 'diseño' ? styles.active : ''}
              onClick={() => setFiltroSector('diseño')}
            >
              🎨 Diseño
            </button>
            <button 
              className={filtroSector === 'finanzas' ? styles.active : ''}
              onClick={() => setFiltroSector('finanzas')}
            >
              💰 Finanzas
            </button>
          </div>
        </div>

        {/* Carrusel de empresas */}
        <div className={styles['empresas-carousel-container']}>
          {empresasFiltradas.length === 0 ? (
            <div className={styles['no-empresas']}>
              <h3>No hay empresas en este sector</h3>
              <p>Prueba con otro filtro o revisa más tarde</p>
            </div>
          ) : (
            <>
              {/* Flecha Anterior */}
              <button 
                className={`${styles['carousel-arrow']} ${styles['prev-arrow']}`}
                onClick={handlePrevPage}
                disabled={paginaActual === 0}
                aria-label="Página anterior"
              >
                &#8249;
              </button>

              {/* Grid de empresas actuales */}
              <div className={styles['empresas-grid']}>
                {empresasActuales.map(empresa => (
                  <div key={empresa.id} className={styles['empresa-card']}>
                <div className={styles['empresa-header']}>
                  <div className={styles['empresa-logo']}>
                    <img 
                      src={empresa.logo} 
                      alt={`${empresa.nombre} logo`}
                      onError={(e) => {
                        e.target.src = '/img/default-company.png';
                      }}
                    />
                  </div>
                  <div className={styles['empresa-header-actions']}>
                    <button 
                      className={`${styles['like-button']} ${likedCompanies.has(empresa.id) ? styles.liked : ''}`}
                      onClick={() => toggleLike(empresa.id)}
                      aria-label={likedCompanies.has(empresa.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      <Heart 
                        size={20} 
                        fill={likedCompanies.has(empresa.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                    <div className={styles['empresa-rating']}>
                      ⭐ {empresa.puntuacion}
                    </div>
                  </div>
                </div>

                <div className={styles['empresa-info']}>
                  <h3>{empresa.nombre}</h3>
                  <p className={styles['empresa-descripcion']}>{empresa.descripcion}</p>
                  
                  <div className={styles['empresa-detalles']}>
                    <div className={styles['detalle-item']}>
                      <span className={styles.label}>👥 Empleados:</span>
                      <span>{empresa.empleados}</span>
                    </div>
                    <div className={styles['detalle-item']}>
                      <span className={styles.label}><MapPin size={14} /> Ubicación:</span>
                      <span>{empresa.ubicacion}</span>
                    </div>
                    <div className={styles['detalle-item']}>
                      <span className={styles.label}>🌐 Sector:</span>
                      <span className={styles['sector-badge']}>{empresa.sector}</span>
                    </div>
                  </div>

                  <div className={styles['empresa-beneficios']}>
                    <h4>Beneficios:</h4>
                    <div className={styles['beneficios-list']}>
                      {empresa.beneficios.map((beneficio, index) => (
                        <span key={index} className={styles['beneficio-tag']}>
                          {beneficio}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles['empresa-opportunities']}>
                  <div className={styles['opportunities-stats']}>
                    <div className={styles['opportunity-stat']}>
                      <strong>{empresa.ofertas_activas}</strong>
                      <span>Ofertas activas</span>
                    </div>
                    <div className={styles['opportunity-stat']}>
                      <strong>{empresa.desafios_activos}</strong>
                      <span>Desafíos activos</span>
                    </div>
                  </div>

                  <div className={styles['empresa-actions']}>
                    {empresa.ofertas_activas > 0 && (
                      <button 
                        onClick={() => handleVerOfertas(empresa.id)}
                        className={styles['btn-ofertas']}
                        disabled={user?.edad < 18}
                      >
                        {user?.edad < 18 ? 'Ver Ofertas (18+)' : 'Ver Ofertas'}
                      </button>
                    )}
                    
                    {empresa.desafios_activos > 0 && (
                      <button 
                        onClick={() => handleVerDesafios(empresa.id)}
                        className={styles['btn-desafios']}
                      >
                        Ver Desafíos
                      </button>
                    )}
                    
                    {empresa.sitio_web && (
                      <a 
                        href={empresa.sitio_web} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles['btn-sitio-web']}
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
                className={`${styles['carousel-arrow']} ${styles['next-arrow']}`}
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
          <div className={styles['carousel-indicators']}>
            <span className={styles['page-info']}>
              Página {paginaActual + 1} de {totalPaginas}
            </span>
            <div className={styles.dots}>
              {Array.from({ length: totalPaginas }).map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === paginaActual ? styles.active : ''}`}
                  onClick={() => setPaginaActual(index)}
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles['llamada-accion']}>
          <div className={styles['cta-content']}>
            <h2>¿Eres una empresa?</h2>
            <p>Únete a nuestra red de empresas aliadas y encuentra jóvenes talentos</p>
            <button 
              onClick={() => navigate('/register')}
              className={styles['btn-cta']}
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
