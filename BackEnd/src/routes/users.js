import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { authMiddleware, optionalAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", optionalAuthMiddleware, getUsers); // Auth opcional para filtrar usuario actual
router.get("/:id", getUserById);
router.put("/:id", authMiddleware, updateUser); // Requiere auth para actualizar
router.delete("/:id", authMiddleware, deleteUser); // Requiere auth para eliminar

export default router;
