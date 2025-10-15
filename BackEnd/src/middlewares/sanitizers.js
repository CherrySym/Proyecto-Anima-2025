// backend/src/middlewares/sanitizers.js

// Helper para listas
export function sanitizeMany(items, sanitizer) {
  if (!items || !Array.isArray(items)) return [];
  return items.map(sanitizer);
}

// Usuarios
export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user; // quitamos password
  return safeUser;
}

// Empresas
export function sanitizeEmpresa(empresa) {
  if (!empresa) return null;
  const { password, ...safeEmpresa } = empresa; // quitamos password
  return safeEmpresa;
}

// Ofertas de trabajo
export function sanitizeOferta(oferta) {
  if (!oferta) return null;
  return {
    id: oferta.id,
    titulo: oferta.titulo,
    descripcion: oferta.descripcion,
    requisitos: oferta.requisitos,
    ubicacion: oferta.ubicacion,
    salario: oferta.salario,
    tipo: oferta.tipo,
    area: oferta.area,
    modalidad: oferta.modalidad,
    empresaId: oferta.empresaId,
    activa: oferta.activa,
    fechaVencimiento: oferta.fechaVencimiento
  };
}

// Postulaciones
export function sanitizePostulacion(postulacion) {
  if (!postulacion) return null;
  return {
    id: postulacion.id,
    usuarioId: postulacion.usuarioId,
    ofertaId: postulacion.ofertaId,
    estado: postulacion.estado,
    createdAt: postulacion.createdAt
  };
}

// ❌ ELIMINADOS: sanitizeCurso y sanitizeDesafio (modelos no existen en schema)

