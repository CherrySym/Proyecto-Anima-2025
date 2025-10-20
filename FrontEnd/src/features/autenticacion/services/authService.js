/**
 * Servicios de autenticación
 * Endpoints: /auth/register, /auth/login
 */
import API from '../../../services/api';

/**
 * Registro de usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.tipoUsuario - 'USUARIO' | 'EMPRESA'
 * @param {string} userData.nombre
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {number} userData.edad - Solo para usuarios
 * @param {string} userData.descripcion - Solo para empresas
 */
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error en el registro' };
  }
};

/**
 * Login de usuario o empresa
 * @param {Object} credentials
 * @param {string} credentials.tipoUsuario - 'USUARIO' | 'EMPRESA'
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    
    // Guardar token en localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error en el login' };
  }
};

/**
 * Logout - Limpiar datos locales
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userLastname');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  localStorage.removeItem('userType');
};

/**
 * Verificar si hay sesión activa
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Obtener datos del usuario/empresa actual
 * Requiere token válido en localStorage
 */
export const getCurrentUser = async () => {
  try {
    const response = await API.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al obtener datos del usuario' };
  }
};
