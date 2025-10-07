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

// Desafíos
export function sanitizeDesafio(desafio) {
  if (!desafio) return null;
  return {
    id: desafio.id,
    titulo: desafio.titulo,
    descripcion: desafio.descripcion,
    recompensa: desafio.recompensa,
    empresaId: desafio.empresaId,
  };
}

// Ofertas de trabajo
export function sanitizeOferta(oferta) {
  if (!oferta) return null;
  return {
    id: oferta.id,
    titulo: oferta.titulo,
    descripcion: oferta.descripcion,
    requisitos: oferta.requisitos,
    empresaId: oferta.empresaId,
  };
}

// Cursos externos
export function sanitizeCurso(curso) {
  if (!curso) return null;
  return {
    id: curso.id,
    titulo: curso.titulo,
    descripcion: curso.descripcion,
    url: curso.url,
    area: curso.area,
  };
}

// Postulaciones
export function sanitizePostulacion(postulacion) {
  if (!postulacion) return null;
  return {
    id: postulacion.id,
    userId: postulacion.userId,
    ofertaId: postulacion.ofertaId,
    estado: postulacion.estado,
  };
}
