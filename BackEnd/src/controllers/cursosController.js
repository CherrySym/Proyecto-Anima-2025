// src/controllers/cursoController.js
import { PrismaClient } from "@prisma/client";
import { sanitizeCurso, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();

/**
 * Crear un nuevo curso externo
 */
export const createCurso = async (req, res) => {
  const { titulo, descripcion, url, area } = req.body;
  try {
    const curso = await prisma.cursoExterno.create({
      data: { titulo, descripcion, url, area }
    });
    res.json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todos los cursos externos
 */
export const getCursos = async (req, res) => {
  try {
    const { area, nivel, proveedor } = req.query;
    const usuarioId = req.user?.id; // Opcional, desde optionalAuthMiddleware
    
    const where = { activo: true };
    if (area) where.area = area;
    if (nivel) where.nivel = nivel;
    if (proveedor) where.proveedor = proveedor;
    
    const cursos = await prisma.cursoExterno.findMany({ where });
    
    // Si hay usuario logueado, verificar cuáles ha guardado
    if (usuarioId) {
      const cursosGuardados = await prisma.cursoGuardado.findMany({
        where: { usuarioId },
        select: { cursoId: true }
      });
      const idsGuardados = new Set(cursosGuardados.map(cg => cg.cursoId));
      
      const cursosConGuardado = cursos.map(curso => ({
        ...sanitizeCurso(curso),
        guardado: idsGuardados.has(curso.id)
      }));
      
      return res.json(cursosConGuardado);
    }
    
    res.json(sanitizeMany(cursos, sanitizeCurso));
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cursos" });
  }
};

/**
 * Obtener un curso por ID
 */
export const getCursoById = async (req, res) => {
  try {
    const curso = await prisma.cursoExterno.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(sanitizeCurso(curso));
  } catch (err) {
    res.status(500).json({ error: "Error al obtener curso" });
  }
};

/**
 * Actualizar un curso
 */
export const updateCurso = async (req, res) => {
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
};

/**
 * Borrar un curso
 */
export const deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cursoExterno.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Guardar un curso (agregar a favoritos)
 */
export const guardarCurso = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const cursoId = parseInt(req.params.id);
    
    // Verificar que el curso existe
    const curso = await prisma.cursoExterno.findUnique({ where: { id: cursoId } });
    if (!curso) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    
    // Crear la relación (si ya existe, Prisma lanzará error por unique constraint)
    const cursoGuardado = await prisma.cursoGuardado.create({
      data: { usuarioId, cursoId }
    });
    
    res.json({ success: true, message: "Curso guardado correctamente" });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Ya has guardado este curso" });
    }
    res.status(500).json({ error: "Error al guardar curso" });
  }
};

/**
 * Quitar un curso guardado
 */
export const quitarCursoGuardado = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const cursoId = parseInt(req.params.id);
    
    await prisma.cursoGuardado.deleteMany({
      where: { usuarioId, cursoId }
    });
    
    res.json({ success: true, message: "Curso eliminado de guardados" });
  } catch (err) {
    res.status(500).json({ error: "Error al quitar curso" });
  }
};

/**
 * Obtener cursos guardados del usuario
 */
export const getMisCursosGuardados = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    
    const cursosGuardados = await prisma.cursoGuardado.findMany({
      where: { usuarioId },
      include: {
        curso: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const cursos = cursosGuardados.map(cg => ({
      ...sanitizeCurso(cg.curso),
      guardado: true,
      fechaGuardado: cg.createdAt
    }));
    
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener cursos guardados" });
  }
};
