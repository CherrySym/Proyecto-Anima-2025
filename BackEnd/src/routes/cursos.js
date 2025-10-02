const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sanitizeCurso, sanitizeMany } = require('../utils/sanitizers');

// Crear curso
router.post('/', async (req, res) => {
  const { titulo, descripcion, url, area } = req.body;
  try {
    const curso = await prisma.cursoExterno.create({
      data: { titulo, descripcion, url, area }
    });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await prisma.cursoExterno.findMany();
    res.json(sanitizeMany(cursos, sanitizeCurso));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Obtener curso por ID
router.get('/:id', async (req, res) => {
  try {
    const curso = await prisma.cursoExterno.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(sanitizeCurso(curso));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener curso' });
  }
});

// Actualizar curso
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await prisma.cursoExterno.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar curso
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cursoExterno.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
