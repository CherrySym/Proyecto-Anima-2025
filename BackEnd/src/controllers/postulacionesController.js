// src/controllers/postulacionesController.js
import { PrismaClient } from "@prisma/client";
import { calcularEdad } from "../utils/dateHelpers.js";

const prisma = new PrismaClient();

/**
 * Crear postulación con validación de edad
 * Solo usuarios JOVEN (>=18 años) pueden postularse
 */
export const createPostulacion = async (req, res) => {
  try {
    const { ofertaId } = req.body;
    const usuarioId = req.user?.id; // Viene del authMiddleware

    if (!ofertaId) {
      return res.status(400).json({ error: "ofertaId es obligatorio" });
    }

    if (!usuarioId) {
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    // Obtener usuario y validar edad
    const usuario = await prisma.usuario.findUnique({ 
      where: { id: usuarioId },
      select: { fechaNacimiento: true, tipo: true, nombre: true }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar edad
    const edad = calcularEdad(usuario.fechaNacimiento);
    if (edad < 18 || usuario.tipo === 'ADOLESCENTE') {
      return res.status(403).json({ 
        error: "Debes ser mayor de 18 años para postularte a ofertas laborales",
        edad
      });
    }

    // Verificar que la oferta existe y está activa
    const oferta = await prisma.oferta.findUnique({ 
      where: { id: ofertaId },
      select: { 
        id: true, 
        titulo: true, 
        activa: true, 
        fechaVencimiento: true,
        empresa: {
          select: { nombre: true, logo: true }
        }
      }
    });

    if (!oferta) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }

    if (!oferta.activa) {
      return res.status(400).json({ error: "Esta oferta ya no está disponible" });
    }

    // Validar fecha de vencimiento
    if (oferta.fechaVencimiento && new Date() > oferta.fechaVencimiento) {
      return res.status(400).json({ error: "Esta oferta ha expirado" });
    }

    // Crear postulación
    const postulacion = await prisma.postulacion.create({
      data: {
        usuarioId,
        ofertaId,
        estado: 'PENDIENTE'
      },
      include: {
        oferta: {
          include: {
            empresa: {
              select: { nombre: true, logo: true }
            }
          }
        }
      }
    });

    return res.status(201).json({
      message: "Postulación enviada exitosamente",
      postulacion: {
        id: postulacion.id,
        usuarioId: postulacion.usuarioId,
        ofertaId: postulacion.ofertaId,
        estado: postulacion.estado,
        createdAt: postulacion.createdAt,
        oferta: {
          titulo: postulacion.oferta.titulo,
          empresa: postulacion.oferta.empresa.nombre
        }
      }
    });
  } catch (err) {
    // Manejar error de postulación duplicada
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "Ya te postulaste a esta oferta" });
    }

    console.error("createPostulacion:", err);
    return res.status(500).json({ error: "Error al crear postulación" });
  }
};

/**
 * Obtener postulaciones del usuario actual
 */
