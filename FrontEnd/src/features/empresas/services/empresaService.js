/**
 * Servicios para gestión de empresas
 * Endpoints: /empresas, /ofertas, /postulaciones
 */
import API from '../../../services/api';

// ==================== OFERTAS ====================

/**
 * Obtener todas las ofertas de la empresa actual
 */
export const getOfertasEmpresa = async () => {
  try {
    const response = await API.get('/ofertas/mis-ofertas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar ofertas' };
  }
};

/**
 * Crear una nueva oferta laboral
 */
export const crearOferta = async (ofertaData) => {
  try {
    const response = await API.post('/ofertas', ofertaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al crear oferta' };
  }
};

/**
 * Actualizar una oferta existente
 */
export const actualizarOferta = async (id, ofertaData) => {
  try {
    const response = await API.put(`/ofertas/${id}`, ofertaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al actualizar oferta' };
  }
};

/**
 * Eliminar (desactivar) una oferta
 */
export const eliminarOferta = async (id) => {
  try {
    const response = await API.delete(`/ofertas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al eliminar oferta' };
  }
};

// ==================== POSTULACIONES ====================

/**
 * Obtener postulaciones de una oferta específica
 */
export const getPostulacionesByOferta = async (ofertaId) => {
  try {
    const response = await API.get(`/postulaciones/oferta/${ofertaId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar postulaciones' };
  }
};

/**
 * Actualizar estado de una postulación (aceptar/rechazar)
 */
export const actualizarPostulacion = async (postulacionId, estado) => {
  try {
    const response = await API.put(`/postulaciones/${postulacionId}`, { estado });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al actualizar postulación' };
  }
};

// ==================== EMPRESA ====================

/**
 * Obtener datos de la empresa actual
 */
export const getEmpresaActual = async () => {
  try {
    const response = await API.get('/empresas/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar empresa' };
  }
};

/**
 * Actualizar datos de la empresa
 */
export const actualizarEmpresa = async (empresaData) => {
  try {
    const response = await API.put('/empresas/me', empresaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al actualizar empresa' };
  }
};
