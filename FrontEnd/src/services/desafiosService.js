/**
 * Servicios para Desafíos y Encargos
 * Endpoints: /desafios
 */
import API from './api';

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
 * Participar en un desafío
 */
export const participarDesafio = async (desafioId) => {
  try {
    const response = await API.post(`/desafios/${desafioId}/participar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al participar en el desafío' };
  }
};

/**
 * Enviar solución de un desafío
 */
export const enviarSolucionDesafio = async (desafioId, solucion) => {
  try {
    const formData = new FormData();
    
    if (solucion.descripcion) {
      formData.append('descripcion', solucion.descripcion);
    }
    
    if (solucion.archivos && solucion.archivos.length > 0) {
      solucion.archivos.forEach((archivo, index) => {
        formData.append(`archivo_${index}`, archivo);
      });
    }
    
    if (solucion.url) {
      formData.append('url', solucion.url);
    }
    
    const response = await API.post(`/desafios/${desafioId}/solucion`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al enviar solución' };
  }
};

/**
 * Obtener mis desafíos (participados/completados)
 */
export const getMisDesafios = async () => {
  try {
    const response = await API.get('/desafios/mis-desafios');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar mis desafíos' };
  }
};