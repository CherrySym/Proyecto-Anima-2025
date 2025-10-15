// src/controllers/usersController.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { calcularEdad, determinarTipoUsuario, validarFechaNacimiento } from "../utils/dateHelpers.js";

const prisma = new PrismaClient();

/**
 * Crear usuario (rara vez usado - normalmente se usa authController.register)
 */
export const createUser = async (req, res) => {
  try {
    const { nombre, email, password, fechaNacimiento, edad, tipo, rol, avatar, bio, ubicacion } = req.body;

    // Validar campos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, email y password son obligatorios" });
    }

    // Determinar fechaNacimiento
    let fechaNac;
    if (fechaNacimiento) {
      const validacion = validarFechaNacimiento(fechaNacimiento);
      if (!validacion.esValida) {
        return res.status(400).json({ error: validacion.mensaje });
      }
      fechaNac = new Date(fechaNacimiento);
    } else if (edad) {
      const hoy = new Date();
      fechaNac = new Date(hoy.getFullYear() - edad, hoy.getMonth(), hoy.getDate());
    } else {
      return res.status(400).json({ error: "Debes proporcionar fechaNacimiento o edad" });
    }

    // Calcular tipo si no se proporciona
    const edadCalculada = calcularEdad(fechaNac);
    const tipoFinal = tipo || determinarTipoUsuario(edadCalculada);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        fechaNacimiento: fechaNac,
        tipo: tipoFinal,
        rol: rol || 'USUARIO',
        avatar,
        bio,
        ubicacion
      },
    });

    // Respuesta sin password
    const { password: _, ...userSinPassword } = user;
    return res.status(201).json({
      ...userSinPassword,
      edad: edadCalculada,
      name: user.nombre // Alias para frontend
    });
  } catch (err) {
    console.error("createUser:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todos los usuarios (con filtros opcionales)
 */
export const getUsers = async (req, res) => {
  try {
    const { tipo, rol, search } = req.query;

    // Construir filtros
    const where = {};
    if (tipo) where.tipo = tipo;
    if (rol) where.rol = rol;
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } }
      ];
    }

    const users = await prisma.usuario.findMany({
      where,
      select: {
        id: true,
        nombre: true,
        email: true,
        avatar: true,
        bio: true,
        ubicacion: true,
        fechaNacimiento: true,
        tipo: true,
        rol: true,
        puntos: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            postulaciones: true,
            likes: true,
            comentarios: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Agregar edad calculada y alias
    const usersConEdad = users.map(u => ({
      ...u,
      edad: calcularEdad(u.fechaNacimiento),
      name: u.nombre, // Alias para frontend
      contadores: {
        posts: u._count.posts,
        postulaciones: u._count.postulaciones,
        likes: u._count.likes,
        comentarios: u._count.comentarios
      }
    }));

    return res.json(usersConEdad);
  } catch (err) {
    console.error("getUsers:", err);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

/**
 * Obtener un usuario por ID (perfil público)
 */
export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        avatar: true,
        bio: true,
        ubicacion: true,
        fechaNacimiento: true,
        tipo: true,
        rol: true,
        puntos: true,
        createdAt: true,
        posts: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: { likes: true, comentarios: true }
            }
          }
        },
        _count: {
          select: {
            posts: true,
            postulaciones: true,
            likes: true,
            comentarios: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Calcular edad y preparar respuesta
    const edad = calcularEdad(user.fechaNacimiento);

    return res.json({
      ...user,
      edad,
      name: user.nombre, // Alias para frontend
      contadores: {
        posts: user._count.posts,
        postulaciones: user._count.postulaciones,
        likes: user._count.likes,
        comentarios: user._count.comentarios
      },
      posts: user.posts.map(p => ({
        ...p,
        likesCount: p._count.likes,
        commentsCount: p._count.comentarios
      }))
    });
  } catch (err) {
    console.error("getUserById:", err);
    return res.status(500).json({ error: "Error al obtener usuario" });
  }
};

/**
 * Actualizar usuario (solo el propio usuario o admin)
 */
export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar permisos
    if (userId !== id && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para modificar este usuario" });
    }

    const { nombre, bio, ubicacion, avatar, fechaNacimiento, edad } = req.body;

    // Preparar datos de actualización
    const dataToUpdate = {};
    if (nombre) dataToUpdate.nombre = nombre;
    if (bio !== undefined) dataToUpdate.bio = bio;
    if (ubicacion !== undefined) dataToUpdate.ubicacion = ubicacion;
    if (avatar !== undefined) dataToUpdate.avatar = avatar;

    // Actualizar fechaNacimiento si se proporciona
    if (fechaNacimiento) {
      const validacion = validarFechaNacimiento(fechaNacimiento);
      if (!validacion.esValida) {
        return res.status(400).json({ error: validacion.mensaje });
      }
      dataToUpdate.fechaNacimiento = new Date(fechaNacimiento);
      // Recalcular tipo basado en nueva edad
      const nuevaEdad = calcularEdad(dataToUpdate.fechaNacimiento);
      dataToUpdate.tipo = determinarTipoUsuario(nuevaEdad);
    } else if (edad) {
      // Convertir edad a fechaNacimiento
      const hoy = new Date();
      dataToUpdate.fechaNacimiento = new Date(hoy.getFullYear() - edad, hoy.getMonth(), hoy.getDate());
      dataToUpdate.tipo = determinarTipoUsuario(edad);
    }

    const user = await prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        nombre: true,
        email: true,
        avatar: true,
        bio: true,
        ubicacion: true,
        fechaNacimiento: true,
        tipo: true,
        rol: true,
        puntos: true
      }
    });

    return res.json({
      ...user,
      edad: calcularEdad(user.fechaNacimiento),
      name: user.nombre // Alias para frontend
    });
  } catch (err) {
    console.error("updateUser:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar usuario (solo admin o el propio usuario)
 */
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar permisos
    if (userId !== id && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para eliminar este usuario" });
    }

    await prisma.usuario.delete({ where: { id } });

    return res.json({ 
      success: true,
      message: "Usuario eliminado correctamente" 
    });
  } catch (err) {
    console.error("deleteUser:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener ranking de usuarios por puntos
 */
export const getUsersRanking = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const usuarios = await prisma.usuario.findMany({
      take: parseInt(limit),
      orderBy: { puntos: 'desc' },
      select: {
        id: true,
        nombre: true,
        avatar: true,
        puntos: true,
        tipo: true
      }
    });

    return res.json(usuarios);
  } catch (err) {
    console.error("getUsersRanking:", err);
    return res.status(500).json({ error: "Error al obtener ranking" });
  }
};
