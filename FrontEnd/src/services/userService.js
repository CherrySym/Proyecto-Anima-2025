import api from './api';

/**
 * Servicio para gestionar usuarios
 */

/**
 * Obtener información de un usuario por ID
 * @param {number} userId - ID del usuario
 * @returns {Promise} - Datos del usuario
 */
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
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
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};

/**
 * Actualizar perfil de usuario
 * @param {number} userId - ID del usuario
 * @param {Object} userData - Datos a actualizar
 * @returns {Promise} - Usuario actualizado
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
};

/**
 * Seguir a un usuario
 * @param {number} userId - ID del usuario a seguir
 * @returns {Promise}
 */
export const followUser = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    console.error('Error siguiendo usuario:', error);
    throw error;
  }
};

/**
 * Dejar de seguir a un usuario
 * @param {number} userId - ID del usuario a dejar de seguir
 * @returns {Promise}
 */
export const unfollowUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    console.error('Error dejando de seguir usuario:', error);
    throw error;
  }
};

/**
 * Obtener seguidores de un usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise} - Lista de seguidores
 */
export const getFollowers = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo seguidores:', error);
    throw error;
  }
};

/**
 * Obtener usuarios seguidos
 * @param {number} userId - ID del usuario
 * @returns {Promise} - Lista de usuarios seguidos
 */
export const getFollowing = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/following`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo seguidos:', error);
    throw error;
  }
};
