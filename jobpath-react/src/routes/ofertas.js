import express from "express";
import {
  createOferta,
  getOfertas,
  getOfertaById,
  updateOferta,
  deleteOferta,
} from "../controllers/ofertasController.js";

const router = express.Router();

router.post("/", createOferta);
router.get("/", getOfertas);
router.get("/:id", getOfertaById);
router.put("/:id", updateOferta);
router.delete("/:id", deleteOferta);

export default router;
