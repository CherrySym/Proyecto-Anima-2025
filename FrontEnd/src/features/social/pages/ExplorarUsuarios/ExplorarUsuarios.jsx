import { useState } from 'react';
import { Users, Filter, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ExplorarUsuarios.module.css';

/**
 * Página Explorar Usuarios
 * Directorio de usuarios de la plataforma con filtros
 */
const ExplorarUsuarios = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    ubicacion: '',
    rol: '',
    busqueda: ''
  });

  // Mock data - preparado para backend
  const usuarios = [
    { id: 1, nombre: 'María González', rol: 'Diseñadora UX/UI', ubicacion: 'Montevideo', puntos: 1250, avatar: 'M' },
    { id: 2, nombre: 'Carlos Pérez', rol: 'Desarrollador Full Stack', ubicacion: 'Buenos Aires', puntos: 980, avatar: 'C' },
    { id: 3, nombre: 'Ana Martínez', rol: 'Product Manager', ubicacion: 'Santiago', puntos: 1500, avatar: 'A' },
    { id: 4, nombre: 'Luis Rodríguez', rol: 'Data Scientist', ubicacion: 'Lima', puntos: 870, avatar: 'L' },
    { id: 5, nombre: 'Sofía López', rol: 'Marketing Digital', ubicacion: 'Montevideo', puntos: 1100, avatar: 'S' },
    { id: 6, nombre: 'Diego Fernández', rol: 'DevOps Engineer', ubicacion: 'Buenos Aires', puntos: 940, avatar: 'D' },
    { id: 7, nombre: 'Valentina Castro', rol: 'Frontend Developer', ubicacion: 'Montevideo', puntos: 1320, avatar: 'V' },
    { id: 8, nombre: 'Mateo Silva', rol: 'Backend Developer', ubicacion: 'Santiago', puntos: 1050, avatar: 'M' }
  ];

  const ubicaciones = [...new Set(usuarios.map(u => u.ubicacion))];
  const roles = [...new Set(usuarios.map(u => u.rol))];

  const usuariosFiltrados = usuarios.filter(u => {
    const matchUbicacion = !filtros.ubicacion || u.ubicacion === filtros.ubicacion;
    const matchRol = !filtros.rol || u.rol === filtros.rol;
    const matchBusqueda = !filtros.busqueda || 
      u.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      u.rol.toLowerCase().includes(filtros.busqueda.toLowerCase());
    return matchUbicacion && matchRol && matchBusqueda;
  });

  return (
    <div className={styles.explorarPage}>
      <header className={styles.header}>
        <h1><Users size={32} /> Explorar Usuarios</h1>
        <p>Descubre profesionales en la plataforma</p>
      </header>

      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
          <MapPin size={18} />
          <select 
            value={filtros.ubicacion}
            onChange={(e) => setFiltros({...filtros, ubicacion: e.target.value})}
          >
            <option value="">Todas las ubicaciones</option>
            {ubicaciones.map(ub => (
              <option key={ub} value={ub}>{ub}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <Briefcase size={18} />
          <select 
            value={filtros.rol}
            onChange={(e) => setFiltros({...filtros, rol: e.target.value})}
          >
            <option value="">Todos los roles</option>
            {roles.map(rol => (
              <option key={rol} value={rol}>{rol}</option>
            ))}
          </select>
        </div>

        <div className={styles.searchInput}>
          <Filter size={18} />
          <input 
            type="text"
            placeholder="Buscar por nombre o rol..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
          />
        </div>
      </div>

      <div className={styles.results}>
        <p className={styles.count}>
          {usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? 'usuario encontrado' : 'usuarios encontrados'}
        </p>

        <div className={styles.grid}>
          {usuariosFiltrados.map(user => (
            <div 
              key={user.id} 
              className={styles.userCard}
              onClick={() => navigate(`/perfil/${user.id}`)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{user.avatar}</div>
                <div className={styles.points}>
                  ⭐ {user.puntos}
                </div>
              </div>
              
              <h3>{user.nombre}</h3>
              <p className={styles.rol}>{user.rol}</p>
              
              <div className={styles.location}>
                <MapPin size={14} />
                <span>{user.ubicacion}</span>
              </div>
              
              <button className={styles.btnView}>Ver Perfil</button>
            </div>
          ))}
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className={styles.empty}>
            <Users size={64} />
            <h3>No se encontraron usuarios</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorarUsuarios;
