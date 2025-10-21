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

/**
 * Participar en un desafío (guardar en mis desafíos)
 */
export const participarDesafio = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const desafioId = parseInt(req.params.id);
    
    // Verificar que el desafío existe
    const desafio = await prisma.desafio.findUnique({ where: { id: desafioId } });
    if (!desafio) {
      return res.status(404).json({ error: "Desafío no encontrado" });
    }
    
    // Crear la participación
    const participacion = await prisma.desafioParticipacion.create({
      data: { 
        usuarioId, 
        desafioId,
        estado: 'EN_PROGRESO'
      }
    });
    
    return res.json({ 
      success: true, 
      message: "Participación registrada exitosamente",
      participacion
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Ya estás participando en este desafío" });
    }
    console.error("participarDesafio:", err);
    return res.status(500).json({ error: "Error al participar en desafío" });
  }
};

/**
 * Quitar participación en un desafío
 */
export const quitarParticipacionDesafio = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const desafioId = parseInt(req.params.id);
    
    await prisma.desafioParticipacion.deleteMany({
      where: { usuarioId, desafioId }
    });
    
    return res.json({ success: true, message: "Participación eliminada" });
  } catch (err) {
    console.error("quitarParticipacionDesafio:", err);
    return res.status(500).json({ error: "Error al quitar participación" });
  }
};

/**
 * Obtener mis desafíos (en los que participo)
 */
export const getMisDesafios = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    
    const participaciones = await prisma.desafioParticipacion.findMany({
      where: { usuarioId },
      include: {
        desafio: {
          include: {
            empresa: {
              select: {
                id: true,
                nombre: true,
                logo: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const desafios = participaciones.map(p => ({
      ...sanitizeDesafio(p.desafio),
      participando: true,
      estado: p.estado,
      fechaParticipacion: p.createdAt
    }));
    
    return res.json(desafios);
  } catch (err) {
    console.error("getMisDesafios:", err);
    return res.status(500).json({ error: "Error al obtener mis desafíos" });
  }
};
