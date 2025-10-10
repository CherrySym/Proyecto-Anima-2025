/**
 * Servicios para Cursos y Talleres
 * Endpoints: /cursos
 */
import API from './api';

/**
 * Obtener todos los cursos disponibles
 */
export const getCursos = async (filtros = {}) => {
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
};

/**
 * Obtener un curso específico por ID
 */
export const getCursoById = async (id) => {
  try {
    const response = await API.get(`/cursos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar el curso' };
  }
};

/**
 * Marcar un curso como favorito
 */
export const toggleFavoritoCurso = async (cursoId) => {
  try {
    const response = await API.post(`/cursos/${cursoId}/favorito`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al marcar como favorito' };
  }
};

/**
 * Obtener cursos favoritos del usuario
 */
export const getCursosFavoritos = async () => {
  try {
    const response = await API.get('/cursos/favoritos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar cursos favoritos' };
  }
};

/**
 * Registrar progreso en un curso
 */
export const registrarProgresoCurso = async (cursoId, progreso) => {
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
};