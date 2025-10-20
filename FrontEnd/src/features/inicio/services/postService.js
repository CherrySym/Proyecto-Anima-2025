import api from '../../../services/api';

/**
 * Servicio para gestionar publicaciones (posts), likes y comentarios
 */

// ========== POSTS ==========

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
 * @param {Object} postData - Datos de la publicación { contenido, imagenUrl? }
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
 * @param {Object} postData - Datos actualizados { contenido?, imagenUrl? }
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
 * Obtener publicaciones de un usuario específico
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - Lista de publicaciones del usuario
 */
export const getUserPosts = async (usuarioId) => {
  try {
    const response = await api.get(`/posts/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo posts del usuario:', error);
    throw error;
  }
};

/**
 * Obtener publicaciones de una empresa específica
 * @param {number} empresaId - ID de la empresa
 * @returns {Promise} - Lista de publicaciones de la empresa
 */
export const getCompanyPosts = async (empresaId) => {
  try {
    const response = await api.get(`/posts/empresa/${empresaId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo posts de la empresa:', error);
    throw error;
  }
};

// ========== LIKES ==========

/**
 * Dar o quitar like a una publicación (toggle)
 * @param {number} postId - ID de la publicación
 * @returns {Promise} - Estado actualizado { liked: boolean, totalLikes: number }
 */
export const toggleLike = async (postId) => {
  try {
    const response = await api.post('/likes/toggle', { postId });
    // Normalizar campos para el frontend
    const d = response.data || {};
    return {
      liked: d.isLiked ?? d.liked ?? false,
      totalLikes: d.likesCount ?? d.totalLikes ?? 0
    };
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};

/**
 * Verificar si el usuario actual dio like a un post
 * @param {number} postId - ID de la publicación
 * @returns {Promise} - { liked: boolean }
 */
export const checkLike = async (postId) => {
  try {
    const response = await api.get(`/likes/check/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error verificando like:', error);
    throw error;
  }
};

/**
 * Obtener todos los likes de una publicación
 * @param {number} postId - ID de la publicación
 * @returns {Promise} - Lista de likes con información de usuarios
 */
export const getPostLikes = async (postId) => {
  try {
    const response = await api.get(`/likes/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo likes:', error);
    throw error;
  }
};

// ========== COMENTARIOS ==========

/**
 * Agregar un comentario a una publicación
 * @param {Object} data - Datos del comentario { postId, contenido, parentId? }
 * @returns {Promise} - Comentario creado
 */
export const addComment = async (data) => {
  try {
    const response = await api.post('/comentarios', data);
    return response.data;
  } catch (error) {
    console.error('Error agregando comentario:', error);
    throw error;
  }
};

/**
 * Obtener todos los comentarios de una publicación
 * @param {number} postId - ID de la publicación
 * @returns {Promise} - Lista de comentarios (incluye respuestas anidadas)
 */
export const getPostComments = async (postId) => {
  try {
    const response = await api.get(`/comentarios/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    throw error;
  }
};

/**
 * Obtener un comentario específico por ID
 * @param {number} comentarioId - ID del comentario
 * @returns {Promise} - Datos del comentario
 */
export const getCommentById = async (comentarioId) => {
  try {
    const response = await api.get(`/comentarios/${comentarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo comentario:', error);
    throw error;
  }
};

/**
 * Actualizar un comentario
 * @param {number} comentarioId - ID del comentario
 * @param {Object} data - Datos actualizados { contenido }
 * @returns {Promise} - Comentario actualizado
 */
export const updateComment = async (comentarioId, data) => {
  try {
    const response = await api.put(`/comentarios/${comentarioId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando comentario:', error);
    throw error;
  }
};

/**
 * Eliminar un comentario
 * @param {number} comentarioId - ID del comentario
 * @returns {Promise}
 */
export const deleteComment = async (comentarioId) => {
  try {
    const response = await api.delete(`/comentarios/${comentarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando comentario:', error);
    throw error;
  }
};

/**
 * Obtener respuestas de un comentario (comentarios hijos)
 * @param {number} parentId - ID del comentario padre
 * @returns {Promise} - Lista de respuestas
 */
export const getCommentReplies = async (parentId) => {
  try {
    const response = await api.get(`/comentarios/parent/${parentId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo respuestas:', error);
    throw error;
  }
};
