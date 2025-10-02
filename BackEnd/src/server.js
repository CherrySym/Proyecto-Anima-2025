// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Routers
const usersRouter = require('./routes/users');
const empresasRouter = require('./routes/empresas');
const ofertasRouter = require('./routes/ofertas');
const desafiosRouter = require('./routes/desafios');
const cursosRouter = require('./routes/cursos');
const postulacionesRouter = require('./routes/postulaciones');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Backend de Nexo funcionando!");
});

// Test simple de conexión a DB
app.get('/test-db', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, usuarios: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- ROUTERS --------------------
app.use('/users', usersRouter);
app.use('/empresas', empresasRouter);
app.use('/ofertas', ofertasRouter);
app.use('/desafios', desafiosRouter);
app.use('/cursos', cursosRouter);
app.use('/postulaciones', postulacionesRouter);

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
