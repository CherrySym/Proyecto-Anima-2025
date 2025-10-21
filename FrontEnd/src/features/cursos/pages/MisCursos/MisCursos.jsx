import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { getMisCursosGuardados, quitarCursoGuardado } from '../../services/cursosService';
import { GraduationCap, ExternalLink, Trash2, Calendar } from 'lucide-react';
import Toast from '../../../../components/common/Toast/Toast';
import styles from './MisCursos.module.css';
// import './MisCursos.css'; // comentado: backup

/**
 * Página Mis Cursos
 * Muestra los cursos que el usuario ha guardado como favoritos
 * Diferente de /cursos que muestra TODOS los cursos disponibles
 */
const MisCursos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cursosGuardados, setCursosGuardados] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCursosGuardados();
  }, [user, navigate]);

  const loadCursosGuardados = async () => {
    await withMinLoadingTime(async () => {
      try {
        const data = await getMisCursosGuardados();
        setCursosGuardados(data);
      } catch (error) {
        console.error('Error al cargar cursos guardados:', error);
        setCursosGuardados([]);
      }
    });
  };

  const handleQuitarCurso = async (cursoId) => {
    if (!confirm('¿Estás seguro de quitar este curso de tus guardados?')) {
      return;
    }

    try {
      await quitarCursoGuardado(cursoId);
      // Actualizar lista eliminando el curso
      setCursosGuardados(prev => prev.filter(curso => curso.id !== cursoId));
      setToast({ message: 'Curso eliminado del perfil', type: 'success' });
    } catch (error) {
      console.error('Error al quitar curso:', error);
      setToast({ 
        message: error.error || 'Error al quitar curso', 
        type: 'error' 
      });
    }
  };

  const handleVerCurso = (curso) => {
    window.open(curso.url, '_blank');
  };

  const handleExploreMasCursos = () => {
    navigate('/cursos');
  };

  if (loading) {
    return (
      <div className={styles['mis-cursos-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando tus cursos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['mis-cursos-page']}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <main className={styles['mis-cursos-content']}>
        {/* Header */}
        <div className={styles['page-header']}>
          <div className={styles['header-content']}>
            <h1><GraduationCap size={32} /> Mis Cursos Guardados</h1>
            <p>Cursos que has marcado como favoritos para estudiar</p>
          </div>
          <button 
            className={styles['btn-explorar']}
            onClick={handleExploreMasCursos}
          >
            + Explorar más cursos
          </button>
        </div>

        {/* Lista de cursos guardados */}
        {cursosGuardados.length === 0 ? (
          <div className={styles['empty-state']}>
            <GraduationCap size={64} />
            <h3>No tienes cursos guardados</h3>
            <p>Explora nuestro catálogo y guarda los cursos que te interesen</p>
            <button 
              className={styles['btn-explorar']}
              onClick={handleExploreMasCursos}
            >
              Explorar Cursos
            </button>
          </div>
        ) : (
          <div className={styles['cursos-grid']}>
            {cursosGuardados.map(curso => (
              <div key={curso.id} className={styles['curso-card']}>
                <div className={styles['curso-header']}>
                  <h3>{curso.titulo}</h3>
                  <button 
                    className={styles['btn-quitar']}
                    onClick={() => handleQuitarCurso(curso.id)}
                    title="Quitar de guardados"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p className={styles['curso-descripcion']}>{curso.descripcion}</p>

                <div className={styles['curso-info']}>
                  <div className={styles['info-item']}>
                    <strong>Proveedor:</strong> {curso.proveedor}
                  </div>
                  <div className={styles['info-item']}>
                    <strong>Nivel:</strong> {curso.nivel}
                  </div>
                  <div className={styles['info-item']}>
                    <strong>Área:</strong> {curso.area}
                  </div>
                  {curso.duracion && (
                    <div className={styles['info-item']}>
                      <strong>Duración:</strong> {curso.duracion}
                    </div>
                  )}
                  {curso.costo && (
                    <div className={styles['info-item']}>
                      <strong>Costo:</strong> {curso.costo}
                    </div>
                  )}
                  {curso.fechaGuardado && (
                    <div className={styles['info-item']}>
                      <Calendar size={14} /> Guardado: {new Date(curso.fechaGuardado).toLocaleDateString('es-AR')}
                    </div>
                  )}
                </div>

                <button 
                  className={styles['btn-ver-curso']}
                  onClick={() => handleVerCurso(curso)}
                >
                  <ExternalLink size={16} /> Ver Curso
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MisCursos;
