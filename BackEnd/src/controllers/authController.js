// src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Registro unificado de usuario o empresa
 * - Recibe tipoUsuario: 'USUARIO' | 'EMPRESA'
 * - Para usuarios: nombre, email, password, edad y Determina tipo de usuario según edad
 * - Para empresas: nombre, email, password, descripcion
 * - Hashea la password antees de guardarla
 */
export const register = async (req, res) => {
  try {
    const { tipoUsuario, nombre, email, password, edad, descripcion } = req.body;

    // Validación básica de campos
    if (!tipoUsuario || !nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (tipoUsuario === "USUARIO") {
      // Validación específica para usuario
      if (!edad) return res.status(400).json({ error: "Edad requerida para usuarios" });

      // Verificar si el email ya existe en usuarios
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return res.status(400).json({ error: "El email ya está registrado" });

      // Determinar tipo según edad
      const tipo = edad < 18 ? "ADOLESCENTE" : "ADULTO";

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const user = await prisma.user.create({
        data: { nombre, email, password: hashedPassword, edad, tipo }
      });

      res.status(201).json({
        message: "Usuario registrado",
        user: { id: user.id, email: user.email, tipo: user.tipo }
      });
    } 
    else if (tipoUsuario === "EMPRESA") {
      // Verificar si el email ya existe en empresas
      const existingEmpresa = await prisma.empresa.findUnique({ where: { email } });
      if (existingEmpresa) return res.status(400).json({ error: "El email ya está registrado" });

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear empresa
      const empresa = await prisma.empresa.create({
        data: { nombre, email, password: hashedPassword, descripcion }
      });

      res.status(201).json({
        message: "Empresa registrada",
        empresa: { id: empresa.id, email: empresa.email }
      });
    } 
    else {
      return res.status(400).json({ error: "tipoUsuario inválido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el registro" });
  }
};

/**
 * Login unificado de usuario o empresa
 * - Recibe tipoUsuario: 'USUARIO' | 'EMPRESA'
 * - Verifica credenciales
 * - Genera JWT con id y tipo
 */
export const login = async (req, res) => {
  try {
    const { tipoUsuario, email, password } = req.body;

    // Validación básica de campos
    if (!tipoUsuario || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    let account;
    if (tipoUsuario === "USUARIO") {
      // Buscar usuario por email
      account = await prisma.user.findUnique({ where: { email } });
    } else if (tipoUsuario === "EMPRESA") {
      // Buscar empresa por email
      account = await prisma.empresa.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: "tipoUsuario inválido" });
    }

    if (!account) return res.status(400).json({ error: "Credenciales inválidas" });

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) return res.status(400).json({ error: "Credenciales inválidas" });

    // Crear JWT (expira en 1 día)
    const token = jwt.sign(
      { id: account.id, tipo: tipoUsuario },
      process.env.JWT_SECRET || "secretito", // ⚠️ Cambiar en producción
      { expiresIn: "1d" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
