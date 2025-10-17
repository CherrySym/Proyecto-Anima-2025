import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMinLoadingTime } from '../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import { MapPin, Tag, AlertTriangle } from 'lucide-react';
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
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    area: 'todas',
    tipo: '',
    modalidad: ''
  });

  // Cargar ofertas desde la API
  useEffect(() => {
    loadOfertas();
  }, [filtros.area, filtros.tipo, filtros.modalidad]);

  const loadOfertas = async () => {
    await withMinLoadingTime(async () => {
      try {
        setError(null);
        const data = await ofertasService.getOfertas(filtros);
        setOfertas(data);
      } catch (err) {
        setError('No se pudieron cargar las ofertas. Mostrando contenido de ejemplo.');
        loadMockOfertas();
      }
    });
  };

  const loadMockOfertas = () => {
    // Mock data de ofertas (fallback)
    setOfertas([
      {
        id: 1,
        titulo: 'Desarrollador Frontend Junior',
        empresa_info: { nombre: 'TechCorp', logo: null },
        ubicacion: 'Buenos Aires',
        descripcion: 'Buscamos desarrollador frontend con conocimientos en React...',
        requisitos: 'HTML, CSS, JavaScript, React básico',
        salario: '$80,000 - $120,000',
        tipo: 'Tiempo completo',
        area: 'tecnologia',
        modalidad: 'Híbrido',
        fechaPublicacion: '2025-10-05',
        fechaVencimiento: '2025-11-05',
        activa: true
      },
      {
        id: 2,
        titulo: 'Asistente de Marketing Digital',
        empresa_info: { nombre: 'Marketing Plus', logo: null },
        ubicacion: 'Córdoba',
        descripcion: 'Posición entry-level para apoyar en campañas digitales...',
        requisitos: 'Redes sociales, Google Analytics básico, creatividad',
        salario: '$60,000 - $90,000',
        tipo: 'Medio tiempo',
        area: 'marketing',
        modalidad: 'Remoto',
        fechaPublicacion: '2025-10-07',
        fechaVencimiento: '2025-10-25',
        activa: true
      }
    ]);
  };

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

  const handleTipoChange = (e) => {
    setFiltros({
      ...filtros,
      tipo: e.target.value
    });
  };

  const handleModalidadChange = (e) => {
    setFiltros({
      ...filtros,
      modalidad: e.target.value
    });
  };

  const filtrarOfertas = () => {
    return ofertas.filter(oferta => {
      const coincideBusqueda = oferta.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                              (oferta.empresa_info?.nombre || oferta.empresa || '').toLowerCase().includes(filtros.busqueda.toLowerCase());
      return coincideBusqueda;
    });
  };

  const esOfertaVencida = (fechaVencimiento) => {
    if (!fechaVencimiento) return false;
    return new Date(fechaVencimiento) < new Date();
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
          
          {error && (
            <div className="error-banner">
              <AlertTriangle size={16} /> {error}
            </div>
          )}
          
          {user?.edad && user.edad < 18 && (
            <div className="age-warning">
              <AlertTriangle size={16} /> Como menor de 18 años (tipo: {user.tipo}), puedes explorar ofertas pero no postularte. 
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

          <div className="filtro-tipo">
            <select value={filtros.tipo} onChange={handleTipoChange} className="tipo-select">
              <option value="">Todos los tipos</option>
              <option value="Tiempo completo">Tiempo completo</option>
              <option value="Medio tiempo">Medio tiempo</option>
              <option value="Trainee">Trainee</option>
              <option value="Pasantía">Pasantía</option>
            </select>
          </div>

          <div className="filtro-modalidad">
            <select value={filtros.modalidad} onChange={handleModalidadChange} className="modalidad-select">
              <option value="">Todas las modalidades</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
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
            ofertasFiltradas.map(oferta => {
              const vencida = esOfertaVencida(oferta.fechaVencimiento);
              const empresaNombre = oferta.empresa_info?.nombre || oferta.empresa || 'Empresa';
              
              return (
                <div key={oferta.id} className={`oferta-card ${vencida ? 'vencida' : ''}`}>
                  <div className="oferta-header">
                    <h3>{oferta.titulo}</h3>
                    <span className="empresa">{empresaNombre}</span>
                  </div>
                  
                  <div className="oferta-info">
                    {oferta.ubicacion && <p className="ubicacion"><MapPin size={14} /> {oferta.ubicacion}</p>}
                    {oferta.tipo && <p className="tipo">{oferta.tipo}</p>}
                    {oferta.modalidad && <p className="modalidad">{oferta.modalidad}</p>}
                    {oferta.salario && <p className="salario">{oferta.salario}</p>}
                    {oferta.area && (
                      <p className="area">
                        <Tag size={14} /> {oferta.area.charAt(0).toUpperCase() + oferta.area.slice(1)}
                      </p>
                    )}
                  </div>
                  
                  <div className="oferta-descripcion">
                    <p>{oferta.descripcion}</p>
                  </div>

                  {oferta.requisitos && (
                    <div className="oferta-requisitos">
                      <strong>Requisitos:</strong>
                      <p>{oferta.requisitos}</p>
                    </div>
                  )}
                  
                  <div className="oferta-actions">
                    <button 
                      className="btn-ver-detalle"
                      onClick={() => navigate(`/oferta/${oferta.id}`)}
                    >
                      📄 Ver Detalles Completos
                    </button>
                  </div>
                  
                  <div className="oferta-fechas">
                    <span>Publicado: {new Date(oferta.fechaPublicacion || oferta.createdAt).toLocaleDateString('es-AR')}</span>
                    {oferta.fechaVencimiento && (
                      <span className={vencida ? 'vencida' : ''}>
                        {vencida ? '❌ ' : '⏰ '}
                        Vence: {new Date(oferta.fechaVencimiento).toLocaleDateString('es-AR')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Ofertas;