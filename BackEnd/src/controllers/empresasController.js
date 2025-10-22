// src/controllers/empresasController.js
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

/**
 * Crear empresa (rara vez usado - normalmente se usa authController.register)
 */
export const createEmpresa = async (req, res) => {
  try {
    const { nombre, email, password, descripcion, logo, sector, ubicacion } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, email y password son obligatorios" });
    }

    // Verificar si el email ya existe
    const existing = await prisma.empresa.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crear empresa
    const empresa = await prisma.empresa.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        descripcion,
        logo,
        sector,
        ubicacion
      },
    });

    // Respuesta sin password
    const { password: _, ...empresaSinPassword } = empresa;
    return res.status(201).json({
      ...empresaSinPassword,
      name: empresa.nombre // Alias para frontend
    });
  } catch (err) {
    console.error("createEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Obtener todas las empresas (con filtros opcionales)
 * Si el usuario está autenticado, incluye si sigue a cada empresa
 */
export const getEmpresas = async (req, res) => {
  try {
    const { sector, search } = req.query;
    const usuarioId = req.user?.id; // Puede ser undefined si no está autenticado

    // Construir filtros
    const where = {};
    if (sector) where.sector = sector;
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } },
        { sector: { contains: search, mode: 'insensitive' } }
      ];
    }

    const empresas = await prisma.empresa.findMany({
      where,
      select: {
        id: true,
        nombre: true,
        email: true,
        descripcion: true,
        logo: true,
        sector: true,
        ubicacion: true,
        createdAt: true,
        _count: {
          select: {
            ofertas: true,
            posts: true,
            seguidores: true,
            desafios: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Si hay usuario autenticado, verificar qué empresas sigue
    let empresasSeguidasIds = [];
    if (usuarioId) {
      const seguimientos = await prisma.empresaSeguida.findMany({
        where: {
          usuarioId,
          empresaId: { in: empresas.map(e => e.id) }
        },
        select: { empresaId: true }
      });
      empresasSeguidasIds = seguimientos.map(s => s.empresaId);
    }

    // Agregar alias y contadores
    const empresasTransformadas = empresas.map(e => ({
      ...e,
      name: e.nombre, // Alias para frontend
      siguiendo: empresasSeguidasIds.includes(e.id),
      contadores: {
        ofertas: e._count.ofertas,
        posts: e._count.posts,
        seguidores: e._count.seguidores,
        desafios: e._count.desafios
      }
    }));

    return res.json(empresasTransformadas);
  } catch (err) {
    console.error("getEmpresas:", err);
    return res.status(500).json({ error: "Error al obtener empresas" });
  }
};

/**
 * Obtener empresa por ID (perfil público)
 */
export const getEmpresaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioId = req.user?.id; // Puede ser undefined si no está autenticado

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
        ofertas: {
          where: { activa: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: { postulaciones: true }
            }
          }
        },
        desafios: {
          where: { activo: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            _count: {
              select: { participaciones: true }
            }
          }
        },
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
            ofertas: true,
            posts: true,
            seguidores: true
          }
        }
      }
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    // Verificar si el usuario sigue a esta empresa
    let siguiendo = false;
    if (usuarioId) {
      const seguimiento = await prisma.empresaSeguida.findFirst({
        where: {
          usuarioId,
          empresaId: id
        }
      });
      siguiendo = !!seguimiento;
    }

    return res.json({
      ...empresa,
      name: empresa.nombre, // Alias para frontend
      siguiendo,
      contadores: {
        ofertas: empresa._count.ofertas,
        posts: empresa._count.posts,
        seguidores: empresa._count.seguidores
      },
      ofertas: empresa.ofertas.map(o => ({
        ...o,
        postulacionesCount: o._count.postulaciones
      })),
      desafios: empresa.desafios.map(d => ({
        ...d,
        participantesCount: d._count.participaciones
      })),
      posts: empresa.posts.map(p => ({
        ...p,
        likesCount: p._count.likes,
        commentsCount: p._count.comentarios
      }))
    });
  } catch (err) {
    console.error("getEmpresaById:", err);
    return res.status(500).json({ error: "Error al obtener empresa" });
  }
};

/**
 * Actualizar empresa (solo la propia empresa o admin)
 */
