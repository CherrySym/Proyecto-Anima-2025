// src/routes/posts.js
import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUsuario,
  getPostsByEmpresa
} from "../controllers/postsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas (con paginación opcional)
router.get("/", getPosts);
router.get("/:id", getPostById);

// Rutas por autor
router.get("/usuario/:usuarioId", getPostsByUsuario);
router.get("/empresa/:empresaId", getPostsByEmpresa);

// Rutas protegidas (requieren autenticación)
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
