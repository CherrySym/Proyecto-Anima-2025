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
    const cursos = await prisma.cursoExterno.findMany();
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
