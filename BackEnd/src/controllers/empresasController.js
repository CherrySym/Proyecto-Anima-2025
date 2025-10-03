// src/controllers/empresaController.js
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { sanitizeEmpresa, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

/**
 * Crear empresa
 * - Hashea la password antes de guardar
 * - Valida que no exista el email
 */
export const createEmpresa = async (req, res) => {
  try {
    const { nombre, email, password, descripcion } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const existing = await prisma.empresa.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "El email ya está registrado" });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const empresa = await prisma.empresa.create({
      data: { nombre, email, password: hashed, descripcion },
    });

    // sanitizeEmpresa debe remover campos sensibles (ej: password) si corresponde
    return res.status(201).json(sanitizeEmpresa(empresa));
  } catch (err) {
    console.error("createEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todas las empresas
 */
export const getEmpresas = async (req, res) => {
  try {
    const empresas = await prisma.empresa.findMany();
    return res.json(sanitizeMany(empresas, sanitizeEmpresa));
  } catch (err) {
    console.error("getEmpresas:", err);
    return res.status(500).json({ error: "Error al obtener empresas" });
  }
};

/**
 * Obtener empresa por ID
 */
export const getEmpresaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const empresa = await prisma.empresa.findUnique({ where: { id } });
    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
    return res.json(sanitizeEmpresa(empresa));
  } catch (err) {
    console.error("getEmpresaById:", err);
    return res.status(500).json({ error: "Error al obtener empresa" });
  }
};

/**
 * Actualizar empresa
 * - Si actualizan password, se re-hashea
 */
export const updateEmpresa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = { ...req.body };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    const empresa = await prisma.empresa.update({
      where: { id },
      data,
    });

    return res.json(sanitizeEmpresa(empresa));
  } catch (err) {
    console.error("updateEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar empresa
 */
export const deleteEmpresa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.empresa.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};
