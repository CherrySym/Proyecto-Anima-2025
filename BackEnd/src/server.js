// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Routers
import usersRouter from "./routes/users.js";
import empresasRouter from "./routes/empresas.js";
import ofertasRouter from "./routes/ofertas.js";
import postulacionesRouter from "./routes/postulaciones.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import likesRouter from "./routes/likes.js";
import comentariosRouter from "./routes/comentarios.js";
import desafiosRouter from "./routes/desafios.js";
import cursosRouter from "./routes/cursos.js";
import conexionesRouter from "./routes/conexiones.js";

// Configuración
dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://jobpath.anima.edu.uy',
        'http://jobpath.anima.edu.uy'
      ]
    : [
        'http://localhost:5173', 
        'http://localhost:5174'
      ],
  credentials: true
}));
app.use(express.json());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("Backend de JobPath funcionando!");
});

// Rutas de autenticación

// Test simple de conexión a DB
app.get("/test-db", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({ take: 5 });
    const empresas = await prisma.empresa.findMany({ take: 5 });
    res.json({ 
      success: true, 
      message: "Conexión a base de datos exitosa",
      usuarios: usuarios.length,
      empresas: empresas.length 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- ROUTERS --------------------
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/empresas", empresasRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);
app.use("/comentarios", comentariosRouter);
app.use("/ofertas", ofertasRouter);
app.use("/postulaciones", postulacionesRouter);
app.use("/desafios", desafiosRouter);
app.use("/cursos", cursosRouter);
app.use("/conexiones", conexionesRouter);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
