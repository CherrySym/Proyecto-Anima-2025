import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useMinLoadingTime } from '../../../../hooks/useMinLoadingTime';
import * as empresaService from '../../services/empresaService';
import { Briefcase, Plus, Edit2, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import styles from './PanelEmpresa.module.css';

/**
 * Panel de administración para empresas
 * - Ver ofertas publicadas
 * - Crear/editar/eliminar ofertas
 * - Gestionar postulaciones (aceptar/rechazar)
 */
const PanelEmpresa = () => {
  const { user } = useAuth();
  const [ofertas, setOfertas] = useState([]);
  const { loading, withMinLoadingTime } = useMinLoadingTime(600);
  const [error, setError] = useState(null);
  const [verPostulaciones, setVerPostulaciones] = useState(null); // ID de oferta seleccionada
  const [postulaciones, setPostulaciones] = useState([]);
  const [showCrearOferta, setShowCrearOferta] = useState(false);
  const [editandoOferta, setEditandoOferta] = useState(null);

  useEffect(() => {
    if (user?.tipoUsuario === 'EMPRESA') {
      loadOfertas();
    }
  }, [user]);

  const loadOfertas = async () => {
    await withMinLoadingTime(async () => {
      try {
        setError(null);
        const data = await empresaService.getOfertasEmpresa();
        setOfertas(data);
      } catch (err) {
        setError('Error al cargar ofertas. Mostrando mock data.');
        // Fallback mock data
        setOfertas([
          {
            id: 1,
            titulo: 'Desarrollador Frontend Junior',
            area: 'tecnologia',
            activa: true,
            createdAt: '2025-10-01',
            _count: { postulaciones: 8 }
          }
        ]);
      }
    });
  };

  const loadPostulaciones = async (ofertaId) => {
    try {
      const data = await empresaService.getPostulacionesByOferta(ofertaId);
      setPostulaciones(data);
      setVerPostulaciones(ofertaId);
    } catch (err) {
      alert('Error al cargar postulaciones');
    }
  };

  const handleAceptarPostulacion = async (postulacionId) => {
    try {
      await empresaService.actualizarPostulacion(postulacionId, 'ACEPTADA');
      // Actualizar lista local
      setPostulaciones(postulaciones.map(p => 
        p.id === postulacionId ? { ...p, estado: 'ACEPTADA' } : p
      ));
      alert('Postulación aceptada. El usuario será notificado.');
    } catch (err) {
      alert('Error al aceptar postulación');
    }
  };

  const handleRechazarPostulacion = async (postulacionId) => {
    try {
      await empresaService.actualizarPostulacion(postulacionId, 'RECHAZADA');
      setPostulaciones(postulaciones.map(p => 
        p.id === postulacionId ? { ...p, estado: 'RECHAZADA' } : p
      ));
      alert('Postulación rechazada.');
    } catch (err) {
      alert('Error al rechazar postulación');
    }
  };

  const handleDesactivarOferta = async (ofertaId) => {
    if (!confirm('¿Desactivar esta oferta? Ya no recibirá más postulaciones.')) return;
    
    try {
      await empresaService.actualizarOferta(ofertaId, { activa: false });
      setOfertas(ofertas.map(o => 
        o.id === ofertaId ? { ...o, activa: false } : o
      ));
      alert('Oferta desactivada');
    } catch (err) {
      alert('Error al desactivar oferta');
    }
  };

  if (user?.tipoUsuario !== 'EMPRESA') {
    return (
      <div className={styles.panel}>
        <div className={styles.accessDenied}>
          <h2>Acceso Denegado</h2>
          <p>Esta sección es solo para empresas.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.panel}>
        <div className={styles.loading}>
          <div className="loading-spinner"></div>
          <p>Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <h1><Briefcase size={24} /> Panel de Empresa</h1>
        <p>Gestiona tus ofertas laborales y postulaciones</p>
      </header>

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={() => setShowCrearOferta(true)}>
          <Plus size={18} /> Crear Nueva Oferta
        </button>
      </div>

      {/* Lista de ofertas */}
      <section className={styles.ofertas}>
        <h2>Mis Ofertas ({ofertas.length})</h2>
        
        {ofertas.length === 0 ? (
          <div className={styles.empty}>
            <p>No tienes ofertas publicadas aún.</p>
            <button className={styles.btnPrimary} onClick={() => setShowCrearOferta(true)}>
              <Plus size={18} /> Publicar tu primera oferta
            </button>
          </div>
        ) : (
          <div className={styles.ofertasGrid}>
            {ofertas.map(oferta => (
              <div key={oferta.id} className={`${styles.ofertaCard} ${!oferta.activa ? styles.inactive : ''}`}>
                <div className={styles.ofertaHeader}>
                  <h3>{oferta.titulo}</h3>
                  <span className={`${styles.badge} ${oferta.activa ? styles.active : styles.inactive}`}>
                    {oferta.activa ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                
                <div className={styles.ofertaInfo}>
                  <p><strong>Área:</strong> {oferta.area || 'N/A'}</p>
                  <p><strong>Publicada:</strong> {new Date(oferta.createdAt).toLocaleDateString('es-ES')}</p>
                  <p><strong>Postulaciones:</strong> {oferta._count?.postulaciones || 0}</p>
                </div>

                <div className={styles.ofertaActions}>
                  <button 
                    className={styles.btnIcon}
                    onClick={() => loadPostulaciones(oferta.id)}
                    title="Ver postulaciones"
                  >
                    <Eye size={18} /> Ver Postulaciones
                  </button>
                  
                  <button 
                    className={styles.btnIcon}
                    onClick={() => setEditandoOferta(oferta)}
                    title="Editar"
                  >
                    <Edit2 size={18} />
                  </button>
                  
                  {oferta.activa && (
                    <button 
                      className={`${styles.btnIcon} ${styles.danger}`}
                      onClick={() => handleDesactivarOferta(oferta.id)}
                      title="Desactivar"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal/Panel de postulaciones */}
      {verPostulaciones && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
              <h2>Postulaciones</h2>
              <button 
                className={styles.btnClose}
                onClick={() => setVerPostulaciones(null)}
              >
                ✕
              </button>
            </header>

            {postulaciones.length === 0 ? (
              <p className={styles.empty}>No hay postulaciones aún para esta oferta.</p>
            ) : (
              <div className={styles.postulaciones}>
                {postulaciones.map(postulacion => (
                  <div key={postulacion.id} className={styles.postulacionCard}>
                    <div className={styles.candidato}>
                      <img 
                        src={postulacion.usuario?.avatar || '/img/usuario.png'} 
                        alt={postulacion.usuario?.nombre}
                        className={styles.avatar}
                      />
                      <div>
                        <h4>{postulacion.usuario?.nombre || 'Usuario'}</h4>
                        <p>{postulacion.usuario?.email}</p>
                        <p><small>Postulado: {new Date(postulacion.createdAt).toLocaleDateString('es-ES')}</small></p>
                      </div>
                    </div>

                    <div className={styles.estadoActions}>
                      <span className={`${styles.estado} ${styles[postulacion.estado.toLowerCase()]}`}>
                        {postulacion.estado}
                      </span>

                      {postulacion.estado === 'PENDIENTE' && (
                        <div className={styles.actions}>
                          <button 
                            className={`${styles.btn} ${styles.success}`}
                            onClick={() => handleAceptarPostulacion(postulacion.id)}
                          >
                            <CheckCircle size={16} /> Aceptar
                          </button>
                          <button 
                            className={`${styles.btn} ${styles.danger}`}
                            onClick={() => handleRechazarPostulacion(postulacion.id)}
                          >
                            <XCircle size={16} /> Rechazar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Crear/Editar Oferta */}
      {(showCrearOferta || editandoOferta) && (
        <FormularioOferta
          oferta={editandoOferta}
          onClose={() => {
            setShowCrearOferta(false);
            setEditandoOferta(null);
          }}
          onSuccess={() => {
            loadOfertas();
            setShowCrearOferta(false);
            setEditandoOferta(null);
          }}
        />
      )}
    </div>
  );
};

/**
 * Formulario para crear/editar ofertas
 */
const FormularioOferta = ({ oferta, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: oferta?.titulo || '',
    descripcion: oferta?.descripcion || '',
    area: oferta?.area || 'tecnologia',
    tipoContrato: oferta?.tipoContrato || 'TIEMPO_COMPLETO',
    modalidad: oferta?.modalidad || 'PRESENCIAL',
    ubicacion: oferta?.ubicacion || '',
    salario: oferta?.salario || '',
    requisitos: oferta?.requisitos || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (oferta) {
        // Editar oferta existente
        await empresaService.actualizarOferta(oferta.id, formData);
        alert('✓ Oferta actualizada correctamente');
      } else {
        // Crear nueva oferta
        await empresaService.crearOferta(formData);
        alert('✓ Oferta creada correctamente');
      }
      onSuccess();
    } catch (err) {
      alert('Error: ' + (err.message || 'No se pudo guardar la oferta'));
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ maxWidth: '600px' }}>
        <header className={styles.modalHeader}>
          <h2>{oferta ? 'Editar Oferta' : 'Crear Nueva Oferta'}</h2>
          <button className={styles.btnClose} onClick={onClose}>✕</button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Título de la oferta *</label>
            <input 
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              required
              placeholder="ej: Desarrollador Frontend Junior"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Descripción *</label>
            <textarea 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
              rows="5"
              placeholder="Describe el puesto, responsabilidades..."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Área *</label>
              <select 
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
              >
                <option value="tecnologia">Tecnología</option>
                <option value="marketing">Marketing</option>
                <option value="ventas">Ventas</option>
                <option value="administracion">Administración</option>
                <option value="recursos_humanos">Recursos Humanos</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Tipo de Contrato *</label>
              <select 
                value={formData.tipoContrato}
                onChange={(e) => setFormData({...formData, tipoContrato: e.target.value})}
              >
                <option value="TIEMPO_COMPLETO">Tiempo Completo</option>
                <option value="MEDIO_TIEMPO">Medio Tiempo</option>
                <option value="PASANTIA">Pasantía</option>
                <option value="FREELANCE">Freelance</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Modalidad *</label>
              <select 
                value={formData.modalidad}
                onChange={(e) => setFormData({...formData, modalidad: e.target.value})}
              >
                <option value="PRESENCIAL">Presencial</option>
                <option value="REMOTO">Remoto</option>
                <option value="HIBRIDO">Híbrido</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Ubicación</label>
              <input 
                type="text"
                value={formData.ubicacion}
                onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                placeholder="ej: Montevideo, Uruguay"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Salario (opcional)</label>
            <input 
              type="text"
              value={formData.salario}
              onChange={(e) => setFormData({...formData, salario: e.target.value})}
              placeholder="ej: $1000 - $1500 USD"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Requisitos</label>
            <textarea 
              value={formData.requisitos}
              onChange={(e) => setFormData({...formData, requisitos: e.target.value})}
              rows="3"
              placeholder="Educación, experiencia, habilidades..."
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.btnSecondary}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {oferta ? 'Guardar Cambios' : 'Publicar Oferta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanelEmpresa;
