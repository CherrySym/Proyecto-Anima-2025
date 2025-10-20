import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import styles from './RegisterEmpresa.module.css';
// import './RegisterEmpresa.css'; // comentado: archivo original inactivado como backup

/**
 * Página de Registro para Empresas
 * Permite registro específico de Empresas
 * Conectado con backend: POST /auth/register
 */
const RegisterEmpresa = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const { nombre, email, password, confirmPassword, descripcion } = formData;
    const newErrors = {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      descripcion: '',
      general: ''
    };
    let hasErrors = false;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre de la empresa es obligatorio';
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

    if (!descripcion.trim()) {
      newErrors.descripcion = 'La descripción de la empresa es obligatoria';
      hasErrors = true;
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
      descripcion: '',
      general: ''
    });

    if (!validateForm()) {
      return;
    }

    const { nombre, email, password, descripcion } = formData;

    // Preparar datos para empresa
    const userData = {
      tipoUsuario: 'EMPRESA',
      nombre,
      email,
      password,
      descripcion
    };

    // Llamar al registro
    const result = await register(userData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        // Redirigir al feed
        navigate('/feed');
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
      <span className={styles['field-error']}>
        <AlertTriangle size={14} /> {error}
      </span>
    );
  };

  return (
    <div className={styles['register-page']}>
      <div className={styles['register-container']}>
        <div className={styles['back-arrow']} onClick={() => navigate('/empresas-info')}>
          <ArrowLeft size={24} />
          <span>Volver</span>
        </div>
        <h2>Crear Cuenta - Empresa</h2>
        <p className={styles.subtitle}>Encuentra el talento que necesitas</p>

        {success && (
          <div className={styles['success-message']}>
            ✅ Registro exitoso! Redirigiendo...
          </div>
        )}

        {errors.general && (
          <div className={styles['error-message']}>
            ❌ {errors.general}
          </div>
        )}

  <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <label htmlFor="nombre">Nombre de la Empresa</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Mi Empresa S.A."
            className={styles.input}
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
            placeholder="contacto@empresa.com"
            className={styles.input}
            style={errors.email ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.email} />

          {/* Descripción */}
          <label htmlFor="descripcion">Descripción de la Empresa</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe tu empresa, sector, actividad..."
            rows="4"
            maxLength={500}
            className={styles.textarea}
            style={errors.descripcion ? { borderColor: '#dc3545' } : {}}
            required
          />
          <small style={{textAlign: 'right', display: 'block', color: '#666', fontSize: '0.85em'}}>
            {formData.descripcion.length}/500 caracteres
          </small>
          <ErrorMessage error={errors.descripcion} />

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            className={styles.input}
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
            className={styles.input}
            style={errors.confirmPassword ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.confirmPassword} />

          {/* Botón Submit */}
          <button 
            type="submit" 
            className={styles['submit-button']}
            disabled={loading || success}
          >
            {loading ? 'Registrando...' : success ? '✅ Registrado!' : 'Crear Cuenta'}
          </button>
        </form>

        <p className={styles['login-hint']}>
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} className={styles['link-text']}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterEmpresa;
