/**
 * Servicios para Desafíos y Encargos
 * 
 * ⚠️ ADVERTENCIA MVP: Desafíos NO están implementados en el backend actualmente
 * Este servicio está DESHABILITADO hasta que se implemente la funcionalidad completa
 * Todas las funciones lanzarán un error indicando que la característica no está disponible
 * 
 * Endpoints: /desafios (NO IMPLEMENTADOS)
 */
import API from '../../../services/api';

const MVP_WARNING = '⚠️ DESAFÍOS: Funcionalidad no disponible en MVP. Próximamente.';

/**
 * Obtener todos los desafíos disponibles (NO IMPLEMENTADO)
 */
export const getDesafios = async (filtros = {}) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
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
  */
};

/**
 * Obtener un desafío específico por ID (NO IMPLEMENTADO)
 */
export const getDesafioById = async (id) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.get(`/desafios/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar el desafío' };
  }
  */
};

/**
 * Participar en un desafío (NO IMPLEMENTADO)
 */
export const participarDesafio = async (desafioId) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.post(`/desafios/${desafioId}/participar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al participar en el desafío' };
  }
  */
};

/**
 * Enviar solución de un desafío (NO IMPLEMENTADO)
 */
export const enviarSolucionDesafio = async (desafioId, solucion) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
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
  */
};

/**
 * Obtener mis desafíos (participados/completados) (NO IMPLEMENTADO)
 */
export const getMisDesafios = async () => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.get('/desafios/mis-desafios');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar mis desafíos' };
  }
  */
};