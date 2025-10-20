/**
 * Servicios para Ofertas Laborales
 * Endpoints: /ofertas
 */
import API from '../../../services/api';

/**
 * Obtener todas las ofertas laborales
 */
export const getOfertas = async (filtros = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filtros.area && filtros.area !== 'todas') {
      params.append('area', filtros.area);
    }
    if (filtros.busqueda) {
      params.append('search', filtros.busqueda);
    }
    
    const response = await API.get(`/ofertas?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar ofertas' };
  }
};

/**
 * Obtener una oferta específica por ID
 */
export const getOfertaById = async (id) => {
  try {
    const response = await API.get(`/ofertas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar la oferta' };
  }
};

/**
 * Postularse a una oferta laboral
 */
export const postularseOferta = async (ofertaId) => {
  try {
    const response = await API.post(`/postulaciones`, {
      ofertaId: ofertaId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al postularse' };
  }
};

/**
 * Obtener postulaciones del usuario actual
 */
export const getMisPostulaciones = async () => {
  try {
    const response = await API.get('/postulaciones/mis-postulaciones');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar postulaciones' };
  }
};