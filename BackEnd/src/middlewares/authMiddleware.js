import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, process.env.JWT_SECRET || "secretito", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    // Normalizar payload para ambos formatos
    // - Antiguo: { id, tipo }
    // - Nuevo: { id, tipoUsuario, tipoEdad? }
    req.user = {
      id: user.id,
      tipoUsuario: user.tipoUsuario || (user.tipo === 'USUARIO' || user.tipo === 'EMPRESA' ? user.tipo : undefined),
      // Mantener compatibilidad con campos antiguos
      tipo: user.tipo, // puede ser 'USUARIO'/'EMPRESA' (antiguo) o edad ('ADOLESCENTE'/'JOVEN') según versión
      tipoEdad: user.tipoEdad
    };
    next();
  });
}

/**
 * Middleware opcional de autenticación
 * Si hay token válido, agrega req.user
 * Si no hay token o es inválido, continúa sin req.user (permite acceso público)
 */
export function optionalAuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Si no hay token, continuar sin autenticación
  if (!token) {
    return next();
  }

  // Si hay token, intentar verificarlo
  jwt.verify(token, process.env.JWT_SECRET || "secretito", (err, user) => {
    if (!err) {
      // Token válido: normalizar y agregar req.user
      req.user = {
        id: user.id,
        tipoUsuario: user.tipoUsuario || (user.tipo === 'USUARIO' || user.tipo === 'EMPRESA' ? user.tipo : undefined),
        tipo: user.tipo,
        tipoEdad: user.tipoEdad
      };
    }
    // Si hay error en token, simplemente continuar sin req.user
    next();
  });
}
