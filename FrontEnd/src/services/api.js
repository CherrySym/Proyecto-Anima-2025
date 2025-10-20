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
    console.log('🔑 API Interceptor - Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    console.log('📍 Request:', config.method?.toUpperCase(), config.baseURL + (config.url || ''));
    if (!config.headers) config.headers = {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Authorization header agregado');
    } else {
      console.warn('⚠️ No hay token en localStorage');
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en interceptor request:', error?.message);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
API.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config?.url);
    return response;
  },
  (error) => {
    console.error('❌ Error en response:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    // Si el token expiró, limpiar localStorage SOLO si el mensaje lo confirma
    // Evitamos limpiar en errores transitorios o de autorización de operación específica
    if (error.response?.status === 401 || error.response?.status === 403) {
      const errorMsg = error.response?.data?.error || '';
      if (errorMsg.includes('Token') || errorMsg.includes('sesión') || errorMsg.includes('inválido')) {
        console.warn('🚪 Token inválido/expirado. Limpiando almacenamiento local.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLastname');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
      } else {
        console.warn('⚠️ Error de autorización (operación no permitida), token preservado');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
