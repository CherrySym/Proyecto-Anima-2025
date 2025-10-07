// src/routes/cursos.js
import express from "express";
import {
  createCurso,
  getCursos,
  getCursoById,
  updateCurso,
  deleteCurso
} from "../controllers/cursosController.js";

const router = express.Router();

router.post("/", createCurso);
router.get("/", getCursos);
router.get("/:id", getCursoById);
router.put("/:id", updateCurso);
router.delete("/:id", deleteCurso);

export default router;
