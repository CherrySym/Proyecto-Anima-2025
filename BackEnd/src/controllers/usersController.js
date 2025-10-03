// src/controllers/userController.js
import { PrismaClient } from "@prisma/client";
import { sanitizeUser, sanitizeMany } from "../middlewares/sanitizers.js";

const prisma = new PrismaClient();

/**
 * Crear usuario
 */
export const createUser = async (req, res) => {
  try {
    const { nombre, email, password, edad, tipo } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const user = await prisma.user.create({
      data: { nombre, email, password, edad, tipo },
    });

    return res.status(201).json(sanitizeUser(user));
  } catch (err) {
    console.error("createUser:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todos los usuarios
 */
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(sanitizeMany(users, sanitizeUser));
  } catch (err) {
    console.error("getUsers:", err);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

/**
 * Obtener usuario por ID
 */
export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.json(sanitizeUser(user));
  } catch (err) {
    console.error("getUserById:", err);
    return res.status(500).json({ error: "Error al obtener usuario" });
  }
};

/**
 * Actualizar usuario
 */
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    return res.json(sanitizeUser(user));
  } catch (err) {
    console.error("updateUser:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar usuario
 */
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteUser:", err);
    return res.status(400).json({ error: err.message });
  }
};
