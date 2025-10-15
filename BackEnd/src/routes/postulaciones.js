import express from "express";
import {
  createPostulacion,
  getPostulaciones,
  getMisPostulaciones,
  getPostulacionesByOferta,
  updatePostulacion,
  deletePostulacion,
} from "../controllers/postulacionesController.js";

const router = express.Router();

router.post("/", createPostulacion);
router.get("/", getPostulaciones);
router.get("/mis-postulaciones", getMisPostulaciones);
router.get("/oferta/:ofertaId", getPostulacionesByOferta);
router.put("/:id", updatePostulacion);
router.delete("/:id", deletePostulacion);

export default router;
