import { createContext, useContext, useState, useEffect } from 'react';

// Context para manejar la autenticación del usuario
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado del usuario logueado, se carga desde localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userName');
    const savedLastname = localStorage.getItem('userLastname');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedUser && savedLastname && savedEmail) {
      return {
        name: savedUser,
        lastname: savedLastname,
        email: savedEmail
      };
    }
    return null;
  });

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userLastname', userData.lastname);
    localStorage.setItem('userEmail', userData.email);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastname');
    localStorage.removeItem('userEmail');
  };

  // Función para actualizar el perfil
  const updateProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('userName', newUser.name);
    localStorage.setItem('userLastname', newUser.lastname);
    localStorage.setItem('userEmail', newUser.email);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
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
