const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sanitizeOferta, sanitizeMany } = require('../utils/sanitizers');

// Crear oferta
router.post('/', async (req, res) => {
  const { empresaId, titulo, descripcion, requisitos } = req.body;
  try {
    const oferta = await prisma.ofertaTrabajo.create({
      data: { empresaId, titulo, descripcion, requisitos }
    });
    res.json(oferta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las ofertas
router.get('/', async (req, res) => {
  try {
    const ofertas = await prisma.ofertaTrabajo.findMany();
    res.json(sanitizeMany(ofertas, sanitizeOferta));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ofertas' });
  }
});

// Obtener oferta por ID
router.get('/:id', async (req, res) => {
  try {
    const oferta = await prisma.ofertaTrabajo.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!oferta) return res.status(404).json({ error: 'Oferta no encontrada' });
    res.json(sanitizeOferta(oferta));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener oferta' });
  }
});

// Actualizar oferta
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const oferta = await prisma.ofertaTrabajo.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(oferta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar oferta
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ofertaTrabajo.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
