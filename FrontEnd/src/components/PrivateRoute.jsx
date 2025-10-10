import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente PrivateRoute
 * Protege rutas que requieren autenticación
 * Redirige a /login si no hay usuario logueado
 */
const PrivateRoute = ({ children, requireAdult = false }) => {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Verificando autenticación...
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere ser adulto y el usuario es menor de 18, mostrar mensaje
  if (requireAdult && user.tipoUsuario === 'USUARIO' && user.edad < 18) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2>🚫 Acceso Restringido</h2>
        <p>Esta función está disponible solo para usuarios mayores de 18 años.</p>
        <p>Puedes acceder a orientación vocacional, cursos y desafíos en otras secciones.</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4f4fcf',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Volver Atrás
        </button>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;