/**
 * Servicios para Desafíos y Encargos
 * Endpoints: /desafios
 */
import API from '../../../services/api';

/**
 * Obtener todos los desafíos disponibles
 */
export const getDesafios = async (filtros = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filtros.categoria && filtros.categoria !== 'todos') {
      params.append('categoria', filtros.categoria);
    }
    if (filtros.dificultad && filtros.dificultad !== 'todas') {
      params.append('dificultad', filtros.dificultad);
    }
    if (filtros.estado && filtros.estado !== 'todos') {
      params.append('estado', filtros.estado);
    }
    
    const response = await API.get(`/desafios?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar desafíos' };
  }
};

/**
 * Obtener un desafío específico por ID
 */
export const getDesafioById = async (id) => {
  try {
    const response = await API.get(`/desafios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar el desafío' };
  }
};

/**
 * Participar en un desafío (guardarlo en mis desafíos)
 */
export const participarDesafio = async (desafioId) => {
  try {
    const response = await API.post(`/desafios/${desafioId}/participar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al participar en desafío' };
  }
};

/**
 * Quitar participación en un desafío
 */
export const quitarParticipacionDesafio = async (desafioId) => {
  try {
    const response = await API.delete(`/desafios/${desafioId}/participar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al quitar participación' };
  }
};

/**
 * Obtener mis desafíos (en los que participo)
 */
export const getMisDesafios = async () => {
  try {
    const response = await API.get('/desafios/mis-desafios/lista');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar mis desafíos' };
  }
};