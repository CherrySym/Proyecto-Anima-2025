// src/routes/auth.js
import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe); // Ruta protegida para obtener datos del usuario actual

export default router;
