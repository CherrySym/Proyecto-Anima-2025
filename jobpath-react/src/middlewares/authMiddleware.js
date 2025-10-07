import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, process.env.JWT_SECRET || "secretito", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user; // acá vas a tener id y tipo
    next();
  });
}
