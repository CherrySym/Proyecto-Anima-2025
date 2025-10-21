import { useState } from 'react';
import { Search, Filter, Users, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Busqueda.module.css';

/**
 * Página de Búsqueda Global
 * Permite buscar usuarios, empresas, ofertas, cursos y desafíos
 */
const Busqueda = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('TODO');

  // Mock data - preparado para integración con backend
  const results = {
    usuarios: [
      { id: 1, nombre: 'María González', rol: 'Diseñadora UX', ubicacion: 'Montevideo' },
      { id: 2, nombre: 'Carlos Pérez', rol: 'Desarrollador Full Stack', ubicacion: 'Buenos Aires' }
    ],
    empresas: [
      { id: 1, nombre: 'Globant', sector: 'Tecnología', ubicacion: 'Uruguay' },
      { id: 2, nombre: 'MercadoLibre', sector: 'E-commerce', ubicacion: 'Argentina' }
    ],
    ofertas: [
      { id: 1, titulo: 'Desarrollador Frontend', empresa: 'Globant', ubicacion: 'Remoto' },
      { id: 2, titulo: 'Diseñador UX/UI', empresa: 'MercadoLibre', ubicacion: 'Montevideo' }
    ],
    cursos: [
      { id: 1, titulo: 'React Avanzado', instructor: 'Udemy', duracion: '40 horas' },
      { id: 2, titulo: 'Diseño UX/UI', instructor: 'Coursera', duracion: '30 horas' }
    ],
    desafios: [
      { id: 1, titulo: 'Challenge Frontend', empresa: 'Globant', dificultad: 'Media' },
      { id: 2, titulo: 'Design Sprint', empresa: 'MercadoLibre', dificultad: 'Alta' }
    ]
  };

  const tabs = [
    { id: 'TODO', label: 'Todo', icon: <Search size={18} /> },
    { id: 'USUARIOS', label: 'Usuarios', icon: <Users size={18} /> },
    { id: 'OFERTAS', label: 'Ofertas', icon: <Briefcase size={18} /> },
    { id: 'CURSOS', label: 'Cursos', icon: <GraduationCap size={18} /> },
    { id: 'DESAFIOS', label: 'Desafíos', icon: <Trophy size={18} /> }
  ];

  return (
    <div className={styles.busquedaPage}>
      <header className={styles.header}>
        <h1><Search size={32} /> Búsqueda</h1>
        <p>Encuentra usuarios, ofertas, cursos y más</p>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <Search size={24} />
          <input 
            type="text"
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button className={styles.filterBtn}>
            <Filter size={20} /> Filtros
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? styles.active : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.results}>
        {!searchTerm ? (
          <div className={styles.emptyState}>
            <Search size={64} />
            <h3>Comienza tu búsqueda</h3>
            <p>Escribe algo en el buscador para encontrar contenido</p>
          </div>
        ) : (
          <>
            {(activeTab === 'TODO' || activeTab === 'USUARIOS') && (
              <section className={styles.section}>
                <h2><Users size={24} /> Usuarios</h2>
                <div className={styles.grid}>
                  {results.usuarios.map(user => (
                    <div key={user.id} className={styles.card} onClick={() => navigate(`/perfil/${user.id}`)}>
                      <div className={styles.avatar}>{user.nombre[0]}</div>
                      <h3>{user.nombre}</h3>
                      <p>{user.rol}</p>
                      <span className={styles.location}>{user.ubicacion}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'TODO' || activeTab === 'OFERTAS') && (
              <section className={styles.section}>
                <h2><Briefcase size={24} /> Ofertas</h2>
                <div className={styles.list}>
                  {results.ofertas.map(oferta => (
                    <div key={oferta.id} className={styles.listItem} onClick={() => navigate(`/oferta/${oferta.id}`)}>
                      <Briefcase size={20} />
                      <div>
                        <h4>{oferta.titulo}</h4>
                        <p>{oferta.empresa} • {oferta.ubicacion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'TODO' || activeTab === 'CURSOS') && (
              <section className={styles.section}>
                <h2><GraduationCap size={24} /> Cursos</h2>
                <div className={styles.list}>
                  {results.cursos.map(curso => (
                    <div key={curso.id} className={styles.listItem} onClick={() => navigate(`/cursos`)}>
                      <GraduationCap size={20} />
                      <div>
                        <h4>{curso.titulo}</h4>
                        <p>{curso.instructor} • {curso.duracion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(activeTab === 'TODO' || activeTab === 'DESAFIOS') && (
              <section className={styles.section}>
                <h2><Trophy size={24} /> Desafíos</h2>
                <div className={styles.list}>
                  {results.desafios.map(desafio => (
                    <div key={desafio.id} className={styles.listItem} onClick={() => navigate(`/desafios`)}>
                      <Trophy size={20} />
                      <div>
                        <h4>{desafio.titulo}</h4>
                        <p>{desafio.empresa} • Dificultad: {desafio.dificultad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Busqueda;
