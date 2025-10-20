/**
 * Servicios para Cursos y Talleres
 * 
 * ⚠️ ADVERTENCIA MVP: Cursos NO están implementados en el backend actualmente
 * Este servicio está DESHABILITADO hasta que se implemente la funcionalidad completa
 * Todas las funciones lanzarán un error indicando que la característica no está disponible
 * 
 * Endpoints: /cursos (NO IMPLEMENTADOS)
 */
import API from '../../../services/api';

const MVP_WARNING = '⚠️ CURSOS: Funcionalidad no disponible en MVP. Próximamente.';

/**
 * Obtener todos los cursos disponibles (NO IMPLEMENTADO)
 */
export const getCursos = async (filtros = {}) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const params = new URLSearchParams();
    
    if (filtros.area && filtros.area !== 'todas') {
      params.append('area', filtros.area);
    }
    if (filtros.nivel && filtros.nivel !== 'todos') {
      params.append('nivel', filtros.nivel);
    }
    if (filtros.modalidad && filtros.modalidad !== 'todas') {
      params.append('modalidad', filtros.modalidad);
    }
    if (filtros.precio && filtros.precio !== 'todos') {
      params.append('precio', filtros.precio);
    }
    
    const response = await API.get(`/cursos?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar cursos' };
  }
  */
};

/**
 * Obtener un curso específico por ID (NO IMPLEMENTADO)
 */
export const getCursoById = async (id) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.get(`/cursos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar el curso' };
  }
  */
};

/**
 * Marcar un curso como favorito (NO IMPLEMENTADO)
 */
export const toggleFavoritoCurso = async (cursoId) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.post(`/cursos/${cursoId}/favorito`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al marcar como favorito' };
  }
  */
};

/**
 * Obtener cursos favoritos del usuario (NO IMPLEMENTADO)
 */
export const getCursosFavoritos = async () => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.get('/cursos/favoritos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar cursos favoritos' };
  }
  */
};

/**
 * Registrar progreso en un curso (NO IMPLEMENTADO)
 */
export const registrarProgresoCurso = async (cursoId, progreso) => {
  console.warn(MVP_WARNING);
  throw new Error(MVP_WARNING);
  
  /* CÓDIGO DESHABILITADO TEMPORALMENTE
  try {
    const response = await API.post(`/cursos/${cursoId}/progreso`, {
      porcentaje: progreso.porcentaje,
      leccionActual: progreso.leccionActual,
      tiempoEstudio: progreso.tiempoEstudio
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al registrar progreso' };
  }
  */
};