import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Ofertas.css';

/**
 * Página de Ofertas Laborales
 * Solo accesible para usuarios mayores de 18 años
 * Muestra ofertas disponibles y permite postularse
 */
const Ofertas = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    area: 'todas'
  });

  // Mock data de ofertas (luego será reemplazado por API call)
  useEffect(() => {
    // Simular carga de ofertas desde API
    setTimeout(() => {
      setOfertas([
        {
          id: 1,
          titulo: 'Desarrollador Frontend Junior',
          empresa: 'TechCorp',
          ubicacion: 'Buenos Aires',
          descripcion: 'Buscamos desarrollador frontend con conocimientos en React...',
          requisitos: 'HTML, CSS, JavaScript, React básico',
          salario: '$80,000 - $120,000',
          tipo: 'Tiempo completo',
          fechaPublicacion: '2025-10-05',
          area: 'tecnologia'
        },
        {
          id: 2,
          titulo: 'Asistente de Marketing Digital',
          empresa: 'Marketing Plus',
          ubicacion: 'Córdoba',
          descripcion: 'Posición entry-level para apoyar en campañas digitales...',
          requisitos: 'Redes sociales, Google Analytics básico, creatividad',
          salario: '$60,000 - $90,000',
          tipo: 'Tiempo parcial',
          fechaPublicacion: '2025-10-07',
          area: 'marketing'
        },
        {
          id: 3,
          titulo: 'Trainee en Ventas',
          empresa: 'SalesForce Argentina',
          ubicacion: 'Rosario',
          descripcion: 'Programa de entrenamiento en ventas para jóvenes profesionales...',
          requisitos: 'Secundario completo, buena comunicación, ganas de aprender',
          salario: '$70,000 - $100,000',
          tipo: 'Trainee',
          fechaPublicacion: '2025-10-08',
          area: 'ventas'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBusqueda = (e) => {
    setFiltros({
      ...filtros,
      busqueda: e.target.value
    });
  };

  const handleAreaChange = (e) => {
    setFiltros({
      ...filtros,
      area: e.target.value
    });
  };

  const filtrarOfertas = () => {
    return ofertas.filter(oferta => {
      const coincideBusqueda = oferta.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                              oferta.empresa.toLowerCase().includes(filtros.busqueda.toLowerCase());
      const coincideArea = filtros.area === 'todas' || oferta.area === filtros.area;
      
      return coincideBusqueda && coincideArea;
    });
  };

  const handlePostularse = (ofertaId) => {
    // Por ahora solo navegamos a detalle
    navigate(`/ofertas/${ofertaId}`);
  };

  if (loading) {
    return (
      <div className="ofertas-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando ofertas laborales...</p>
        </div>
      </div>
    );
  }

  const ofertasFiltradas = filtrarOfertas();

  return (
    <div className="ofertas-page">
      <main className="ofertas-content">
        <div className="ofertas-header">
          <h1>🎯 Ofertas Laborales</h1>
          <p>Encuentra oportunidades perfectas para iniciar tu carrera profesional</p>
          
          {user?.edad < 18 && (
            <div className="age-warning">
              ⚠️ Como menor de 18 años, puedes explorar ofertas pero no postularte. 
              ¡Prepárate con nuestros cursos y desafíos!
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className="filtros-container">
          <div className="filtro-busqueda">
            <input
              type="text"
              placeholder="Buscar por título o empresa..."
              value={filtros.busqueda}
              onChange={handleBusqueda}
              className="busqueda-input"
            />
          </div>
          
          <div className="filtro-area">
            <select value={filtros.area} onChange={handleAreaChange} className="area-select">
              <option value="todas">Todas las áreas</option>
              <option value="tecnologia">Tecnología</option>
              <option value="marketing">Marketing</option>
              <option value="ventas">Ventas</option>
              <option value="administracion">Administración</option>
              <option value="diseno">Diseño</option>
            </select>
          </div>
        </div>

        {/* Lista de ofertas */}
        <div className="ofertas-grid">
          {ofertasFiltradas.length === 0 ? (
            <div className="no-ofertas">
              <h3>No se encontraron ofertas</h3>
              <p>Intenta con otros filtros o revisa más tarde</p>
            </div>
          ) : (
            ofertasFiltradas.map(oferta => (
              <div key={oferta.id} className="oferta-card">
                <div className="oferta-header">
                  <h3>{oferta.titulo}</h3>
                  <span className="empresa">{oferta.empresa}</span>
                </div>
                
                <div className="oferta-info">
                  <p className="ubicacion">📍 {oferta.ubicacion}</p>
                  <p className="tipo">{oferta.tipo}</p>
                  <p className="salario">💰 {oferta.salario}</p>
                </div>
                
                <div className="oferta-descripcion">
                  <p>{oferta.descripcion}</p>
                </div>
                
                <div className="oferta-actions">
                  <button 
                    className="btn-ver-detalle"
                    onClick={() => navigate(`/ofertas/${oferta.id}`)}
                  >
                    Ver Detalle
                  </button>
                  
                  {user?.edad >= 18 ? (
                    <button 
                      className="btn-postularse"
                      onClick={() => handlePostularse(oferta.id)}
                    >
                      Postularse
                    </button>
                  ) : (
                    <button className="btn-postularse disabled" disabled>
                      Solo +18 años
                    </button>
                  )}
                </div>
                
                <div className="oferta-fecha">
                  Publicado: {new Date(oferta.fechaPublicacion).toLocaleDateString('es-AR')}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Ofertas;