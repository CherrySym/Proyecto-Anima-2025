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