// src/routes/likes.js
import express from "express";
import {
  toggleLike,
  getLikesByPost,
  checkUserLike,
  getLikedPostsByUser
} from "../controllers/likesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas de likes requieren autenticación
router.post("/toggle", authMiddleware, toggleLike);
router.get("/post/:postId", getLikesByPost);
router.get("/check/:postId", authMiddleware, checkUserLike);
router.get("/user/:usuarioId", getLikedPostsByUser);

export default router;
