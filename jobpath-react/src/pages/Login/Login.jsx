import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

/**
 * Página Login - Migrado desde registro/login.html
 * Maneja el formulario de inicio de sesión con validación
 * Usa el hook useAuth para gestionar el estado de autenticación
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: ''
  });

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  // Migrado desde el addEventListener del HTML original
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, lastname, email } = formData;

    // Validaciones
    if (!name.trim() || !lastname.trim() || !email.trim()) {
      alert('No se pudo ingresar: todos los campos son obligatorios');
      return;
    }

    if (!email.includes('@')) {
      alert("No se pudo ingresar: el correo debe contener '@'");
      return;
    }

    // Guardar datos y redirigir
    login({ name, lastname, email });
    alert('Login exitoso');
    navigate('/perfil');
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

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastname">Apellido</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
