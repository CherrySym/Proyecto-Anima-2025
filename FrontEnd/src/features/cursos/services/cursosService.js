/**
 * Servicios para Cursos y Talleres
 * Endpoints: /cursos
 */
import API from '../../../services/api';

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
    if (filtros.proveedor && filtros.proveedor !== 'todos') {
      params.append('proveedor', filtros.proveedor);
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
 * Guardar un curso (agregar a favoritos)
 */
export const guardarCurso = async (cursoId) => {
  try {
    const response = await API.post(`/cursos/${cursoId}/guardar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al guardar curso' };
  }
};

/**
 * Quitar un curso guardado
 */
export const quitarCursoGuardado = async (cursoId) => {
  try {
    const response = await API.delete(`/cursos/${cursoId}/guardar`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al quitar curso' };
  }
};

/**
 * Obtener cursos guardados del usuario
 */
export const getMisCursosGuardados = async () => {
  try {
    const response = await API.get('/cursos/mis-cursos/guardados');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cargar cursos guardados' };
  }
};