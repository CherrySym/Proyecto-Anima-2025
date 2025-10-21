import { useState } from 'react';
import { Users, UserPlus, UserMinus, Search } from 'lucide-react';
import styles from './Red.module.css';

/**
 * Página Mi Red - Conexiones y seguidores
 * Funcionalidad básica lista para expansión futura
 */
const Red = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - preparado para integración con API
  const connections = [
    { id: 1, nombre: 'María González', rol: 'Diseñadora UX', conectado: true },
    { id: 2, nombre: 'Carlos Pérez', rol: 'Desarrollador Full Stack', conectado: true },
    { id: 3, nombre: 'Ana Martínez', rol: 'Product Manager', conectado: false }
  ];

  const filteredConnections = connections.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.redPage}>
      <header className={styles.header}>
        <h1><Users size={32} /> Mi Red</h1>
        <p>Gestiona tus conexiones y expande tu red profesional</p>
      </header>

      <div className={styles.searchBar}>
        <Search size={20} />
        <input 
          type="text" 
          placeholder="Buscar en mi red..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>{connections.filter(c => c.conectado).length}</h3>
          <p>Conexiones</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Seguidores</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Siguiendo</p>
        </div>
      </div>

      <section className={styles.connectionsList}>
        <h2>Mis Conexiones</h2>
        {filteredConnections.length === 0 ? (
          <p className={styles.empty}>No se encontraron conexiones</p>
        ) : (
          <div className={styles.grid}>
            {filteredConnections.map(conn => (
              <div key={conn.id} className={styles.card}>
                <div className={styles.avatar}>{conn.nombre[0]}</div>
                <div className={styles.info}>
                  <h3>{conn.nombre}</h3>
                  <p>{conn.rol}</p>
                </div>
                <button className={conn.conectado ? styles.btnConnected : styles.btnConnect}>
                  {conn.conectado ? (
                    <><UserMinus size={16} /> Conectado</>
                  ) : (
                    <><UserPlus size={16} /> Conectar</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Red;
