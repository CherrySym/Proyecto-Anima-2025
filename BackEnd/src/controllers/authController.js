// src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { calcularEdad, determinarTipoUsuario, validarFechaNacimiento } from "../utils/dateHelpers.js";

const prisma = new PrismaClient();

/**
 * Registro unificado de usuario o empresa
 * - Recibe tipoUsuario: 'USUARIO' | 'EMPRESA'
 * - Para usuarios: nombre, email, password, fechaNacimiento (calcula edad y tipo automáticamente)
 * - Para empresas: nombre, email, password, descripcion
 * - Hashea la password antes de guardarla
 */
export const register = async (req, res) => {
  try {
    const { tipoUsuario, nombre, email, password, fechaNacimiento, edad, descripcion } = req.body;

    // Validación básica de campos
    if (!tipoUsuario || !nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (tipoUsuario === "USUARIO") {
      // Aceptar fechaNacimiento o edad (para compatibilidad con frontend legacy)
      let fechaNac;
      
      if (fechaNacimiento) {
        // Validar fechaNacimiento
        const validacion = validarFechaNacimiento(fechaNacimiento);
        if (!validacion.valida) {
          return res.status(400).json({ error: validacion.error });
        }
        fechaNac = new Date(fechaNacimiento);
      } else if (edad) {
        // Convertir edad a fechaNacimiento aproximada
        fechaNac = new Date();
        fechaNac.setFullYear(fechaNac.getFullYear() - parseInt(edad));
        fechaNac.setMonth(0); // Enero
        fechaNac.setDate(1);  // Día 1
      } else {
        return res.status(400).json({ error: "Fecha de nacimiento o edad requerida" });
      }

      // Calcular edad y determinar tipo
      const edadCalculada = calcularEdad(fechaNac);
      const tipo = determinarTipoUsuario(edadCalculada);

      // Verificar si el email ya existe en usuarios
      const existingUser = await prisma.usuario.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario con nuevo schema
      const user = await prisma.usuario.create({
        data: { 
          nombre, 
          email, 
          password: hashedPassword, 
          fechaNacimiento: fechaNac,
          tipo,
          rol: "USUARIO" // Default para usuarios normales
        }
      });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: { 
          id: user.id, 
          nombre: user.nombre,
          email: user.email, 
          tipo: user.tipo,
          rol: user.rol,
          edad: edadCalculada
        }
      });
    } 
    else if (tipoUsuario === "EMPRESA") {
      // Verificar si el email ya existe en empresas
      const existingEmpresa = await prisma.empresa.findUnique({ where: { email } });
      if (existingEmpresa) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear empresa
      const empresa = await prisma.empresa.create({
        data: { nombre, email, password: hashedPassword, descripcion }
      });

      res.status(201).json({
        message: "Empresa registrada exitosamente",
        empresa: { 
          id: empresa.id, 
          nombre: empresa.nombre,
          email: empresa.email 
        }
      });
    } 
    else {
      return res.status(400).json({ error: "tipoUsuario inválido" });
    }
  } catch (error) {
    console.error("Error en registro:", error);
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
      account = await prisma.usuario.findUnique({ where: { email } });
    } else if (tipoUsuario === "EMPRESA") {
      // Buscar empresa por email
      account = await prisma.empresa.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: "tipoUsuario inválido" });
    }

    if (!account) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    // Crear JWT (expira en 1 día)
    const token = jwt.sign(
      { id: account.id, tipo: tipoUsuario },
      process.env.JWT_SECRET || "secretito", // ⚠️ Cambiar en producción
      { expiresIn: "1d" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
};

/**
 * Obtener datos del usuario/empresa actual
 * - Requiere authMiddleware (req.user viene del JWT)
 * - Devuelve datos completos según el tipo
 * - Calcula edad dinámicamente desde fechaNacimiento
 */
export const getMe = async (req, res) => {
  try {
    const { id, tipo } = req.user; // Viene del middleware de autenticación
    
    console.log('getMe called with:', { id, tipo });

    if (tipo === "USUARIO") {
      const user = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nombre: true,
          email: true,
          fechaNacimiento: true,
          tipo: true,
          rol: true,
          avatar: true,
          bio: true,
          ubicacion: true,
          puntos: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Calcular edad desde fechaNacimiento
      const edad = calcularEdad(user.fechaNacimiento);

      return res.json({
        tipoUsuario: "USUARIO",
        user: {
          id: user.id,
          nombre: user.nombre,
          name: user.nombre, // Alias para frontend
          email: user.email,
          edad, // Calculada dinámicamente
          tipo: user.tipo,
          rol: user.rol,
          avatar: user.avatar,
          bio: user.bio,
          ubicacion: user.ubicacion,
          location: user.ubicacion, // Alias para frontend
          puntos: user.puntos,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      });
    } 
    else if (tipo === "EMPRESA") {
      const empresa = await prisma.empresa.findUnique({
        where: { id },
        select: {
          id: true,
          nombre: true,
          email: true,
          descripcion: true,
          logo: true,
          sector: true,
          ubicacion: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      if (!empresa) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }

      return res.json({
        tipoUsuario: "EMPRESA",
        empresa: {
          id: empresa.id,
          nombre: empresa.nombre,
          name: empresa.nombre, // Alias para frontend
          email: empresa.email,
          descripcion: empresa.descripcion,
          logo: empresa.logo,
          sector: empresa.sector,
          ubicacion: empresa.ubicacion,
          location: empresa.ubicacion, // Alias para frontend
          createdAt: empresa.createdAt,
          updatedAt: empresa.updatedAt,
        }
      });
    }
    else {
      return res.status(400).json({ error: "Tipo de usuario inválido" });
    }
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({ error: "Error al obtener datos del usuario" });
  }
};
