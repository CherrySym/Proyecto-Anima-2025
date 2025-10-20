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
