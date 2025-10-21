import express from "express";
import {
  createDesafio,
  getDesafios,
  getDesafioById,
  updateDesafio,
  deleteDesafio,
  participarDesafio,
  quitarParticipacionDesafio,
  getMisDesafios
} from "../controllers/desafiosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", getDesafios);
router.get("/:id", getDesafioById);

// Rutas protegidas (requieren autenticación)
router.post("/:id/participar", authMiddleware, participarDesafio);
router.delete("/:id/participar", authMiddleware, quitarParticipacionDesafio);
router.get("/mis-desafios/lista", authMiddleware, getMisDesafios);

// Rutas admin (CRUD básico)
router.post("/", createDesafio);
router.put("/:id", updateDesafio);
router.delete("/:id", deleteDesafio);

export default router;
