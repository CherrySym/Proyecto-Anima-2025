const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sanitizeEmpresa, sanitizeMany } = require('../utils/sanitizers');

// Crear empresa
router.post('/', async (req, res) => {
  const { nombre, email, password, descripcion } = req.body;
  try {
    const empresa = await prisma.empresa.create({
      data: { nombre, email, password, descripcion }
    });
    res.json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await prisma.empresa.findMany();
    res.json(sanitizeMany(empresas, sanitizeEmpresa));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
});

// Obtener empresa por ID
router.get('/:id', async (req, res) => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });
    res.json(sanitizeEmpresa(empresa));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empresa' });
  }
});

// Actualizar empresa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await prisma.empresa.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Borrar empresa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.empresa.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
