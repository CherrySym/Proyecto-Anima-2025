import api from './api';

/**
 * Servicio para gestionar publicaciones (posts)
 */

/**
 * Obtener todas las publicaciones del feed
 * @returns {Promise} - Lista de publicaciones
 */
export const getAllPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo posts:', error);
    throw error;
  }
};

/**
 * Obtener publicación por ID
 * @param {number} postId - ID de la publicación
 * @returns {Promise} - Datos de la publicación
 */
export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo post:', error);
    throw error;
  }
};

/**
 * Crear una nueva publicación
 * @param {Object} postData - Datos de la publicación
 * @returns {Promise} - Publicación creada
 */
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creando post:', error);
    throw error;
  }
};

/**
 * Actualizar una publicación
 * @param {number} postId - ID de la publicación
 * @param {Object} postData - Datos actualizados
 * @returns {Promise} - Publicación actualizada
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando post:', error);
    throw error;
  }
};

/**
 * Eliminar una publicación
 * @param {number} postId - ID de la publicación
 * @returns {Promise}
 */
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando post:', error);
    throw error;
  }
};

/**
 * Dar like a una publicación
 * @param {number} postId - ID de la publicación
 * @returns {Promise}
 */
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error dando like:', error);
    throw error;
  }
};

/**
 * Quitar like de una publicación
 * @param {number} postId - ID de la publicación
 * @returns {Promise}
 */
export const unlikePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error quitando like:', error);
    throw error;
  }
};

/**
 * Agregar comentario a una publicación
 * @param {number} postId - ID de la publicación
 * @param {Object} commentData - Datos del comentario
 * @returns {Promise}
 */
export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error agregando comentario:', error);
    throw error;
  }
};

/**
 * Obtener publicaciones de un usuario
 * @param {number} userId - ID del usuario
 * @returns {Promise} - Lista de publicaciones del usuario
 */
export const getUserPosts = async (userId) => {
  try {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo posts del usuario:', error);
    throw error;
  }
};

/**
 * Obtener publicaciones de una empresa
 * @param {number} companyId - ID de la empresa
 * @returns {Promise} - Lista de publicaciones de la empresa
 */
export const getCompanyPosts = async (companyId) => {
  try {
    const response = await api.get(`/posts/company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo posts de la empresa:', error);
    throw error;
  }
};
