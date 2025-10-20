// src/routes/cursos.js
import express from "express";
import {
  createCurso,
  getCursos,
  getCursoById,
  updateCurso,
  deleteCurso,
  guardarCurso,
  quitarCursoGuardado,
  getMisCursosGuardados
} from "../controllers/cursosController.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas/opcionales
router.get("/", optionalAuthMiddleware, getCursos);
router.get("/:id", getCursoById);

// Rutas protegidas (requieren autenticación)
router.post("/:id/guardar", authMiddleware, guardarCurso);
router.delete("/:id/guardar", authMiddleware, quitarCursoGuardado);
router.get("/mis-cursos/guardados", authMiddleware, getMisCursosGuardados);

// Rutas admin (CRUD básico)
router.post("/", createCurso);
router.put("/:id", updateCurso);
router.delete("/:id", deleteCurso);

export default router;