export const updateEmpresa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const empresaId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar permisos
    if (empresaId !== id && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para modificar esta empresa" });
    }

    const { nombre, descripcion, logo, sector, ubicacion, password } = req.body;

    // Preparar datos de actualización
    const dataToUpdate = {};
    if (nombre) dataToUpdate.nombre = nombre;
    if (descripcion !== undefined) dataToUpdate.descripcion = descripcion;
    if (logo !== undefined) dataToUpdate.logo = logo;
    if (sector !== undefined) dataToUpdate.sector = sector;
    if (ubicacion !== undefined) dataToUpdate.ubicacion = ubicacion;

    // Si se actualiza password, re-hashear
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const empresa = await prisma.empresa.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        nombre: true,
        email: true,
        descripcion: true,
        logo: true,
        sector: true,
        ubicacion: true
      }
    });

    return res.json({
      ...empresa,
      name: empresa.nombre // Alias para frontend
    });
  } catch (err) {
    console.error("updateEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Borrar empresa (solo admin o la propia empresa)
 */
export const deleteEmpresa = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const empresaId = req.user?.id;
    const userRol = req.user?.rol;

    // Verificar permisos
    if (empresaId !== id && userRol !== 'ADMIN') {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta empresa" });
    }

    await prisma.empresa.delete({ where: { id } });

    return res.json({
      success: true,
      message: "Empresa eliminada correctamente"
    });
  } catch (err) {
    console.error("deleteEmpresa:", err);
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Seguir una empresa
 */
export const seguirEmpresa = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const empresaId = parseInt(req.params.id);

    // Verificar que la empresa existe
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    // Crear relación de seguimiento
    const seguimiento = await prisma.empresaSeguida.create({
      data: {
        usuarioId,
        empresaId
      }
    });

    return res.status(201).json({
      success: true,
      message: `Ahora sigues a ${empresa.nombre}`,
      seguimiento
    });
  } catch (err) {
    // Error de duplicado (ya sigue a la empresa)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Ya sigues a esta empresa" });
    }
    console.error("seguirEmpresa:", err);
    return res.status(500).json({ error: "Error al seguir empresa" });
  }
};

/**
 * Dejar de seguir una empresa
 */
export const dejarDeSeguirEmpresa = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const empresaId = parseInt(req.params.id);

    // Buscar la relación de seguimiento
    const seguimiento = await prisma.empresaSeguida.findFirst({
      where: {
        usuarioId,
        empresaId
      }
    });

    if (!seguimiento) {
      return res.status(404).json({ error: "No sigues a esta empresa" });
    }

    // Eliminar la relación
    await prisma.empresaSeguida.delete({
      where: { id: seguimiento.id }
    });

    return res.json({
      success: true,
      message: "Dejaste de seguir a la empresa"
    });
  } catch (err) {
    console.error("dejarDeSeguirEmpresa:", err);
    return res.status(500).json({ error: "Error al dejar de seguir empresa" });
  }
};

/**
 * Obtener empresas que sigue el usuario autenticado
 */
export const obtenerEmpresasSeguidas = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const seguimientos = await prisma.empresaSeguida.findMany({
      where: { usuarioId },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logo: true,
            sector: true,
            descripcion: true,
            _count: {
              select: {
                ofertas: true,
                posts: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const empresas = seguimientos.map(s => ({
      ...s.empresa,
      name: s.empresa.nombre,
      siguiendo: true,
      contadores: {
        ofertas: s.empresa._count.ofertas,
        posts: s.empresa._count.posts
      }
    }));

    return res.json(empresas);
  } catch (err) {
    console.error("obtenerEmpresasSeguidas:", err);
    return res.status(500).json({ error: "Error al obtener empresas seguidas" });
  }
};

/**
 * Verificar si el usuario sigue a empresas específicas
 */
export const verificarSeguimientoEmpresas = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { empresaIds } = req.query; // Array de IDs separados por coma

    if (!empresaIds) {
      return res.json([]);
    }

    const ids = empresaIds.split(',').map(id => parseInt(id));

    const seguimientos = await prisma.empresaSeguida.findMany({
      where: {
        usuarioId,
        empresaId: { in: ids }
      },
      select: { empresaId: true }
    });

    const empresasSeguidasIds = seguimientos.map(s => s.empresaId);

    return res.json(empresasSeguidasIds);
  } catch (err) {
    console.error("verificarSeguimientoEmpresas:", err);
    return res.status(500).json({ error: "Error al verificar seguimientos" });
  }
};
