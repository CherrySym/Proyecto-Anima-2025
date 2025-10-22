import API from './api';

/**
 * Servicio para gestionar usuarios
 */

/**
 * Obtener información de un usuario por ID
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - Datos del usuario
 */
export const getUserById = async (usuarioId) => {
  try {
    const response = await API.get(`/users/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};

/**
 * Obtener todos los usuarios
 * @returns {Promise} - Lista de usuarios
 */
export const getAllUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};

/**
 * Actualizar perfil de usuario
 * @param {number} usuarioId - ID del usuario
 * @param {Object} userData - Datos a actualizar
 * @returns {Promise} - Usuario actualizado
 */
export const updateUser = async (usuarioId, userData) => {
  try {
    const response = await API.put(`/users/${usuarioId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
};

/**
 * NOTA: Follow/Unfollow NO están implementados en el backend MVP
 * Estas funciones están deshabilitadas temporalmente
 */

/**
 * Seguir a un usuario (NO IMPLEMENTADO - Próximamente)
 * @param {number} usuarioId - ID del usuario a seguir
 * @returns {Promise}
 */
export const followUser = async (usuarioId) => {
  console.warn('⚠️ Follow/Unfollow no implementado en MVP');
  throw new Error('Funcionalidad no disponible en MVP');
  // try {
  //   const response = await API.post(`/usuarios/${usuarioId}/follow`);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error siguiendo usuario:', error);
  //   throw error;
  // }
};

/**
 * Dejar de seguir a un usuario (NO IMPLEMENTADO - Próximamente)
 * @param {number} usuarioId - ID del usuario a dejar de seguir
 * @returns {Promise}
 */
export const unfollowUser = async (usuarioId) => {
  console.warn('⚠️ Follow/Unfollow no implementado en MVP');
  throw new Error('Funcionalidad no disponible en MVP');
  // try {
  //   const response = await API.delete(`/usuarios/${usuarioId}/follow`);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error dejando de seguir usuario:', error);
  //   throw error;
  // }
};

/**
 * Obtener seguidores de un usuario (NO IMPLEMENTADO - Próximamente)
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - Lista de seguidores
 */
export const getFollowers = async (usuarioId) => {
  console.warn('⚠️ Follow/Unfollow no implementado en MVP');
  throw new Error('Funcionalidad no disponible en MVP');
  // try {
  //   const response = await API.get(`/usuarios/${usuarioId}/followers`);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error obteniendo seguidores:', error);
  //   throw error;
  // }
};

/**
 * Obtener usuarios seguidos (NO IMPLEMENTADO - Próximamente)
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - Lista de usuarios seguidos
 */
export const getFollowing = async (usuarioId) => {
  console.warn('⚠️ Follow/Unfollow no implementado en MVP');
  throw new Error('Funcionalidad no disponible en MVP');
  // try {
  //   const response = await API.get(`/usuarios/${usuarioId}/following`);
  //   return response.data;
  // } catch (error) {
  //   console.error('Error obteniendo seguidos:', error);
  //   throw error;
  // }
};
