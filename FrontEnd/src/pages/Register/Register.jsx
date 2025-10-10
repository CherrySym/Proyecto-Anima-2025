import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

/**
 * Página de Registro
 * Permite registro de Usuarios (jóvenes) y Empresas
 * Conectado con backend: POST /auth/register
 */
const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  // Estados del formulario
  const [formData, setFormData] = useState({
    tipoUsuario: 'USUARIO',
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: '',
    descripcion: '',
    general: ''
  });
  const [success, setSuccess] = useState(false);

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo específico
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  // Validaciones
  const validateForm = () => {
    const { tipoUsuario, nombre, email, password, confirmPassword, edad, descripcion } = formData;
    const newErrors = {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      edad: '',
      descripcion: '',
      general: ''
    };
    let hasErrors = false;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
      hasErrors = true;
    }

    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio';
      hasErrors = true;
    } else if (!email.includes('@')) {
      newErrors.email = 'El email debe contener @';
      hasErrors = true;
    }

    if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      hasErrors = true;
    }

    if (tipoUsuario === 'USUARIO') {
      if (!edad || edad < 13 || edad > 100) {
        newErrors.edad = 'La edad debe estar entre 13 y 100 años';
        hasErrors = true;
      }
    }

    if (tipoUsuario === 'EMPRESA') {
      if (!descripcion.trim()) {
        newErrors.descripcion = 'La descripción de la empresa es obligatoria';
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      edad: '',
      descripcion: '',
      general: ''
    });

    if (!validateForm()) {
      return;
    }

    const { tipoUsuario, nombre, email, password, edad, descripcion } = formData;

    // Preparar datos según tipo de usuario
    const userData = {
      tipoUsuario,
      nombre,
      email,
      password
    };

    if (tipoUsuario === 'USUARIO') {
      userData.edad = parseInt(edad);
    } else {
      userData.descripcion = descripcion;
    }

    // Llamar al registro
    const result = await register(userData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
    } else {
      setErrors(prev => ({ 
        ...prev, 
        general: result.error || 'Error en el registro' 
      }));
    }
  };

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <span className="field-error">
        ⚠️ {error}
      </span>
    );
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button 
          onClick={() => navigate('/login')} 
          className="btn-volver"
        >
          ← Volver al Login
        </button>

        <h1>CREAR CUENTA</h1>
        <h3>----------------------------------------------------</h3>
        <p className="subtitle">Únete a JobPath</p>

        {success && (
          <div className="success-message">
            ✅ Registro exitoso! Redirigiendo...
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            ❌ {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Tipo de Usuario */}
          <label htmlFor="tipoUsuario">Tipo de Cuenta</label>
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

          {/* Nombre */}
          <label htmlFor="nombre">
            {formData.tipoUsuario === 'USUARIO' ? 'Nombre Completo' : 'Nombre de la Empresa'}
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder={formData.tipoUsuario === 'USUARIO' ? 'Juan Pérez' : 'Mi Empresa S.A.'}
            style={errors.nombre ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.nombre} />

          {/* Email */}
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
          <ErrorMessage error={errors.email} />

          {/* Edad - Solo para usuarios */}
          {formData.tipoUsuario === 'USUARIO' && (
            <>
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="18"
                min="13"
                max="100"
                style={errors.edad ? { borderColor: '#dc3545' } : {}}
                required
              />
              <ErrorMessage error={errors.edad} />
              {!errors.edad && formData.edad && (
                <small className="help-text">
                  {parseInt(formData.edad) < 18 
                    ? '⚠️ Cuenta de adolescente (algunas restricciones aplican)'
                    : '✅ Cuenta de adulto (acceso completo)'}
                </small>
              )}
            </>
          )}

          {/* Descripción - Solo para empresas */}
          {formData.tipoUsuario === 'EMPRESA' && (
            <>
              <label htmlFor="descripcion">Descripción de la Empresa</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe tu empresa, sector, actividad..."
                rows="4"
                style={errors.descripcion ? { borderColor: '#dc3545' } : {}}
                required
              />
              <ErrorMessage error={errors.descripcion} />
            </>
          )}

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            style={errors.password ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.password} />

          {/* Confirmar Contraseña */}
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            style={errors.confirmPassword ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.confirmPassword} />

          {/* Botón Submit */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || success}
          >
            {loading ? 'Registrando...' : success ? '✅ Registrado!' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
