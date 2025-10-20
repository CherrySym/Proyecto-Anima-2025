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

// Desafíos
export function sanitizeDesafio(desafio) {
  if (!desafio) return null;
  return {
    id: desafio.id,
    empresaId: desafio.empresaId,
    empresa: desafio.empresa,
    titulo: desafio.titulo,
    descripcion: desafio.descripcion,
    recompensa: desafio.recompensa,
    dificultad: desafio.dificultad,
    categoria: desafio.categoria,
    activo: desafio.activo,
    fechaCreacion: desafio.fechaCreacion,
    fechaActualizacion: desafio.fechaActualizacion
  };
}

// Cursos Externos
export function sanitizeCurso(curso) {
  if (!curso) return null;
  return {
    id: curso.id,
    titulo: curso.titulo,
    descripcion: curso.descripcion,
    url: curso.url,
    proveedor: curso.proveedor,
    duracion: curso.duracion,
    nivel: curso.nivel,
    area: curso.area,
    costo: curso.costo,
    activo: curso.activo,
    fechaCreacion: curso.fechaCreacion,
    fechaActualizacion: curso.fechaActualizacion
  };
}
