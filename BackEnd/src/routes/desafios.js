const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sanitizeDesafio, sanitizeMany } = require('../utils/sanitizers');

// Crear desafío
router.post('/', async (req, res) => {
  const { empresaId, titulo, descripcion, recompensa } = req.body;
  try {
    const desafio = await prisma.desafio.create({
      data: { empresaId, titulo, descripcion, recompensa }
    });
    res.json(desafio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los desafíos
router.get('/', async (req, res) => {
  try {
    const desafios = await prisma.desafio.findMany();
    res.json(sanitizeMany(desafios, sanitizeDesafio));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener desafíos' });
  }
});

// Obtener desafío por ID
router.get('/:id', async (req, res) => {
  try {
    const desafio = await prisma.desafio.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!desafio) return res.status(404).json({ error: 'Desafío no encontrado' });
    res.json(sanitizeDesafio(desafio));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener desafío' });
  }
});

// Actualizar desafío
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const desafio = await prisma.desafio.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(desafio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar desafío
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.desafio.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
