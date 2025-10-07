import express from "express";
import {
  createDesafio,
  getDesafios,
  getDesafioById,
  updateDesafio,
  deleteDesafio,
} from "../controllers/desafiosController.js";

const router = express.Router();

router.post("/", createDesafio);
router.get("/", getDesafios);
router.get("/:id", getDesafioById);
router.put("/:id", updateDesafio);
router.delete("/:id", deleteDesafio);

export default router;
