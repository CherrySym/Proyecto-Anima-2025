import API from './api';

/**
 * Servicio para gestionar conexiones entre usuarios
 */

/**
 * Seguir a un usuario
 * @param {number} usuarioId - ID del usuario a seguir
 * @returns {Promise} - Datos de la conexión creada
 */
export const seguirUsuario = async (usuarioId) => {
  try {
    const response = await API.post(`/conexiones/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error siguiendo usuario:', error);
    throw error;
  }
};

/**
 * Dejar de seguir a un usuario
 * @param {number} usuarioId - ID del usuario a dejar de seguir
 * @returns {Promise}
 */
export const dejarDeSeguirUsuario = async (usuarioId) => {
  try {
    const response = await API.delete(`/conexiones/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error dejando de seguir usuario:', error);
    throw error;
  }
};

/**
 * Obtener usuarios que sigo
 * @returns {Promise} - Lista de usuarios que sigo
 */
export const obtenerSiguiendo = async () => {
  try {
    const response = await API.get('/conexiones/siguiendo');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo siguiendo:', error);
    throw error;
  }
};

/**
 * Obtener usuarios que me siguen
 * @returns {Promise} - Lista de seguidores
 */
export const obtenerSeguidores = async () => {
  try {
    const response = await API.get('/conexiones/seguidores');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo seguidores:', error);
    throw error;
  }
};

/**
 * Verificar si sigo a un usuario
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - { siguiendo: boolean }
 */
export const verificarConexion = async (usuarioId) => {
  try {
    const response = await API.get(`/conexiones/check/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error verificando conexión:', error);
    throw error;
  }
};

/**
 * Obtener estadísticas de conexiones
 * @returns {Promise} - { siguiendo, seguidores, conexiones }
 */
export const obtenerEstadisticas = async () => {
  try {
    const response = await API.get('/conexiones/stats');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
};
