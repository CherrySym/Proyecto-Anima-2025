import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import { getDesafioById } from '../../services/desafiosService';
import { Target, ArrowLeft, Building2, Calendar, Trophy, Star, Clock, Users } from 'lucide-react';
import styles from './DesafioDetalle.module.css';

/**
 * Página de detalle de un desafío
 * Muestra información completa y permite participar
 */
const DesafioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [desafio, setDesafio] = useState(null);
  const { loading, withMinLoadingTime } = useMinLoadingTime(800);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDesafio();
  }, [id]);

  const loadDesafio = async () => {
    await withMinLoadingTime(async () => {
      try {
        const data = await getDesafioById(id);
        setDesafio(data);
      } catch (error) {
        console.error('Error al cargar desafío:', error);
        setError('No se pudo cargar el desafío');
      }
    });
  };

  const handleParticipar = () => {
    if (!user) {
      alert('Debes iniciar sesión para participar en desafíos');
      navigate('/login');
      return;
    }

    // TODO: Implementar lógica de participación en futuras versiones
    alert('Funcionalidad de participación en desarrollo. ¡Pronto disponible!');
  };

  const getDificultadColor = (dificultad) => {
    const normalized = dificultad?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    switch(normalized) {
      case 'facil': return '#28a745';
      case 'medio': return '#ffc107';
      case 'dificil': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getDificultadIcon = (dificultad) => {
    const normalized = dificultad?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    switch(normalized) {
      case 'facil': return <Star size={16} fill="currentColor" />;
      case 'medio': return <><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></>;
      case 'dificil': return <><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></>;
      default: return <Star size={16} />;
    }
  };

  if (loading) {
    return (
      <div className={styles['desafio-detalle-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando desafío...</p>
        </div>
      </div>
    );
  }

  if (error || !desafio) {
    return (
      <div className={styles['desafio-detalle-page']}>
        <div className={styles['error-container']}>
          <h2>😕 Desafío no encontrado</h2>
          <p>{error || 'El desafío que buscas no existe o ha sido eliminado'}</p>
          <button onClick={() => navigate('/desafios')} className={styles['btn-volver']}>
            <ArrowLeft size={16} /> Volver a desafíos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['desafio-detalle-page']}>
      <div className={styles['desafio-content']}>
        {/* Header con botón volver */}
        <button onClick={() => navigate('/desafios')} className={styles['btn-back']}>
          <ArrowLeft size={18} /> Volver a desafíos
        </button>

        {/* Card principal */}
        <div className={styles['desafio-card']}>
          {/* Header del desafío */}
          <div className={styles['desafio-header']}>
            <div className={styles['header-top']}>
              <div className={styles['empresa-info']}>
                <Building2 size={20} />
                <span>{desafio.empresa?.nombre || 'Empresa'}</span>
              </div>
              <div 
                className={styles['dificultad-badge']}
                style={{ color: getDificultadColor(desafio.dificultad) }}
              >
                {getDificultadIcon(desafio.dificultad)}
                <span>{desafio.dificultad}</span>
              </div>
            </div>
            <h1>{desafio.titulo}</h1>
          </div>

          {/* Descripción */}
          <div className={styles['desafio-body']}>
            <section className={styles['section']}>
              <h2>📋 Descripción del desafío</h2>
              <p className={styles['descripcion']}>{desafio.descripcion}</p>
            </section>

            {/* Información adicional */}
            <section className={styles['section']}>
              <h2>ℹ️ Información</h2>
              <div className={styles['info-grid']}>
                <div className={styles['info-item']}>
                  <Trophy size={18} />
                  <div>
                    <strong>Recompensa</strong>
                    <span>{desafio.recompensa} puntos</span>
                  </div>
                </div>
                <div className={styles['info-item']}>
                  <Target size={18} />
                  <div>
                    <strong>Categoría</strong>
                    <span>{desafio.categoria}</span>
                  </div>
                </div>
                <div className={styles['info-item']}>
                  <Calendar size={18} />
                  <div>
                    <strong>Publicado</strong>
                    <span>{new Date(desafio.createdAt).toLocaleDateString('es-AR')}</span>
                  </div>
                </div>
                <div className={styles['info-item']}>
                  <Clock size={18} />
                  <div>
                    <strong>Estado</strong>
                    <span className={desafio.activo ? styles['activo'] : styles['inactivo']}>
                      {desafio.activo ? 'Disponible' : 'Cerrado'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Sobre la empresa */}
            {desafio.empresa?.descripcion && (
              <section className={styles['section']}>
                <h2>🏢 Sobre {desafio.empresa.nombre}</h2>
                <p className={styles['empresa-descripcion']}>{desafio.empresa.descripcion}</p>
              </section>
            )}
          </div>

          {/* Footer con acciones */}
          <div className={styles['desafio-footer']}>
            {user?.tipo === 'ADOLESCENTE' && (
              <p className={styles['advertencia']}>
                ⚠️ Como menor de 18 años, puedes participar pero las recompensas monetarias estarán disponibles cuando cumplas 18 años.
              </p>
            )}
            <button 
              className={styles['btn-participar']}
              onClick={handleParticipar}
              disabled={!desafio.activo}
            >
              {desafio.activo ? 'Participar en este desafío' : 'Desafío cerrado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesafioDetalle;
