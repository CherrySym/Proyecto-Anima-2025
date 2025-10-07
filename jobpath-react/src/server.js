// server.js
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Routers
import usersRouter from "./routes/users.js";
import empresasRouter from "./routes/empresas.js";
import ofertasRouter from "./routes/ofertas.js";
import desafiosRouter from "./routes/desafios.js";
import cursosRouter from "./routes/cursos.js";
import postulacionesRouter from "./routes/postulaciones.js";
import authRouter from "./routes/auth.js";

// Configuración
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend de Nexo funcionando!");
});

// Test simple de conexión a DB
app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, usuarios: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- ROUTERS --------------------
app.use("/users", usersRouter);
app.use("/empresas", empresasRouter);
app.use("/ofertas", ofertasRouter);
app.use("/desafios", desafiosRouter);
app.use("/cursos", cursosRouter);
app.use("/postulaciones", postulacionesRouter);
app.use("/auth", authRouter);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
