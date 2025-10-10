/**
 * Configuración de Axios para comunicación con el backend
 * Base URL: http://localhost:4000
 */
import axios from 'axios';

// Crear instancia de axios con configuración base
const API = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar el token JWT en cada petición
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró, limpiar localStorage y redirigir a login
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLastname');
      localStorage.removeItem('userEmail');
      // No redirigimos aquí, dejamos que el componente lo maneje
    }
    return Promise.reject(error);
  }
);

export default API;
