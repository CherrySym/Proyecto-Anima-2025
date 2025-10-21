import express from "express";
import {
  createOferta,
  getOfertas,
  getOfertaById,
  getMisOfertas,
  updateOferta,
  deleteOferta,
} from "../controllers/ofertasController.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas que requieren autenticación
router.post("/", authMiddleware, createOferta);
router.get("/mis-ofertas", authMiddleware, getMisOfertas);
router.put("/:id", authMiddleware, updateOferta);
router.delete("/:id", authMiddleware, deleteOferta);

// Rutas públicas con autenticación opcional (para personalización)
router.get("/", optionalAuthMiddleware, getOfertas);
router.get("/:id", optionalAuthMiddleware, getOfertaById);

export default router;
