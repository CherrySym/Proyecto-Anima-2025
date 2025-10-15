/**
 * Utilidades para manejo de fechas
 * Usado principalmente para calcular edad y determinar tipo de usuario
 */

/**
 * Calcula la edad de una persona a partir de su fecha de nacimiento
 * @param {Date|string} fechaNacimiento - Fecha de nacimiento
 * @returns {number} - Edad en años
 */
export const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  // Si no ha cumplido años este año, restar 1
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
};

/**
 * Determina el tipo de usuario según la edad
 * @param {number} edad - Edad en años
 * @returns {'ADOLESCENTE'|'JOVEN'} - Tipo de usuario
 */
export const determinarTipoUsuario = (edad) => {
  if (edad < 18) {
    return 'ADOLESCENTE';
  }
  return 'JOVEN';
};

/**
 * Valida que una fecha de nacimiento sea válida para el sistema
 * @param {Date|string} fechaNacimiento - Fecha de nacimiento
 * @returns {{valida: boolean, error?: string}} - Resultado de validación
 */
export const validarFechaNacimiento = (fechaNacimiento) => {
  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();
  
  // Verificar que la fecha sea válida
  if (isNaN(fecha.getTime())) {
    return { valida: false, error: 'Fecha de nacimiento inválida' };
  }
  
  // Verificar que no sea en el futuro
  if (fecha > hoy) {
    return { valida: false, error: 'La fecha de nacimiento no puede ser en el futuro' };
  }
  
  const edad = calcularEdad(fecha);
  
  // Verificar edad mínima (14 años)
  if (edad < 14) {
    return { valida: false, error: 'Debes tener al menos 14 años para registrarte' };
  }
  
  // Verificar edad máxima (26 años para el MVP)
  if (edad > 26) {
    return { valida: false, error: 'Esta plataforma está diseñada para jóvenes de 14 a 25 años' };
  }
  
  return { valida: true };
};

/**
 * Convierte una edad a fecha de nacimiento aproximada
 * Útil para migración de datos legacy
 * @param {number} edad - Edad en años
 * @returns {Date} - Fecha de nacimiento aproximada
 */
export const edadAFechaNacimiento = (edad) => {
  const hoy = new Date();
  const anioNacimiento = hoy.getFullYear() - edad;
  
  // Usar 1 de enero del año de nacimiento como fecha aproximada
  return new Date(anioNacimiento, 0, 1);
};

/**
 * Formatea una fecha al formato ISO para Prisma
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} - Fecha en formato ISO
 */
export const formatearFechaParaPrisma = (fecha) => {
  return new Date(fecha).toISOString();
};
