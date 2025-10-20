import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/AuthContext';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import styles from './RegisterJoven.module.css';
// import './RegisterJoven.css'; // comentado: archivo original inactivado como backup

/**
 * Página de Registro para Jóvenes
 * Permite registro específico de Usuarios (jóvenes)
 * Conectado con backend: POST /auth/register
 */
const RegisterJoven = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
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
    const { nombre, email, password, confirmPassword, fechaNacimiento } = formData;
    const newErrors = {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
      fechaNacimiento: '',
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

    if (!fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
      hasErrors = true;
    } else {
      // Validar que la fecha sea válida y el usuario tenga entre 13 y 100 años
      const fecha = new Date(fechaNacimiento);
      const hoy = new Date();
      const edad = Math.floor((hoy - fecha) / (365.25 * 24 * 60 * 60 * 1000));
      
      if (edad < 13) {
        newErrors.fechaNacimiento = 'Debes tener al menos 13 años';
        hasErrors = true;
      } else if (edad > 100) {
        newErrors.fechaNacimiento = 'La fecha de nacimiento no es válida';
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
      fechaNacimiento: '',
      general: ''
    });

    if (!validateForm()) {
      return;
    }

    const { nombre, email, password, fechaNacimiento } = formData;

    // Preparar datos para usuario joven
    const userData = {
      tipoUsuario: 'USUARIO',
      nombre,
      email,
      password,
      fechaNacimiento
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
        <div className={styles['back-arrow']} onClick={() => navigate('/jovenes-info')}>
          <ArrowLeft size={24} />
          <span>Volver</span>
        </div>
        <h2>Crear Cuenta - Joven</h2>
        <p className={styles.subtitle}>Inicia tu camino profesional</p>

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
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Juan Pérez"
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
            placeholder="tu@email.com"
            className={styles.input}
            style={errors.email ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.email} />

          {/* Fecha de Nacimiento */}
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={styles.input}
            style={errors.fechaNacimiento ? { borderColor: '#dc3545' } : {}}
            required
          />
          <ErrorMessage error={errors.fechaNacimiento} />
          {!errors.fechaNacimiento && formData.fechaNacimiento && (() => {
            const fecha = new Date(formData.fechaNacimiento);
            const hoy = new Date();
            const edad = Math.floor((hoy - fecha) / (365.25 * 24 * 60 * 60 * 1000));
            return (
              <small className={styles['help-text']}>
                {edad < 18
                  ? <><AlertTriangle size={14} /> Tienes {edad} años - Cuenta ADOLESCENTE (algunas restricciones aplican)</>
                  : <>✅ Tienes {edad} años - Cuenta JOVEN (acceso completo)</>}
              </small>
            );
          })()}

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

export default RegisterJoven;
