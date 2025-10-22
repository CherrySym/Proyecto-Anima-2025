import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { getAllUsers } from '../../../../services/userService';
import * as conexionesService from '../../../../services/conexionesService';
import * as empresaService from '../../../empresas/services/empresaService';
import { Users, UserPlus, UserCheck, UserX, Search, MapPin, Eye, Building2, Briefcase } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './Red.module.css';

/**
 * Página Mi Red - Conexiones y usuarios sugeridos
 * Muestra usuarios para conectar (excluyendo admins y empresas)
 */
const Red = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('conexiones'); // 'conexiones', 'sugerencias' o 'empresas'
  const [usuarios, setUsuarios] = useState([]);
  const [conexiones, setConexiones] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [estadisticas, setEstadisticas] = useState({ siguiendo: 0, seguidores: 0, conexiones: 0 });
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [loadingActions, setLoadingActions] = useState(new Set());
  const [hoveredUserId, setHoveredUserId] = useState(null); // Para efecto hover en botones
  const [hoveredEmpresaId, setHoveredEmpresaId] = useState(null); // Para efecto hover en empresas

  useEffect(() => {
    cargarDatos();
  }, [activeTab]);

  const cargarDatos = async () => {
    await withMinLoadingTime(async () => {
      try {
        // Cargar estadísticas
        const stats = await conexionesService.obtenerEstadisticas();
        setEstadisticas(stats);

        if (activeTab === 'sugerencias') {
          // Cargar todos los usuarios (sin admins, sin usuario actual)
          const todosUsuarios = await getAllUsers();
          setUsuarios(todosUsuarios || []);
        } else if (activeTab === 'conexiones') {
          // Cargar mis conexiones
          const misConexiones = await conexionesService.obtenerSiguiendo();
          setConexiones(misConexiones || []);
        } else if (activeTab === 'empresas') {
          // Cargar empresas
          const todasEmpresas = await empresaService.getAllEmpresas();
          setEmpresas(todasEmpresas || []);
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
        showToast('Error al cargar datos de la red', 'error');
      }
    });
  };

  const handleSeguir = async (usuarioId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(usuarioId));
      
      await conexionesService.seguirUsuario(usuarioId);
      
      // Actualizar localmente
      if (activeTab === 'sugerencias') {
        setUsuarios(prev => prev.map(u => 
          u.id === usuarioId ? { ...u, siguiendo: true } : u
        ));
      }
      
      // Actualizar estadísticas
      setEstadisticas(prev => ({
        ...prev,
        siguiendo: prev.siguiendo + 1,
        conexiones: prev.conexiones + 1
      }));
      
      showToast('Conexión establecida', 'success');
    } catch (err) {
      console.error('Error siguiendo usuario:', err);
      showToast('Error al conectar con el usuario', 'error');
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(usuarioId);
        return next;
      });
    }
  };

  const handleDejarDeSeguir = async (usuarioId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(usuarioId));
      
      await conexionesService.dejarDeSeguirUsuario(usuarioId);
      
      // Actualizar localmente
      if (activeTab === 'sugerencias') {
        setUsuarios(prev => prev.map(u => 
          u.id === usuarioId ? { ...u, siguiendo: false } : u
        ));
      } else {
        // Remover de la lista de conexiones
        setConexiones(prev => prev.filter(c => c.id !== usuarioId));
      }
      
      // Actualizar estadísticas
      setEstadisticas(prev => ({
        ...prev,
        siguiendo: prev.siguiendo - 1,
        conexiones: prev.conexiones - 1
      }));
      
      showToast('Conexión eliminada', 'info');
    } catch (err) {
      console.error('Error dejando de seguir usuario:', err);
      showToast('Error al desconectar', 'error');
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(usuarioId);
        return next;
      });
    }
  };

  const handleSeguirEmpresa = async (empresaId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(`empresa-${empresaId}`));
      
      await empresaService.seguirEmpresa(empresaId);
      
      // Actualizar localmente
      setEmpresas(prev => prev.map(e => 
        e.id === empresaId ? { ...e, siguiendo: true } : e
      ));
      
      showToast('Ahora sigues a esta empresa', 'success');
    } catch (err) {
      console.error('Error siguiendo empresa:', err);
      showToast('Error al seguir empresa', 'error');
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(`empresa-${empresaId}`);
        return next;
      });
    }
  };

  const handleDejarDeSeguirEmpresa = async (empresaId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(`empresa-${empresaId}`));
      
      await empresaService.dejarDeSeguirEmpresa(empresaId);
      
      // Actualizar localmente
      setEmpresas(prev => prev.map(e => 
        e.id === empresaId ? { ...e, siguiendo: false } : e
      ));
      
      showToast('Dejaste de seguir a la empresa', 'info');
    } catch (err) {
      console.error('Error dejando de seguir empresa:', err);
      showToast('Error al dejar de seguir empresa', 'error');
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(`empresa-${empresaId}`);
        return next;
      });
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Filtrar usuarios por búsqueda
  const usuariosFiltrados = activeTab === 'sugerencias' 
    ? usuarios.filter(u => 
        u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : activeTab === 'conexiones'
    ? conexiones.filter(c => 
        c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []; // No filtrar empresas aquí

  const empresasFiltradas = activeTab === 'empresas'
    ? empresas.filter(e =>
        e.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.sector?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className={styles.redPage}>
        <div className={styles.loadingContainer}>
          <div className="loading-spinner"></div>
          <p>Cargando red...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.redPage}>
      {toast.show && (
        <Toast 
          message={toast.message}
          type={toast.type}
          show={toast.show}
          onClose={closeToast}
        />
      )}

      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Users size={32} />
          <div>
            <h1>Mi Red</h1>
            <p>Conecta con otros profesionales en JobPath</p>
          </div>
        </div>
      </header>

      {/* Estadísticas */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>{estadisticas.conexiones}</h3>
            <p>Conexiones</p>
          </div>
        </div>
      </div>

      {/* Buscador */}
      <div className={styles.searchBar}>
        <Search size={20} />
        <input 
          type="text" 
          placeholder={`Buscar ${activeTab === 'sugerencias' ? 'usuarios' : activeTab === 'conexiones' ? 'conexiones' : 'empresas'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'conexiones' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('conexiones')}
        >
          <UserCheck size={18} />
          Mis Conexiones ({estadisticas.conexiones})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'sugerencias' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('sugerencias')}
        >
          <UserPlus size={18} />
          Sugerencias ({usuarios.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'empresas' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('empresas')}
        >
          <Building2 size={18} />
          Empresas ({empresas.length})
        </button>
      </div>

      {/* Lista de usuarios o empresas */}
      <section className={styles.usersList}>
        {activeTab === 'empresas' ? (
          // Vista de empresas
          empresasFiltradas.length === 0 ? (
            <div className={styles.emptyState}>
              <Building2 size={64} />
              <p>
                {searchTerm 
                  ? 'No se encontraron empresas' 
                  : 'No hay empresas para mostrar'
                }
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {empresasFiltradas.map(empresa => {
                const isLoading = loadingActions.has(`empresa-${empresa.id}`);
                const siguiendo = empresa.siguiendo || false;

                return (
                  <div key={empresa.id} className={styles.userCard}>
                    <div className={styles.userAvatar}>
                      {empresa.logo ? (
                        <img 
                          src={empresa.logo} 
                          alt={empresa.nombre || 'Empresa'}
                          onError={(e) => { e.target.src = '/img/empresa-default.png'; }}
                        />
                      ) : (
                        <div className={styles.empresaPlaceholder}>
                          <Building2 size={32} />
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.userInfo}>
                      <h3>{empresa.nombre || 'Empresa'}</h3>
                      {empresa.sector && (
                        <p className={styles.empresaSector}>
                          <Briefcase size={14} />
                          {empresa.sector}
                        </p>
                      )}
                      {empresa.descripcion && (
                        <p className={styles.userBio}>{empresa.descripcion}</p>
                      )}
                      {empresa.ubicacion && (
                        <div className={styles.userLocation}>
                          <MapPin size={14} />
                          <span>{empresa.ubicacion}</span>
                        </div>
                      )}
                      {empresa.contadores && (
                        <div className={styles.userStats}>
                          <span>{empresa.contadores.seguidores || 0} seguidores</span>
                          <span>{empresa.contadores.ofertas || 0} ofertas</span>
                          <span>{empresa.contadores.desafios || 0} desafíos</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.userActions}>
                      <button 
                        className={styles.btnVerPerfil}
                        onClick={() => navigate(`/empresa/${empresa.id}`)}
                        title="Ver perfil de empresa"
                      >
                        <Eye size={16} />
                        Ver Perfil
                      </button>

                      <button 
                        className={siguiendo ? styles.btnConectado : styles.btnConectar}
                        onClick={() => siguiendo ? handleDejarDeSeguirEmpresa(empresa.id) : handleSeguirEmpresa(empresa.id)}
                        onMouseEnter={() => setHoveredEmpresaId(empresa.id)}
                        onMouseLeave={() => setHoveredEmpresaId(null)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="loading-spinner-small"></div>
                        ) : siguiendo ? (
                          <>
                            {hoveredEmpresaId === empresa.id ? (
                              <>
                                <UserX size={16} />
                                Dejar de seguir
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                Siguiendo
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Seguir
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          // Vista de usuarios
          usuariosFiltrados.length === 0 ? (
            <div className={styles.emptyState}>
              <Users size={64} />
              <p>
                {searchTerm 
                  ? 'No se encontraron resultados' 
                  : activeTab === 'sugerencias'
                  ? 'No hay usuarios para mostrar'
                  : 'Aún no tienes conexiones. Explora las sugerencias para conectar con otros profesionales.'
                }
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {usuariosFiltrados.map(usuario => {
                const isLoading = loadingActions.has(usuario.id);
                const siguiendo = usuario.siguiendo || false;

                return (
                  <div key={usuario.id} className={styles.userCard}>
                    <div className={styles.userAvatar}>
                      <img 
                        src={usuario.avatar || '/img/usuario.png'} 
                        alt={usuario.nombre || 'Usuario'}
                        onError={(e) => { e.target.src = '/img/usuario.png'; }}
                      />
                    </div>
                    
                    <div className={styles.userInfo}>
                      <h3>{usuario.nombre || 'Usuario'}</h3>
                      {usuario.bio && <p className={styles.userBio}>{usuario.bio}</p>}
                      {usuario.ubicacion && (
                        <div className={styles.userLocation}>
                          <MapPin size={14} />
                          <span>{usuario.ubicacion}</span>
                        </div>
                      )}
                      {usuario.contadores && (
                        <div className={styles.userStats}>
                          <span>{usuario.contadores.posts || 0} posts</span>
                          <span>{usuario.puntos || 0} pts</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.userActions}>
                      <button 
                        className={styles.btnVerPerfil}
                        onClick={() => navigate(`/perfil/${usuario.id}`)}
                        title="Ver perfil completo"
                      >
                        <Eye size={16} />
                        Ver Perfil
                      </button>

                      <button 
                        className={siguiendo ? styles.btnConectado : styles.btnConectar}
                        onClick={() => siguiendo ? handleDejarDeSeguir(usuario.id) : handleSeguir(usuario.id)}
                        onMouseEnter={() => setHoveredUserId(usuario.id)}
                        onMouseLeave={() => setHoveredUserId(null)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="loading-spinner-small"></div>
                        ) : siguiendo ? (
                          <>
                            {hoveredUserId === usuario.id ? (
                              <>
                                <UserX size={16} />
                                Desconectar
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                Conectado
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} />
                            Conectar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Red;
