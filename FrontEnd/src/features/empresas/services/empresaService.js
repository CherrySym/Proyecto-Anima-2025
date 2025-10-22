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
 * Obtener todas las empresas (públicamente disponibles)
 */
export const getAllEmpresas = async (filtros = {}) => {
  try {
    const params = new URLSearchParams();
    if (filtros.sector) params.append('sector', filtros.sector);
    if (filtros.search) params.append('search', filtros.search);
    
    const response = await API.get(`/empresas?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar empresas' };
  }
};

/**
 * Obtener una empresa por ID
 */
export const getEmpresaById = async (empresaId) => {
  try {
    const response = await API.get(`/empresas/${empresaId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar empresa' };
  }
};

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

// ==================== SEGUIR EMPRESAS ====================

/**
 * Seguir una empresa
 */
export const seguirEmpresa = async (empresaId) => {
  try {
    const response = await API.post(`/empresas/${empresaId}/seguir`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al seguir empresa' };
  }
};

/**
 * Dejar de seguir una empresa
 */
export const dejarDeSeguirEmpresa = async (empresaId) => {
  try {
    const response = await API.delete(`/empresas/${empresaId}/seguir`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al dejar de seguir empresa' };
  }
};

/**
 * Obtener empresas que sigue el usuario
 */
export const getEmpresasSeguidas = async () => {
  try {
    const response = await API.get('/empresas/seguidas/mis-empresas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar empresas seguidas' };
  }
};

/**
 * Verificar si el usuario sigue a empresas específicas
 */
export const verificarSeguimientoEmpresas = async (empresaIds) => {
  try {
    const params = new URLSearchParams({ empresaIds: empresaIds.join(',') });
    const response = await API.get(`/empresas/seguimiento/verificar?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al verificar seguimiento' };
  }
};