export const getMisPostulaciones = async (req, res) => {
  try {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return res.status(401).json({ error: "Debes iniciar sesión" });
    }

    const postulaciones = await prisma.postulacion.findMany({
      where: { usuarioId },
      include: {
        oferta: {
          include: {
            empresa: {
              select: {
                id: true,
                nombre: true,
                logo: true,
                sector: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transformar respuesta
    const postulacionesTransformadas = postulaciones.map(p => ({
      id: p.id,
      estado: p.estado,
      createdAt: p.createdAt,
      oferta: {
        id: p.oferta.id,
        titulo: p.oferta.titulo,
        descripcion: p.oferta.descripcion,
        ubicacion: p.oferta.ubicacion,
        salario: p.oferta.salario,
        tipo: p.oferta.tipo,
        area: p.oferta.area,
        modalidad: p.oferta.modalidad,
        empresa: p.oferta.empresa.nombre,
        empresaLogo: p.oferta.empresa.logo,
        empresaSector: p.oferta.empresa.sector
      }
    }));

    return res.json(postulacionesTransformadas);
  } catch (err) {
    console.error("getMisPostulaciones:", err);
    return res.status(500).json({ error: "Error al obtener postulaciones" });
  }
};

/**
 * Obtener todas las postulaciones (admin o empresa)
 */
export const getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await prisma.postulacion.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            avatar: true,
            tipo: true
          }
        },
        oferta: {
          select: {
            id: true,
            titulo: true,
            empresaId: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(postulaciones);
  } catch (err) {
    console.error("getPostulaciones:", err);
    return res.status(500).json({ error: "Error al obtener postulaciones" });
  }
};

/**
 * Obtener postulaciones de una oferta específica (solo la empresa dueña)
 */
export const getPostulacionesByOferta = async (req, res) => {
  try {
    const ofertaId = parseInt(req.params.ofertaId);
    const empresaId = req.user?.id;

    // Verificar que la oferta pertenece a la empresa
    const oferta = await prisma.oferta.findUnique({
      where: { id: ofertaId },
      select: { empresaId: true }
    });

    if (!oferta) {
      return res.status(404).json({ error: "Oferta no encontrada" });
    }

    if (oferta.empresaId !== empresaId) {
      return res.status(403).json({ error: "No tienes permiso para ver estas postulaciones" });
    }

    const postulaciones = await prisma.postulacion.findMany({
      where: { ofertaId },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            avatar: true,
            bio: true,
            ubicacion: true,
            puntos: true,
            fechaNacimiento: true,
            tipo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Agregar edad calculada
    const postulacionesConEdad = postulaciones.map(p => ({
      ...p,
      usuario: {
        ...p.usuario,
        edad: calcularEdad(p.usuario.fechaNacimiento)
      }
    }));

    return res.json(postulacionesConEdad);
  } catch (err) {
    console.error("getPostulacionesByOferta:", err);
    return res.status(500).json({ error: "Error al obtener postulaciones" });
  }
};

/**
 * Actualizar estado de postulación (solo empresa)
 */
export const updatePostulacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { estado } = req.body;
    const empresaId = req.user?.id;

    if (!estado || !['PENDIENTE', 'ACEPTADA', 'RECHAZADA'].includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    // Verificar que la postulación pertenece a una oferta de la empresa
    const postulacion = await prisma.postulacion.findUnique({
      where: { id },
      include: {
        oferta: {
          select: { empresaId: true }
        }
      }
    });

    if (!postulacion) {
      return res.status(404).json({ error: "Postulación no encontrada" });
    }

    if (postulacion.oferta.empresaId !== empresaId) {
      return res.status(403).json({ error: "No tienes permiso para modificar esta postulación" });
    }

    // Actualizar estado
    const postulacionActualizada = await prisma.postulacion.update({
      where: { id },
      data: { estado }
    });

    return res.json({
      message: "Postulación actualizada",
      postulacion: postulacionActualizada
    });
  } catch (err) {
    console.error("updatePostulacion:", err);
    return res.status(500).json({ error: "Error al actualizar postulación" });
  }
};

/**
 * Eliminar postulación (solo el usuario que la creó)
 */
export const deletePostulacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioId = req.user?.id;

    // Verificar que la postulación pertenece al usuario
    const postulacion = await prisma.postulacion.findUnique({
      where: { id },
      select: { usuarioId: true }
    });

    if (!postulacion) {
      return res.status(404).json({ error: "Postulación no encontrada" });
    }

    if (postulacion.usuarioId !== usuarioId) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta postulación" });
    }

    await prisma.postulacion.delete({ where: { id } });

    return res.json({ 
      success: true,
      message: "Postulación eliminada" 
    });
  } catch (err) {
    console.error("deletePostulacion:", err);
    return res.status(500).json({ error: "Error al eliminar postulación" });
  }
};
