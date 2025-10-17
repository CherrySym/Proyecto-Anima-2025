import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle } from 'lucide-react';
import './Login.css';

/**
 * Página Login - Ahora con conexión real al backend
 * Endpoints: POST /auth/login
 */
const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  // Estados para el formulario
  const [formData, setFormData] = useState({
    tipoUsuario: 'USUARIO',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo específico
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    const { tipoUsuario, email, password } = formData;

    // Validaciones por campo
    let hasErrors = false;
    const newErrors = { email: '', password: '', general: '' };

    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio';
      hasErrors = true;
    } else if (!email.includes('@')) {
      newErrors.email = "El email debe contener '@'";
      hasErrors = true;
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Llamar al login del contexto
    const result = await login({ tipoUsuario, email, password });

    if (result.success) {
            // Redirigir al feed después de un login exitoso
      navigate('/feed');
    } else {
      setErrors({ 
        email: '', 
        password: '', 
        general: result.error || 'Error al iniciar sesión' 
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button 
          onClick={() => navigate('/')} 
          className="btn-volver-atras"
        >
          Volver Atrás
        </button>

        <h1>BIENVENIDO</h1>
        <h3>----------------------------------------------------</h3>
        <h1>Iniciar Sesión</h1>

        {errors.general && (
          <div style={{ 
            color: '#721c24', 
            marginBottom: '15px', 
            padding: '12px', 
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '5px'
          }}>
            ❌ {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="tipoUsuario">Tipo de Usuario</label>
          <select
            id="tipoUsuario"
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
          >
            <option value="USUARIO">Usuario / Joven</option>
            <option value="EMPRESA">Empresa</option>
          </select>

          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            style={errors.email ? { borderColor: '#dc3545' } : {}}
            required
          />
          {errors.email && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '0.875em', 
              marginTop: '-10px',
              marginBottom: '10px',
              display: 'block'
            }}>
              <AlertTriangle size={14} /> {errors.email}
            </span>
          )}

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={errors.password ? { borderColor: '#dc3545' } : {}}
            required
          />
          {errors.password && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '0.875em', 
              marginTop: '-10px',
              marginBottom: '10px',
              display: 'block'
            }}>
              <AlertTriangle size={14} /> {errors.password}
            </span>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          ¿No tienes cuenta? <a href="/register" style={{ color: '#4f4fcf' }}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
