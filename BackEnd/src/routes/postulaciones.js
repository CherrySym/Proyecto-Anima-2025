const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sanitizePostulacion, sanitizeMany } = require('../utils/sanitizers');

// Crear postulación
router.post('/', async (req, res) => {
  const { userId, ofertaId, estado } = req.body;
  try {
    const postulacion = await prisma.postulacion.create({
      data: { userId, ofertaId, estado }
    });
    res.json(postulacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las postulaciones
router.get('/', async (req, res) => {
  try {
    const postulaciones = await prisma.postulacion.findMany();
    res.json(sanitizeMany(postulaciones, sanitizePostulacion));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener postulaciones' });
  }
});

// Obtener postulación por ID
router.get('/:id', async (req, res) => {
  try {
    const postulacion = await prisma.postulacion.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });
    res.json(sanitizePostulacion(postulacion));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener postulación' });
  }
});

// Actualizar postulación
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postulacion = await prisma.postulacion.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(postulacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar postulación
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.postulacion.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
