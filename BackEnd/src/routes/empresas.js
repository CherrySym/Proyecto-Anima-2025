import express from "express";
import {
  createEmpresa,
  getEmpresas,
  getEmpresaById,
  updateEmpresa,
  deleteEmpresa,
} from "../controllers/empresasController.js";

const router = express.Router();

router.post("/", createEmpresa);
router.get("/", getEmpresas);
router.get("/:id", getEmpresaById);
router.put("/:id", updateEmpresa);
router.delete("/:id", deleteEmpresa);

export default router;
