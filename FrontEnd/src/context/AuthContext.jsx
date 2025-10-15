import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

// Context para manejar la autenticación del usuario
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado del usuario logueado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario desde token al iniciar la aplicación
  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Timeout de 5 segundos para evitar loading infinito
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout de conexión')), 5000)
          );
          
          const response = await Promise.race([
            authService.getCurrentUser(),
            timeoutPromise
          ]);
          
          // Dependiendo del tipo, extraer los datos correctos
          if (response.tipoUsuario === 'USUARIO') {
            const userData = {
              id: response.user.id,
              nombre: response.user.nombre,
              email: response.user.email,
              edad: response.user.edad, // Edad calculada por el backend
              tipo: response.user.tipo, // ADOLESCENTE o JOVEN
              rol: response.user.rol, // USUARIO o ADMIN
              avatar: response.user.avatar,
              bio: response.user.bio,
              ubicacion: response.user.ubicacion,
              puntos: response.user.puntos,
              tipoUsuario: 'USUARIO'
            };
            setUser(userData);
          } else if (response.tipoUsuario === 'EMPRESA') {
            const empresaData = {
              id: response.empresa.id,
              nombre: response.empresa.nombre,
              email: response.empresa.email,
              descripcion: response.empresa.descripcion,
              logo: response.empresa.logo,
              sector: response.empresa.sector,
              ubicacion: response.empresa.ubicacion,
              tipoUsuario: 'EMPRESA'
            };
            setUser(empresaData);
          }
        }
      } catch (err) {
        // Si el token es inválido o hay error de conexión, limpiar todo
        
        // Distintos tipos de errores
        if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error') || err.message.includes('Timeout')) {
          setError('Backend no disponible. La app funcionará sin autenticación.');
        } else {
          authService.logout();
        }
        
        setUser(null);
      } finally {
        // SIEMPRE establecer loading en false
        setLoading(false);
      }
    };

    loadUserFromToken();
  }, []);

  /**
   * Login con backend real
   * @param {Object} credentials - {tipoUsuario, email, password}
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Si el login fue exitoso, obtener datos completos del usuario
      if (response.token) {
        try {
          const userData = await authService.getCurrentUser();
          
          // Guardar datos según el tipo
          if (userData.tipoUsuario === 'USUARIO') {
            setUser({
              id: userData.user.id,
              nombre: userData.user.nombre,
              email: userData.user.email,
              edad: userData.user.edad,
              tipo: userData.user.tipo,
              rol: userData.user.rol,
              avatar: userData.user.avatar,
              bio: userData.user.bio,
              ubicacion: userData.user.ubicacion,
              puntos: userData.user.puntos,
              tipoUsuario: 'USUARIO'
            });
          } else if (userData.tipoUsuario === 'EMPRESA') {
            setUser({
              id: userData.empresa.id,
              nombre: userData.empresa.nombre,
              email: userData.empresa.email,
              descripcion: userData.empresa.descripcion,
              logo: userData.empresa.logo,
              sector: userData.empresa.sector,
              ubicacion: userData.empresa.ubicacion,
              tipoUsuario: 'EMPRESA'
            });
          }
          
          return { success: true, user: userData };
        } catch (err) {
          // Si falla obtener datos, hacer fallback a decodificación de token
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const fallbackUser = {
            id: payload.id,
            tipo: payload.tipo,
            email: credentials.email,
            nombre: credentials.email.split('@')[0],
            tipoUsuario: credentials.tipoUsuario
          };
          setUser(fallbackUser);
          return { success: true, user: fallbackUser };
        }
      }
    } catch (err) {
      const errorMessage = err.error || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registro de nuevo usuario/empresa
   * @param {Object} userData - Datos de registro
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.register(userData);
      
      // Después de registrar, hacer login automático
      const loginResult = await login({
        tipoUsuario: userData.tipoUsuario,
        email: userData.email,
        password: userData.password
      });
      
      return loginResult;
    } catch (err) {
      const errorMessage = err.error || 'Error en el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  /**
   * Actualizar perfil (temporal hasta implementar endpoint)
   */
  const updateProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('userName', newUser.nombre || newUser.name);
    localStorage.setItem('userEmail', newUser.email);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register,
      logout, 
      updateProfile,
      isAuthenticated: authService.isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
