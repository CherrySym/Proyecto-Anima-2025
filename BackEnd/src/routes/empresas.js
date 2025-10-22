import express from "express";
import {
  createEmpresa,
  getEmpresas,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
  seguirEmpresa,
  dejarDeSeguirEmpresa,
  obtenerEmpresasSeguidas,
  verificarSeguimientoEmpresas
} from "../controllers/empresasController.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas (con autenticación opcional para información personalizada)
router.get("/", optionalAuthMiddleware, getEmpresas);
router.get("/:id", optionalAuthMiddleware, getEmpresaById);

// Rutas autenticadas
router.post("/", createEmpresa);
router.put("/:id", authMiddleware, updateEmpresa);
router.delete("/:id", authMiddleware, deleteEmpresa);

// Seguimiento de empresas (requiere autenticación)
router.post("/:id/seguir", authMiddleware, seguirEmpresa);
router.delete("/:id/seguir", authMiddleware, dejarDeSeguirEmpresa);
router.get("/seguidas/mis-empresas", authMiddleware, obtenerEmpresasSeguidas);
router.get("/seguimiento/verificar", authMiddleware, verificarSeguimientoEmpresas);

export default router;
