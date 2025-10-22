import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import * as ofertasService from '../../services/ofertasService';
import { MapPin, Tag, AlertTriangle, Target, Clock, X } from 'lucide-react';
import styles from './Ofertas.module.css';
// import './Ofertas.css'; // comentado: archivo original inactivado como backup

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

  // Cargar ofertas desde la API cuando cambian filtros de selects
  useEffect(() => {
    loadOfertas();
  }, [filtros.area, filtros.tipo, filtros.modalidad]);

  // Cargar ofertas con debounce para búsqueda (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filtros.busqueda !== undefined) {
        loadOfertas();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filtros.busqueda]);

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

  const esOfertaVencida = (fechaVencimiento) => {
    if (!fechaVencimiento) return false;
    return new Date(fechaVencimiento) < new Date();
  };

  if (loading) {
    return (
      <div className={styles['ofertas-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando ofertas laborales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['ofertas-page']}>
      <main className={styles['ofertas-content']}>
        <div className={styles['ofertas-header']}>
          <h1><Target size={28} /> Ofertas Laborales</h1>
          <p>Encuentra oportunidades perfectas para iniciar tu carrera profesional</p>
          
          {error && (
            <div className={styles['error-banner']}>
              <AlertTriangle size={16} /> {error}
            </div>
          )}
          
          {user?.edad && user.edad < 18 && (
            <div className={styles['age-warning']}>
              <AlertTriangle size={16} /> Como menor de 18 años (tipo: {user.tipo}), puedes explorar ofertas pero no postularte. 
              ¡Prepárate con nuestros cursos y desafíos!
            </div>
          )}
        </div>

        {/* Filtros */}
        <div className={styles['filtros-container']}>
          <div className={styles['filtro-busqueda']}>
            <input
              id="ofertas-busqueda"
              name="busqueda"
              type="text"
              placeholder="Buscar por título o empresa..."
              value={filtros.busqueda}
              onChange={handleBusqueda}
              className={styles['busqueda-input']}
            />
          </div>
          
          <div className={styles['filtro-area']}>
            <select 
              id="ofertas-area"
              name="area"
              value={filtros.area} 
              onChange={handleAreaChange} 
              className={styles['area-select']}
            >
              <option value="todas">Todas las áreas</option>
              <option value="tecnologia">Tecnología</option>
              <option value="marketing">Marketing</option>
              <option value="ventas">Ventas</option>
              <option value="administracion">Administración</option>
              <option value="diseno">Diseño</option>
            </select>
          </div>

          <div className={styles['filtro-tipo']}>
            <select 
              id="ofertas-tipo"
              name="tipo"
              value={filtros.tipo} 
              onChange={handleTipoChange} 
              className={styles['tipo-select']}
            >
              <option value="">Todos los tipos</option>
              <option value="Tiempo completo">Tiempo completo</option>
              <option value="Medio tiempo">Medio tiempo</option>
              <option value="Trainee">Trainee</option>
              <option value="Pasantía">Pasantía</option>
            </select>
          </div>

          <div className={styles['filtro-modalidad']}>
            <select 
              id="ofertas-modalidad"
              name="modalidad"
              value={filtros.modalidad} 
              onChange={handleModalidadChange} 
              className={styles['modalidad-select']}
            >
              <option value="">Todas las modalidades</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>

        {/* Lista de ofertas */}
        <div className={styles['ofertas-grid']}>
          {ofertas.length === 0 ? (
            <div className={styles['no-ofertas']}>
              <h3>No se encontraron ofertas</h3>
              <p>Intenta con otros filtros o revisa más tarde</p>
            </div>
          ) : (
            ofertas.map(oferta => {
              const vencida = esOfertaVencida(oferta.fechaVencimiento);
              const empresaNombre = oferta.empresa_info?.nombre || oferta.empresa || 'Empresa';
              
              return (
                <div key={oferta.id} className={`${styles['oferta-card']} ${vencida ? styles['vencida'] : ''}`}>
                  <div className={styles['oferta-header']}>
                    <h3>{oferta.titulo}</h3>
                    <span className={styles['empresa']}>{empresaNombre}</span>
                  </div>
                  
                  <div className={styles['oferta-info']}>
                    {oferta.ubicacion && <p className={styles['ubicacion']}><MapPin size={14} /> {oferta.ubicacion}</p>}
                    {oferta.tipo && <p className={styles['tipo']}>{oferta.tipo}</p>}
                    {oferta.modalidad && <p className={styles['modalidad']}>{oferta.modalidad}</p>}
                    {oferta.salario && <p className={styles['salario']}>{oferta.salario}</p>}
                    {oferta.area && (
                      <p className={styles['area']}>
                        <Tag size={14} /> {oferta.area.charAt(0).toUpperCase() + oferta.area.slice(1)}
                      </p>
                    )}
                  </div>
                  
                  <div className={styles['oferta-descripcion']}>
                    <p>{oferta.descripcion}</p>
                  </div>

                  {oferta.requisitos && (
                    <div className={styles['oferta-requisitos']}>
                      <strong>Requisitos:</strong>
                      <p>{oferta.requisitos}</p>
                    </div>
                  )}
                  
                  <div className={styles['oferta-actions']}>
                    <button
                      className={styles['btn-ver-detalle']}
                      onClick={() => navigate(`/oferta/${oferta.id}`)}
                    >
                      📄 Ver Detalles Completos
                    </button>
                  </div>
                  
                  <div className={styles['oferta-fechas']}>
                    <span>Publicado: {new Date(oferta.fechaPublicacion || oferta.createdAt).toLocaleDateString('es-AR')}</span>
                    {oferta.fechaVencimiento && (
                      <span className={vencida ? styles['vencida'] : ''}>
                        {vencida ? <X size={14} /> : <Clock size={14} />}
                        {' '}Vence: {new Date(oferta.fechaVencimiento).toLocaleDateString('es-AR')}
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