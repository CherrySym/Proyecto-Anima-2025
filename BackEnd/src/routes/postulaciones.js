import express from "express";
import {
  createPostulacion,
  getPostulaciones,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
} from "../controllers/postulacionesController.js";

const router = express.Router();

router.post("/", createPostulacion);
router.get("/", getPostulaciones);
router.get("/:id", getPostulacionById);
router.put("/:id", updatePostulacion);
router.delete("/:id", deletePostulacion);

export default router;
