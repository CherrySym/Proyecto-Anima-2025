// src/controllers/desafioController.js
import { PrismaClient } from "@prisma/client";
import { sanitizeDesafio, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();

/**
 * Crear desafío
 */
export const createDesafio = async (req, res) => {
  try {
    const { empresaId, titulo, descripcion, recompensa } = req.body;

    if (!empresaId || !titulo || !descripcion || !recompensa) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const desafio = await prisma.desafio.create({
      data: { empresaId, titulo, descripcion, recompensa },
    });

    return res.status(201).json(sanitizeDesafio(desafio));
  } catch (err) {
    console.error("createDesafio:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todos los desafíos
 */
export const getDesafios = async (req, res) => {
  try {
    const { categoria, dificultad, estado } = req.query;
    
    const where = {};
    if (categoria) where.categoria = categoria;
    if (dificultad) where.dificultad = dificultad;
    if (estado && estado !== 'todos') where.activo = estado === 'disponibles';
    
    const desafios = await prisma.desafio.findMany({
      where,
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true
          }
        }
      }
    });
    return res.json(sanitizeMany(desafios, sanitizeDesafio));
  } catch (err) {
    console.error("getDesafios:", err);
    return res.status(500).json({ error: "Error al obtener desafíos" });
  }
};

/**
 * Obtener desafío por ID
 */
export const getDesafioById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const desafio = await prisma.desafio.findUnique({ 
      where: { id },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            descripcion: true
          }
        }
      }
    });
    if (!desafio) return res.status(404).json({ error: "Desafío no encontrado" });
    return res.json(sanitizeDesafio(desafio));
  } catch (err) {
    console.error("getDesafioById:", err);
    return res.status(500).json({ error: "Error al obtener desafío" });
  }
};

/**
 * Actualizar desafío
 */
export const updateDesafio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const desafio = await prisma.desafio.update({
      where: { id },
      data,
    });
    return res.json(sanitizeDesafio(desafio));
  } catch (err) {
    console.error("updateDesafio:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar desafío
 */
export const deleteDesafio = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.desafio.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteDesafio:", err);
    return res.status(400).json({ error: err.message });
  }
};
