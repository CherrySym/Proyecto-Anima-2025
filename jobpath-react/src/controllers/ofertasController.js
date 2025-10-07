// src/controllers/ofertaController.js
import { PrismaClient } from "@prisma/client";
import { sanitizeOferta, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();

/**
 * Crear oferta
 */
export const createOferta = async (req, res) => {
  try {
    const { empresaId, titulo, descripcion, requisitos } = req.body;
    if (!empresaId || !titulo || !descripcion) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const oferta = await prisma.ofertaTrabajo.create({
      data: { empresaId, titulo, descripcion, requisitos },
    });

    return res.status(201).json(sanitizeOferta(oferta));
  } catch (err) {
    console.error("createOferta:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todas las ofertas
 */
export const getOfertas = async (req, res) => {
  try {
    const ofertas = await prisma.ofertaTrabajo.findMany();
    return res.json(sanitizeMany(ofertas, sanitizeOferta));
  } catch (err) {
    console.error("getOfertas:", err);
    return res.status(500).json({ error: "Error al obtener ofertas" });
  }
};

/**
 * Obtener oferta por ID
 */
export const getOfertaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const oferta = await prisma.ofertaTrabajo.findUnique({ where: { id } });
    if (!oferta) return res.status(404).json({ error: "Oferta no encontrada" });
    return res.json(sanitizeOferta(oferta));
  } catch (err) {
    console.error("getOfertaById:", err);
    return res.status(500).json({ error: "Error al obtener oferta" });
  }
};

/**
 * Actualizar oferta
 */
export const updateOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const oferta = await prisma.ofertaTrabajo.update({
      where: { id },
      data: req.body,
    });
    return res.json(sanitizeOferta(oferta));
  } catch (err) {
    console.error("updateOferta:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar oferta
 */
export const deleteOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.ofertaTrabajo.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteOferta:", err);
    return res.status(400).json({ error: err.message });
  }
};
