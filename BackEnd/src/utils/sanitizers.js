// backend/src/utils/sanitizers.js

// Helper para listas
function sanitizeMany(items, sanitizer) {
  if (!items || !Array.isArray(items)) return [];
  return items.map(sanitizer);
}

// Usuarios
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user; // quitamos password
  return safeUser;
}

// Empresas
function sanitizeEmpresa(empresa) {
  if (!empresa) return null;
  const { password, ...safeEmpresa } = empresa; // quitamos password
  return safeEmpresa;
}

// Desafíos
function sanitizeDesafio(desafio) {
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
function sanitizeOferta(oferta) {
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
function sanitizeCurso(curso) {
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
function sanitizePostulacion(postulacion) {
  if (!postulacion) return null;
  return {
    id: postulacion.id,
    userId: postulacion.userId,
    ofertaId: postulacion.ofertaId,
    estado: postulacion.estado,
  };
}

// Exportamos todas las funciones
module.exports = {
  sanitizeMany,
  sanitizeUser,
  sanitizeEmpresa,
  sanitizeDesafio,
  sanitizeOferta,
  sanitizeCurso,
  sanitizePostulacion,
};
