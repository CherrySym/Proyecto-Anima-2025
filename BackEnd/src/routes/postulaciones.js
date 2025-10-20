import express from "express";
import {
  createPostulacion,
  getPostulaciones,
  getMisPostulaciones,
  getPostulacionesByOferta,
  updatePostulacion,
  deletePostulacion,
} from "../controllers/postulacionesController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas de postulaciones requieren autenticación
router.post("/", authMiddleware, createPostulacion);
router.get("/", authMiddleware, getPostulaciones);
router.get("/mis-postulaciones", authMiddleware, getMisPostulaciones);
router.get("/oferta/:ofertaId", authMiddleware, getPostulacionesByOferta);
router.put("/:id", authMiddleware, updatePostulacion);
router.delete("/:id", authMiddleware, deletePostulacion);

export default router;
