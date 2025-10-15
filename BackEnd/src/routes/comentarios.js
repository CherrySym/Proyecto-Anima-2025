// src/routes/comentarios.js
import express from "express";
import {
  createComentario,
  getComentariosByPost,
  getComentarioById,
  updateComentario,
  deleteComentario,
  getComentariosByUsuario
} from "../controllers/comentariosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/post/:postId", getComentariosByPost);
router.get("/:id", getComentarioById);
router.get("/usuario/:usuarioId", getComentariosByUsuario);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, createComentario);
router.put("/:id", authMiddleware, updateComentario);
router.delete("/:id", authMiddleware, deleteComentario);

export default router;
