import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../../services/userService';
import * as conexionesService from '../../../services/conexionesService';
import { getCursos } from '../../../features/cursos/services/cursosService';
import * as empresaService from '../../../features/empresas/services/empresaService';
import { UserPlus, UserCheck, UserX, BookOpen, ExternalLink, Building2 } from 'lucide-react';
import styles from './Sidebar.module.css';
// import './Sidebar.css'; // backup preserved as Sidebar.css (commented)

const Sidebar = () => {
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingActions, setLoadingActions] = useState(new Set());
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [hoveredEmpresaId, setHoveredEmpresaId] = useState(null);
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  useEffect(() => {
    cargarUsuariosSugeridos();
    cargarCursosRecomendados();
    cargarEmpresasDestacadas();
  }, []);

  const cargarUsuariosSugeridos = async () => {
    try {
      setLoadingUsers(true);
      const usuarios = await getAllUsers();
      // Tomar solo los primeros 3 usuarios
      setSuggestedUsers((usuarios || []).slice(0, 3));
    } catch (err) {
      console.error('Error cargando usuarios sugeridos:', err);
      setSuggestedUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSeguir = async (usuarioId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(usuarioId));
      await conexionesService.seguirUsuario(usuarioId);
      
      // Actualizar estado local
      setSuggestedUsers(prev => prev.map(u => 
        u.id === usuarioId ? { ...u, siguiendo: true } : u
      ));
    } catch (err) {
      console.error('Error siguiendo usuario:', err);
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(usuarioId);
        return next;
      });
    }
  };

  const cargarCursosRecomendados = async () => {
    try {
      setLoadingCourses(true);
      const cursos = await getCursos();
      // Tomar solo los primeros 3 cursos
      setRecommendedCourses((cursos || []).slice(0, 3));
    } catch (err) {
      console.error('Error cargando cursos recomendados:', err);
      setRecommendedCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const cargarEmpresasDestacadas = async () => {
    try {
      setLoadingCompanies(true);
      const empresas = await empresaService.getAllEmpresas();
      // Tomar solo las primeras 3 empresas
      setFeaturedCompanies((empresas || []).slice(0, 3));
    } catch (err) {
      console.error('Error cargando empresas:', err);
      setFeaturedCompanies([]);
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleDejarDeSeguir = async (usuarioId) => {
    try {
      setLoadingActions(prev => new Set(prev).add(usuarioId));
      await conexionesService.dejarDeSeguirUsuario(usuarioId);
      
      // Actualizar estado local
      setSuggestedUsers(prev => prev.map(u => 
        u.id === usuarioId ? { ...u, siguiendo: false } : u
      ));
    } catch (err) {
      console.error('Error dejando de seguir:', err);
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
      
      // Actualizar estado local
      setFeaturedCompanies(prev => prev.map(e => 
        e.id === empresaId ? { ...e, siguiendo: true } : e
      ));
    } catch (err) {
      console.error('Error siguiendo empresa:', err);
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
      
      // Actualizar estado local
      setFeaturedCompanies(prev => prev.map(e => 
        e.id === empresaId ? { ...e, siguiendo: false } : e
      ));
    } catch (err) {
      console.error('Error dejando de seguir empresa:', err);
    } finally {
      setLoadingActions(prev => {
        const next = new Set(prev);
        next.delete(`empresa-${empresaId}`);
        return next;
      });
    }
  };

  return (
    <div className={styles['sidebar']}>
      {/* Usuarios sugeridos */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Conecta con colegas</h3>
        <div className={styles['suggested-users']}>
          {loadingUsers ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading-spinner-small"></div>
            </div>
          ) : suggestedUsers.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
              No hay sugerencias disponibles
            </p>
          ) : (
            suggestedUsers.map(user => {
              const isLoading = loadingActions.has(user.id);
              const siguiendo = user.siguiendo || false;
              
              return (
                <div key={user.id} className={styles['suggested-user']}>
                  <div 
                    className={styles['user-link']}
                    onClick={() => navigate(`/perfil/${user.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={user.avatar || '/img/usuario.png'} 
                      alt={user.nombre || user.name} 
                      className={styles['user-avatar']}
                      onError={(e) => { e.target.src = '/img/usuario.png'; }}
                    />
                    <div className={styles['user-info']}>
                      <h4 className={styles['user-name']}>{user.nombre || user.name || 'Usuario'}</h4>
                      <p className={styles['user-profession']}>
                        {user.profesion || user.profession || 'Miembro de JobPath'}
                      </p>
                      {user.ubicacion && (
                        <span className={styles['mutual-connections']}>
                          {user.ubicacion}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    className={`${styles['follow-btn']} ${siguiendo ? styles['following'] : ''}`}
                    onClick={() => siguiendo ? handleDejarDeSeguir(user.id) : handleSeguir(user.id)}
                    onMouseEnter={() => setHoveredUserId(user.id)}
                    onMouseLeave={() => setHoveredUserId(null)}
                    disabled={isLoading}
                    title={siguiendo ? 'Desconectar' : 'Conectar'}
                  >
                    {isLoading ? (
                      <div className="loading-spinner-small"></div>
                    ) : siguiendo ? (
                      hoveredUserId === user.id ? (
                        <>
                          <UserX size={14} />
                          Desconectar
                        </>
                      ) : (
                        <>
                          <UserCheck size={14} />
                          Conectado
                        </>
                      )
                    ) : (
                      <>
                        <UserPlus size={14} />
                        Conectar
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
        <Link to="/red" className={styles['see-all-link']}>
          Ver más personas
        </Link>
      </div>

      {/* Cursos recomendados */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Cursos para ti</h3>
        <div className={styles['recommended-courses']}>
          {loadingCourses ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading-spinner-small"></div>
            </div>
          ) : recommendedCourses.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px', fontSize: '14px' }}>
              No hay cursos disponibles
            </p>
          ) : (
            recommendedCourses.map(course => (
              <div 
                key={course.id} 
                className={styles['recommended-course']}
                onClick={() => navigate(`/cursos?cursoId=${course.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles['course-info']}>
                  <h4 className={styles['course-title']}>
                    <BookOpen size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                    {course.titulo || course.title || 'Curso'}
                  </h4>
                  <p className={styles['course-provider']}>
                    {course.proveedor || course.provider || 'Proveedor externo'}
                  </p>
                  {course.area && (
                    <span className={styles['course-area']}>
                      {course.area.charAt(0).toUpperCase() + course.area.slice(1)}
                    </span>
                  )}
                </div>
                <button 
                  className={styles['course-btn']}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cursos?cursoId=${course.id}`);
                  }}
                >
                  <ExternalLink size={14} />
                  Ver curso
                </button>
              </div>
            ))
          )}
        </div>
        <Link to="/cursos" className={styles['see-all-link']}>
          Explorar más cursos
        </Link>
      </div>

      {/* Empresas destacadas */}
      <div className={styles['sidebar-widget']}>
        <h3 className={styles['widget-title']}>Empresas destacadas</h3>
        <div className={styles['featured-companies']}>
          {loadingCompanies ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading-spinner-small"></div>
            </div>
          ) : featuredCompanies.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px', fontSize: '14px' }}>
              No hay empresas disponibles
            </p>
          ) : (
            featuredCompanies.map(company => {
              const isLoading = loadingActions.has(`empresa-${company.id}`);
              const siguiendo = company.siguiendo || false;

              return (
                <div key={company.id} className={styles['featured-company']}>
                  <div 
                    className={styles['company-link']}
                    onClick={() => navigate(`/empresa/${company.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.nombre || company.name} 
                        className={styles['company-logo']}
                        onError={(e) => { e.target.src = '/img/empresa-default.png'; }}
                      />
                    ) : (
                      <div className={styles['company-logo']} style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <Building2 size={24} />
                      </div>
                    )}
                    <div className={styles['company-info']}>
                      <h4 className={styles['company-name']}>
                        {company.nombre || company.name || 'Empresa'}
                      </h4>
                      <p className={styles['company-sector']}>
                        {company.sector || 'Sector no especificado'}
                      </p>
                      {company.ubicacion && (
                        <span className={styles['open-positions']}>
                          {company.ubicacion}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    className={siguiendo ? `${styles['follow-company-btn']} ${styles['following']}` : styles['follow-company-btn']}
                    onClick={() => siguiendo ? handleDejarDeSeguirEmpresa(company.id) : handleSeguirEmpresa(company.id)}
                    onMouseEnter={() => setHoveredEmpresaId(company.id)}
                    onMouseLeave={() => setHoveredEmpresaId(null)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner-small"></div>
                    ) : siguiendo ? (
                      <>
                        {hoveredEmpresaId === company.id ? (
                          <>
                            <UserX size={14} />
                            Dejar de seguir
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} />
                            Siguiendo
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        Seguir
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
        <Link to="/red?tab=empresas" className={styles['see-all-link']}>
          Ver más empresas
        </Link>
      </div>

      {/* Widget de actividad reciente - Pendiente de implementación */}
      <div className={`${styles['sidebar-widget']} ${styles['activity-widget']}`}>
        <h3 className={styles['widget-title']}>Actividad reciente</h3>
        <div className={styles['recent-activity']}>
          <p style={{ textAlign: 'center', color: '#999', padding: '30px 20px', fontSize: '14px' }}>
            Próximamente verás aquí las interacciones más recientes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;