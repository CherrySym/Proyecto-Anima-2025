// src/controllers/postulacionController.js
import { PrismaClient } from "@prisma/client";
import { sanitizePostulacion, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();

/**
 * Crear postulación
 */
export const createPostulacion = async (req, res) => {
  try {
    const { userId, ofertaId, estado } = req.body;
    if (!userId || !ofertaId) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const postulacion = await prisma.postulacion.create({
      data: { userId, ofertaId, estado },
    });

    return res.status(201).json(sanitizePostulacion(postulacion));
  } catch (err) {
    console.error("createPostulacion:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todas las postulaciones
 */
export const getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await prisma.postulacion.findMany();
    return res.json(sanitizeMany(postulaciones, sanitizePostulacion));
  } catch (err) {
    console.error("getPostulaciones:", err);
    return res.status(500).json({ error: "Error al obtener postulaciones" });
  }
};

/**
 * Obtener postulación por ID
 */
export const getPostulacionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const postulacion = await prisma.postulacion.findUnique({ where: { id } });
    if (!postulacion) return res.status(404).json({ error: "Postulación no encontrada" });
    return res.json(sanitizePostulacion(postulacion));
  } catch (err) {
    console.error("getPostulacionById:", err);
    return res.status(500).json({ error: "Error al obtener postulación" });
  }
};

/**
 * Actualizar postulación
 */
export const updatePostulacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const postulacion = await prisma.postulacion.update({
      where: { id },
      data: req.body,
    });
    return res.json(sanitizePostulacion(postulacion));
  } catch (err) {
    console.error("updatePostulacion:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar postulación
 */
export const deletePostulacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.postulacion.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deletePostulacion:", err);
    return res.status(400).json({ error: err.message });
  }
};
